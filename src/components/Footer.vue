<template>
  <footer class="bg-slate-100 dark:bg-slate-900">
    <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
      <div class="flex justify-center space-x-6 md:order-3">
        <a
          href="https://twitter.com/CloudScopeIO"
          class="text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-600"
        >
          <span class="sr-only">Twitter</span>
          <svg fill="currentColor" viewBox="0 0 24 24" class="h-6 w-6">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        </a>
      </div>
      <div class="mt-8 md:mt-0 md:order-1">
        <p class="text-center text-sm text-slate-600 dark:text-gray-400">
          <a href="https://www.cloudscope.io">&copy; 2022 CloudScope LLC.</a>
          <span class="ml-3">All rights reserved</span>
          <span class="ml-6 text-xs">Version [Version]</span>
        </p>
      </div>
      <div class="mt-8 md:mt-0 md:order-2 flex justify-start">
        <p class="text-center text-sm text-slate-600 dark:text-gray-400">
          <a href="https://docs.concierge.cloudscope.app" class="mr-3">
            Documentation
          </a>
        </p>
        <p class="text-center text-sm text-slate-600 dark:text-gray-400 border-l border-gray-600">
          <a href="mailto:support@cloudscope.io" class="mx-3">
            Support
          </a>
        </p>
        <p class="border-l border-gray-600">
          <button
            class="ml-3 text-center text-sm text-slate-600 dark:text-gray-400"
            @click="isFeedbackDialogOpen = true"
          >
            Feedback on this page
          </button>
        </p>
      </div>
    </div>
  </footer>
  <GetFeedbackDialog :is-open="isFeedbackDialogOpen" @close="isFeedbackDialogOpen = false" />
</template>

<script setup lang="ts">
import { ref } from "vue"
import GetFeedbackDialog from "@/components/dialogs/GetFeedback.vue"

const isFeedbackDialogOpen = ref(false)
</script>

<style scoped>

</style>
