<template>
  <fieldset v-if="comment" class="px-3 py-2 border-solid border-gray-300 border my-2 relative dark:border-gray-600">
    <legend><span class="underline text-blue-600 dark:text-blue-300">{{ comment?.author?.email }}</span></legend>
    <div class="flex flex-row-reverse items-center justify-between mb-2">
      <div>
        <span class="mr-4 text-gray-400 text-sm">{{ createdDuration }}</span>
        <span v-if="!readonly"><button class="text-red-600" @click="clickX(comment?.commentId)">X</button></span>
      </div>
    </div>
    <div v-show="comment?.isPublic" class="text-gray-400">
      {{ comment?.content }}
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import type { Comment } from "@/models/serviceRequests/deployedServiceRequest"
import { computed } from "vue"
import { DateTime } from "luxon"

const props = defineProps<{
    comment: Comment,
    readonly: boolean,
}>()

const emit = defineEmits(["remove"])

const createdDuration = computed(() => {
  return DateTime.fromISO(props.comment?.createdDateUtc).toRelative()
})

const clickX = (id: string) => {
  emit("remove", id)
}
</script>
