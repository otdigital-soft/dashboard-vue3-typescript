<template>
  <TransitionRoot :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="$emit('close')">
      <TransitionChild
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <!-- The backdrop, rendered as a fixed sibling to the panel container -->
        <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

        <!-- Full-screen container to center the panel -->
        <div class="fixed inset-0 flex items-center justify-center">
          <DialogPanel class="w-full max-w-lg rounded bg-white dark:bg-gray-700 p-4 pt-6">
            <DialogTitle class="font-bold text-xl text-gray-500 dark:text-gray-200 mb-4">
              {{ isAddingUser ? 'Add user' : 'Invite user' }}
            </DialogTitle>
            <DialogDescription class="mt-3 relative">
              <Form action="#" @submit="sendInviteUser">
                <div class="mt-8 relative">
                  <Field
                    id="firstName"
                    v-model="user.firstName"
                    class="peer h-10 w-full border-b-2 border-gray-300 dark:border-gray-500 dark:bg-gray-800 dark:text-white pl-2 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
                    name="firstName"
                    placeholder="First name"
                    rules="required"
                  />
                  <label
                    class="text-gray-400  absolute left-0 -top-5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                          peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-400 peer-focus:text-sm"
                    for="firstName"
                  >First name</label>
                  <ErrorMessage name="firstName" class="text-red-700 text-xs font-medium" />
                </div>

                <div class="mt-8 relative">
                  <Field
                    id="lastName"
                    v-model="user.lastName"
                    type="text"
                    name="lastName"
                    autocomplete="lastName"
                    placeholder="Last name"
                    rules="required"
                    class="peer h-10 w-full border-b-2 border-gray-300 dark:border-gray-500 dark:bg-gray-800 dark:text-white pl-2 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
                  />
                  <label
                    for="lastName"
                    class="text-gray-400 dark:text-white absolute left-0 -top-5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                          peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-400 peer-focus:text-sm"
                  >Last name</label>
                  <ErrorMessage name="lastName" class="text-red-700 text-xs font-medium" />
                </div>

                <div class="mt-8 relative">
                  <Field
                    id="email"
                    v-model="user.email"
                    type="email"
                    name="email"
                    placeholder="Email address"
                    autocomplete="email"
                    rules="required|email"
                    class="peer h-10 w-full border-b-2 border-gray-300 dark:border-gray-500 dark:bg-gray-800 dark:text-white pl-2 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
                  />
                  <label
                    for="email"
                    class="text-gray-400 dark:text-white absolute left-0 -top-5 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                          peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-400 peer-focus:text-sm"
                  >Email
                    address</label>
                  <ErrorMessage name="email" class="text-red-700 text-xs font-medium" />
                </div>

                <div class="mt-6 relative">
                  <SwitchGroup>
                    <SwitchLabel class="mr-4 text-gray-500 dark:text-gray-200 text-sm">
                      Require Azure Active Directory sign-in:
                    </SwitchLabel>
                    <Switch
                      v-model="user.requireAzure"
                      :class="user.requireAzure ? 'bg-blue-600':'bg-gray-200 dark:bg-gray-400'"
                      class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <span
                        class="pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                        :class="user.requireAzure ? 'translate-x-5' : 'translate-x-0'"
                      >
                        <span
                          class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                          :class="user.requireAzure ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'"
                          aria-hidden="true"
                        />
                        <span
                          class="absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                          :class="user.requireAzure ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'"
                          aria-hidden="true"
                        />
                      </span>
                    </Switch>
                  </SwitchGroup>
                </div>

                <div class="flex justify-end mt-12">
                  <button
                    class="w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-100 hover:text-gray-500 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm bg-white
                   border-gray-300 border dark:bg-gray-600 dark:border-gray-600"
                    @click="$emit('close')"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="transition-all w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-slate-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {{ isAddingUser ? 'Add' : 'Invite' }}
                  </button>
                </div>
              </Form>
            </DialogDescription>
          </DialogPanel>
        </div>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { SendInviteRequest } from "@/models/invitation"
import { ref } from "vue"
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  Switch,
  SwitchGroup,
  SwitchLabel,
  TransitionRoot,
  TransitionChild
} from "@headlessui/vue"
import { Field, Form, ErrorMessage } from "vee-validate"
import { useInvitationStore } from "@/stores/invitation"
import userApi from "@/apiResources/userApi"

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  isAddingUser: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(["close", "refresh"])

const { inviteUser, fetchInvitations } = useInvitationStore()

const user = ref<SendInviteRequest>({
  firstName: "",
  lastName: "",
  email: "",
  requireAzure: false
})

const sendInviteUser = async () => {
  if (props.isAddingUser) {
    await userApi.addUser(user.value)
    emit("refresh")
    user.value = new SendInviteRequest()
    emit("close")
  } else {
    await inviteUser(user.value)
    await fetchInvitations()
    user.value = new SendInviteRequest()
    emit("close")
  }
}

// Computed:

</script>

<style scoped>

</style>
