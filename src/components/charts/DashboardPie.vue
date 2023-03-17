<template>
  <div>
    <apexchart
      type="pie"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script setup lang="ts">
import useDashboard from "@/composables/useDashboard"
import useUser from "@/composables/useUser"
import { pluck } from "ramda"
import { ref, watch } from "vue"

const { dashboardInfo } = useDashboard()
const { isDarkModeEnabled } = useUser()

// https://github.com/apexcharts/vue3-apexcharts
const chartOptions = ref({
  chart: {
    id: "requested-resources-chart",
    type: "pie"
  },
  labels: pluck("name", dashboardInfo.value.requestedResources),
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
    enabled: true,
    style: {
      fontSize: "12px",
      fontWeight: "medium",
      colors: ["#fff"]
    }
  }

})
const series = ref(pluck("value", dashboardInfo.value.requestedResources))

watch(dashboardInfo, () => {
  series.value = pluck("value", dashboardInfo.value.requestedResources)
  chartOptions.value = {
    ...chartOptions.value,
    ...{
      labels: pluck("name", dashboardInfo.value.requestedResources)
    }
  }
}, { deep: true })

watch(isDarkModeEnabled, () => {
  chartOptions.value = {
    ...chartOptions.value,
    ...{
      legend: {
        labels: {
          colors: isDarkModeEnabled.value ? ["#fff"] : ["#333"]
        }
      }
    }
  }
})
</script>

<style scoped>

</style>
