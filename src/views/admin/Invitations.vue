<template>
  <div class="px-6">
    <div class="sm:flex sm:items-center pb-4 mt-4">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold">
          Invitations
        </h1>
      </div>
      <div class="mt-2 sm:mt-0 sm:ml-16 sm:flex-none">
        <button class="btn-outline btn-blue" type="button" @click="isInviteDialogOpen = true">
          Invite user
          <UserPlusIcon class="w-4 ml-1" />
        </button>
      </div>
    </div>

    <div v-if="invitations.length !== 0">
      <div class="relative mb-6">
        <div class="mt-1 relative rounded-md">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon class="w-5 text-gray-600" />
          </div>
          <input
            v-model="searchText"
            type="search"
            placeholder="Search..."
            class="w-1/3 h-10 pl-10 pr-5 text-sm rounded-full appearance-none focus:outline-none bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
          >
        </div>
      </div>

      <div class="overflow-y-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded">
        <table class="min-w-full divide-y divide-gray-300">
          <thead class="bg-gray-100 dark:bg-slate-800 rounded-lg">
            <tr>
              <th
                v-for="column in tableColumns"
                :key="column.key"
                class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide"
              >
                <span class="cursor-pointer" @click="updateSorter(column.key)">
                  {{ column.title }}
                  <template v-if="sortByField === column.key">
                    <ArrowUpIcon v-if="orderBy === 'asc'" class="w-3 inline-block ml-1 translate-y-[1px] absolute" />
                    <ArrowDownIcon v-else class="w-3 inline-block ml-1 absolute translate-y-[1px]" />
                  </template>
                </span>
              </th>

              <th class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide">
                Tasks
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white dark:bg-slate-700">
            <tr v-for="(invitation, index) in invitationList" :key="index">
              <td class="whitespace-nowrap px-3 py-4 text-sm ">
                {{ invitation.senderFullName }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm ">
                {{ invitation.recipientEmail }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm ">
                {{ invitation.sent }}
              </td>

              <td class="whitespace-nowrap px-3 py-4 text-sm ">
                <button
                  class="flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-400"
                  title="Delete invitation"
                  type="button"
                  @click.prevent="openDeleteDialog(invitation)"
                >
                  <XMarkIcon class="w-5 text-red-500" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <Pagination
          :pagination="pagination"
          @next="pagination.currentPage += 1"
          @previous="pagination.currentPage -= 1"
          @change-page-size="pagination.eachPage = $event"
        />
      </div>
    </div>
    <div v-else class="mt-12">
      <p class="text-gray-700 dark:text-gray-200">
        No invitations found. Would you like to <button type="button" class="underline text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500" @click="isInviteDialogOpen = true">
          create one
        </button>?
      </p>
    </div>

    <DeleteConfirmationDialog
      :open="isDeleteDialogOpen"
      message="delete this invitation"
      @close="isDeleteDialogOpen = false"
      @deleted="removeInvitation"
    />

    <InviteUserDialog :is-open="isInviteDialogOpen" :is-adding-user="false" @close="isInviteDialogOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import Pagination from "@/components/common/Pagination.vue"
import DeleteConfirmationDialog from "@/components/dialogs/DeleteConfirmation.vue"
import InviteUserDialog from "@/components/dialogs/InviteUser.vue"
import { ArrowDownIcon, ArrowUpIcon, MagnifyingGlassIcon } from "@heroicons/vue/24/outline"
import { UserPlusIcon, XMarkIcon } from "@heroicons/vue/20/solid"
import { useInvitationStore } from "@/stores/invitation"
import { ascend, descend, filter, prop, sortWith, splitEvery, values } from "ramda"
import type { Invitation } from "@/models/invitation"

// Data:
const sortByField = ref("createdDateUtc")
const orderBy = ref("desc")
const tableColumns = [
  { title: "Sender", key: "senderFullName" },
  { title: "Recipient email", key: "recipientEmail" },
  { title: "Sent", key: "createdDateUtc" }
]
const pagination = ref({
  currentPage: 1,
  eachPage: 5,
  totalItems: 1,
  lastPage: 1
})
const searchText = ref("")
const isDeleteDialogOpen = ref(false)
const isInviteDialogOpen = ref(false)
const selectedInvitation = ref<Invitation | null>(null)

const invitationStore = useInvitationStore()
const invitations = computed(() => invitationStore.invitationList)

const invitationList = computed<Invitation[]>(() => {
  let orderFunction = null

  switch (orderBy.value) {
    case "desc":
      // @ts-ignore
      orderFunction = descend(prop(sortByField.value))
      break
    case "asc":
    default:
      // @ts-ignore
      orderFunction = ascend(prop(sortByField.value))
      break
  }

  if (orderFunction) {
    // @ts-ignore
    let data: Array<Invitation> = sortWith([orderFunction], invitations.value)

    if (searchText.value !== "") {
      data = filter(row => {
        const searchPattern = new RegExp(searchText.value, "i")
        // @ts-ignore
        return searchPattern.test(values(row))
      }, data)
    }

    // paginate:
    const splittedData = splitEvery(pagination.value.eachPage, data)
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    pagination.value.totalItems = data.length
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    pagination.value.lastPage = splittedData.length

    return splittedData[pagination.value.currentPage - 1]
  }

  return invitations.value
})

const updateSorter = (key: string) => {
  sortByField.value = key
  orderBy.value = orderBy.value === "asc" ? "desc" : "asc"
}

const openDeleteDialog = (invitation: Invitation) => {
  selectedInvitation.value = invitation
  isDeleteDialogOpen.value = true
}

const removeInvitation = () => {
  if (selectedInvitation.value && selectedInvitation.value.id) {
    invitationStore.deleteInvitation(selectedInvitation.value.id)
    selectedInvitation.value = null
    isDeleteDialogOpen.value = false
  }
}

onMounted(() => {
  invitationStore.fetchInvitations()
})
</script>
