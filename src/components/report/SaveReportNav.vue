<template>
  <button
    type="button"
    class="btn-outline btn-blue"
    :class="shouldDisable? 'opacity-50 cursor-not-allowed' : ''"
    :disabled="shouldDisable"
    @click="isSaveModalOpen=true"
  >
    Save to My Reports
    <ArrowDownOnSquareIcon class="ml-3 h-5 w-5" />
  </button>
  <SaveReportDialog :open="isSaveModalOpen" v-bind="$attrs" @close="isSaveModalOpen=false" />
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { ArrowDownOnSquareIcon } from "@heroicons/vue/24/outline"
import SaveReportDialog from "@/components/dialogs/SaveReport.vue"

const props = defineProps<{
    groupBy: string | null,
    detail: boolean
}>()

const isSaveModalOpen = ref(false)

const shouldDisable = computed(() => {
  return (props.groupBy === "" || props.groupBy === null) && !props.detail
})

</script>
