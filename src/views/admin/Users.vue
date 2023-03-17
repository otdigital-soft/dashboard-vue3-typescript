<template>
  <div class="px-6">
    <div class="sm:flex sm:items-center pb-4 mt-4">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold">
          Users
        </h1>
      </div>
      <div class="mt-2 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          class="btn-outline btn-blue mr-2"
          @click="isInviteDialogOpen = true; isAddingUser = false"
        >
          Invite user
          <UserPlusIcon class="w-4 ml-1" />
        </button>
        <button
          class="btn-outline btn-blue mr-2"
          @click="isInviteDialogOpen = true; isAddingUser = true"
        >
          Add user
          <OutlineUserPlusIcon class="w-4 ml-1" />
        </button>
        <!-- <button
          class="btn-outline btn-blue"
          @click="isFileImportOpen = true"
        >
          File Import
          <UploadIcon class="w-4 ml-1" />
        </button> -->
      </div>
    </div>

    <div class="relative mb-6">
      <div class="mt-1 relative rounded-md">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon class="w-5 text-gray-500 dark:text-gray-200" />
        </div>
        <input
          v-model="searchText"
          type="search"
          placeholder="Search..."
          class="w-1/3 h-10 pl-10 pr-5 text-sm rounded-full appearance-none focus:outline-none border bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-gray-200"
        >
      </div>
    </div>

    <div class="overflow-y-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded">
      <Form id="userEditingForm" @submit="onSubmit">
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
            <tr v-for="(user, index) in userList" :key="index">
              <template v-if="isEditingUser && selectedUser && selectedUser.id === user.id">
                <td class="whitespace-nowrap px-3 py-4 text-sm ">
                  <Field
                    id="firstName"
                    v-model="firstName"
                    form="userEditingForm"
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    rules="required"
                    class="peer h-10 w-full border-b-2 rounded-md p-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600 dark:bg-slate-200"
                  />

                  <ErrorMessage name="firstName" class="text-red-700 text-xs font-medium block mt-1" />
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm ">
                  <Field
                    id="lastName"
                    v-model="lastName"
                    form="userEditingForm"
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    rules="required"
                    class="peer h-10 w-full border-b-2 rounded-md p-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600 dark:bg-slate-200"
                  />

                  <ErrorMessage name="lastName" class="text-red-700 text-xs font-medium block mt-1" />
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm">
                  <Field
                    id="email"
                    v-model="email"
                    form="userEditingForm"
                    type="email"
                    name="email"
                    placeholder="Email address"
                    autocomplete="email"
                    rules="required|email"
                    class="peer h-10 w-full border-b-2 rounded-md p-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600 dark:bg-slate-200"
                  />

                  <ErrorMessage name="email" class="text-red-700 text-xs font-medium block mt-1" />
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm ">
                  <template v-if="selectedUser.defaultPolicy">
                    <select
                      v-model="policyId"
                      name="defaultPolicySelect"
                      class="px-3 py-2 rounded-sm bg-white border-gray-300 border dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-gray-200"
                    >
                      <option value="none">
                        None
                      </option>
                      <option v-for="policy in policyList" :key="policy.id" :value="policy.id">
                        {{ policy.name }}
                      </option>
                    </select>
                  </template>
                  <span v-else>None</span>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm ">
                  <Tagify
                    :settings="tagifyStuff.settings"
                    :value="user.roles"
                    :on-change="updateRole"
                    :metadata="user"
                  />
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm ">
                  <!-- <button class="w-8 h-8" type="submit" @click.prevent="updateUser(user)"> -->
                  <button class="w-8 h-8" type="submit">
                    <CheckCircleIcon class="w-5 text-blue-600 hover:text-blue-500" />
                  </button>
                  <button class="w-8 h-8" @click.prevent="isEditingUser = false">
                    <XCircleIcon class="w-5 text-gray-500 hover:text-rose-600" />
                  </button>
                </td>
              </template>

              <template v-else>
                <td class="whitespace-nowrap px-3 py-4 text-sm ">
                  {{ user.firstName }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm ">
                  {{ user.lastName }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm ">
                  {{ user.email }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm ">
                  {{ user.defaultPolicy.name ?? 'None' }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm ">
                  <div v-if="isEditingRole && selectedUser && selectedUser.id === user.id" class="editing-role flex">
                    <Tagify
                      :settings="tagifyStuff.settings"
                      :value="user.roles"
                      :on-change="updateRole"
                      :metadata="user"
                    />
                    <button class="ml-2" @click="isEditingRole = false">
                      <CheckCircleIcon class="w-5 text-green-500" />
                    </button>
                  </div>
                  <template v-else>
                    <span
                      v-for="role in user.roles"
                      :key="role"
                      class="bg-green-100 rounded-full py-1 px-3 text-xs font-medium text-green-800 cursor-pointer"
                      @click="selectedUser = user; isEditingRole = true"
                    >
                      {{ role }}
                    </span>
                  </template>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm ">
                  <template v-if="user.id !== authUser.id">
                    <button class="w-8 h-8" @click.prevent="selectUserToEdit(user)">
                      <PencilIcon class="w-5 text-blue-600 hover:text-blue-500" />
                    </button>
                    <button class="w-8 h-8" @click.prevent="openDeleteDialog(user)">
                      <TrashIcon class="w-5 text-rose-500 hover:text-rose-600" />
                    </button>
                  </template>
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </Form>

      <Pagination
        :pagination="pagination"
        @next="pagination.currentPage += 1"
        @previous="pagination.currentPage -= 1"
        @change-page-size="pagination.eachPage = $event"
      />
    </div>

    <DeleteConfirmationDialog
      :open="isDeleteDialogOpen"
      message="delete this user"
      @close="isDeleteDialogOpen = false"
      @deleted="removeUser"
    />

    <InviteUserDialog
      :is-open="isInviteDialogOpen"
      :is-adding-user="isAddingUser"
      @refresh="fetchUserList"
      @close="isInviteDialogOpen = false"
    />

    <FileImportDialog :open="isFileImportOpen" @close="isFileImportOpen = false" />
  </div>
</template>

<script setup lang="ts">
import useUser from "@/composables/useUser"
import usePolicy from "@/composables/usePolicy"
import { useUserStore } from "@/stores/user"
import { usePolicyStore } from "@/stores/policy"
import type { UserAccountDetail } from "@/models/userAccountDetail"
import { computed, onMounted, ref } from "vue"
import { prop, sortWith, descend, ascend, splitEvery, filter, values, pluck, isNil, map } from "ramda"
import { ArrowDownIcon, ArrowUpIcon, MagnifyingGlassIcon, UserPlusIcon as OutlineUserPlusIcon } from "@heroicons/vue/24/outline"
import { UserPlusIcon, PencilIcon, TrashIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/vue/20/solid"
import DeleteConfirmationDialog from "@/components/dialogs/DeleteConfirmation.vue"
import FileImportDialog from "@/components/dialogs/UsersFileImport.vue"
import InviteUserDialog from "@/components/dialogs/InviteUser.vue"
import Tagify from "@/components/Tagify.vue"
import { Role } from "@/models/roles"
import { Field, Form, ErrorMessage, useForm, useField } from "vee-validate"
import Pagination from "@/components/common/Pagination.vue"

// Composable:
const { userList: usersState, userInfo: authUser } = useUser()
const { fetchUserList, updateRole: updateRoleApi, updateUserInfo, deleteUser } = useUserStore()
const { fetchPolicies, setDefaultPolicy } = usePolicyStore()
const { policyList } = usePolicy()

// Data:
const sortByField = ref("email")
const orderBy = ref("desc")
const tableColumns = [
  { title: "First name", key: "firstName" },
  { title: "Last name", key: "lastName" },
  { title: "Email", key: "email" },
  { title: "Default Policy", key: "defaultPolicy" },
  { title: "Roles", key: "roles" }
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
const isFileImportOpen = ref(false)
const isAddingUser = ref(false)
const isEditingRole = ref(false)
const isEditingUser = ref(false)
const selectedUser = ref<UserAccountDetail | null>(null)

const { handleSubmit } = useForm()

const { value: firstName } = useField("editingUser.firstName")
const { value: lastName } = useField("editingUser.lastName")
const { value: email } = useField("editingUser.email")
const { value: policyId } = useField("editingUser.policyId")

const tagifyStuff = ref({
  settings: {
    whitelist: values(Role),
    userInput: false,
    dropdown: {
      enabled: 0
    }
  }
})

// Computed:
const userList = computed<UserAccountDetail[]>(() => {
  let orderFunction = null
  const usersData = map(u => {
    if (!u.defaultPolicy) {
      u.defaultPolicy = { id: "none", name: "None" }
    }

    return u
  }, usersState.value)

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
    let data: Array<UserAccountDetail> = sortWith([orderFunction], usersData)

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

  return usersData
})

// Methods:
const updateSorter = (key: string) => {
  sortByField.value = key
  orderBy.value = orderBy.value === "asc" ? "desc" : "asc"
}

const openDeleteDialog = (user: UserAccountDetail) => {
  selectedUser.value = user
  isDeleteDialogOpen.value = true
}

const updateRole = (e: any, user: UserAccountDetail) => {
  const newRoles = pluck("value", JSON.parse(e.target.value) as Array<any>)

  if (user.id) {
    updateRoleApi(user.id, newRoles)
  }
}
const onSubmit = handleSubmit(async (values) => {
  const user = { ...values.editingUser, id: selectedUser.value?.id }
  await updateUserInfo(user)

  if (user.policyId !== "none") {
    await setDefaultPolicy(user.id, user.policyId)
  } else {
    await setDefaultPolicy(user.id, null)
  }
  isEditingUser.value = false
})

const removeUser = async () => {
  if (selectedUser.value && !isNil(selectedUser.value.id)) {
    deleteUser(selectedUser.value.id)
    isDeleteDialogOpen.value = false
  }
}

const selectUserToEdit = (user: UserAccountDetail) => {
  selectedUser.value = user
  isEditingUser.value = true

  firstName.value = user.firstName
  lastName.value = user.lastName
  email.value = user.email
  policyId.value = user.defaultPolicy.id
}
// Hooks:
onMounted(() => {
  fetchUserList()
  fetchPolicies()
})
</script>

<style>
.tagify {
  --tag-bg: rgb(220 252 231 / var(--tw-bg-opacity));
  --tag-text-color: rgb(22 101 52 / var(--tw-text-opacity));
}
</style>
