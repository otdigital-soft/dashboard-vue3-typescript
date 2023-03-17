<template>
  <apexchart
    type="pie"
    hight="400px"
    width="400px"
    :options="chartOptions"
    :series="series"
  />
</template>

<script setup lang="ts">
import useUser from "@/composables/useUser"
import { DisplayText } from "@/services/displayText"
import { pluck } from "ramda"
import { toRef, ref, watch } from "vue"

const props = defineProps<{
    items: any[],
    groupBy: string,
    dataKey: string
}>()

const items = toRef(props, "items")

const { isDarkModeEnabled } = useUser()

const chartOptions = ref({
  chart: {
    id: "service-request-summary-chart",
    type: "pie"
  },
  labels: props.groupBy === "status" ? pluck(props.groupBy, props.items).map(label => label ? DisplayText.getStatusDisplayText(label) : "null") : pluck(props.groupBy, props.items).map(item => item ?? "null"),
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 320
        },
        legend: {
          position: "bottom"
        }
      }
    }
  ],
  dataLabels: {
    enabled: false,
    style: {
      fontSize: "12px",
      fontWeight: "medium",
      colors: ["#fff"]
    }
  },
  legend: {
    position: "bottom"
  }

})
const series = ref<number[]>(pluck(props.dataKey, props.items))

watch(items, (newVal) => {
  series.value = pluck(props.dataKey, newVal)
  chartOptions.value = {
    ...chartOptions.value,
    ...{
      labels: props.groupBy === "status" ? pluck(props.groupBy, newVal).map(label => DisplayText.getStatusDisplayText(label) ?? "null") : pluck(props.groupBy, newVal).map(item => item ?? "null")
    }
  }
}, { deep: true })

watch(isDarkModeEnabled, () => {
  chartOptions.value = {
    ...chartOptions.value,
    ...{
      legend: {
        ...{
          position: "bottom",
          labels: {
            colors: isDarkModeEnabled.value ? ["#fff"] : ["#333"]
          }
        }
      }
    }
  }
})
</script>
