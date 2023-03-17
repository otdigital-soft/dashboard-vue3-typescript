<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="mt-3 flex justify-between items-start">
      <div>
        <h3 class="text-base text-gray-700 dark:text-gray-200 font-medium mb-1">
          Welcome back, {{ userInfo?.firstName }}!
        </h3>
        <p class="text-gray-700 dark:text-gray-200">
          Here is what's happening with your account today
        </p>
      </div>
      <div v-if="accountInfo?.logoImageLargeUrl">
        <img :src="accountInfo?.logoImageLargeUrl" width="100" alt="logo">
      </div>
    </div>

    <div class="grid gap-4 mt-8" style="grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));">
      <router-link to="/service-requests">
        <div class="bg-white dark:bg-gray-700 shadow-md hover:shadow-lg rounded py-5 px-5 flex justify-between content-center items-center">
          <div>
            <span class="block text-2xl text-gray-700 dark:text-gray-200 font-medium mb-1">{{ dashboardInfo.totalRequestCount }}</span>
            <span class="text-gray-500 dark:text-gray-300 text-xs">Your service requests</span>
          </div>

          <div class="bg-sky-200 rounded p-2">
            <DocumentTextIcon class="w-8 h-8 text-sky-600" />
          </div>
        </div>
      </router-link>
      <router-link :to="{name: 'service-requests', query: { expires: '30' }}">
        <div class="bg-white dark:bg-gray-700 shadow-md hover:shadow-lg rounded py-5 px-5 flex justify-between content-center items-center">
          <div>
            <span class="block text-2xl text-gray-700 dark:text-gray-200 font-medium mb-1">{{ dashboardInfo.expiringRequestCount }}</span>
            <span class="text-gray-500 dark:text-gray-300 text-xs">Upcoming request expirations</span>
          </div>

          <div class="bg-orange-200 rounded p-2">
            <ClockIcon class="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </router-link>
      <router-link to="/my-reviews">
        <div class="bg-white dark:bg-gray-700 shadow-md hover:shadow-lg rounded py-5 px-5 flex justify-between content-center items-center">
          <div>
            <span class="block text-2xl text-gray-700 dark:text-gray-200 font-medium mb-1">{{ dashboardInfo.waitingReviewCount }}</span>
            <span class="text-gray-500 dark:text-gray-300 text-xs">Requests need your review</span>
          </div>

          <div class="bg-lime-200 rounded p-2">
            <ShieldCheckIcon class="w-8 h-8 text-lime-600" />
          </div>
        </div>
      </router-link>

      <div class="bg-white dark:bg-gray-700 shadow-md hover:shadow-lg rounded py-5 px-5 flex justify-between content-center items-center">
        <div>
          <span class="block text-2xl text-gray-700 dark:text-gray-200 font-medium mb-1">{{ dashboardInfo.currentUserScore }} <span class="text-sm">points</span></span>
          <span class="text-gray-500 dark:text-gray-300 text-xs">You're in the {{ dashboardInfo.scoreRelativePosition }} of users</span>
        </div>

        <div class="bg-pink-200 rounded p-3">
          <SparklesIcon class="w-6 h-6 text-pink-600" />
        </div>
      </div>
      <div v-if="accountInfo?.accountType !== 'Standard'" class="bg-white dark:bg-gray-700 shadow-md hover:shadow-lg rounded py-5 px-5 flex justify-between content-center items-center">
        <div>
          <span class="block text-2xl text-gray-700 dark:text-gray-200 font-medium mb-1">{{ dashboardInfo.chargesThisMonth }}</span>
          <span class="text-gray-500 dark:text-gray-300 text-xs">Resource expenses this month</span>
        </div>

        <div class="bg-green-200 rounded p-2">
          <CurrencyDollarIcon class="w-8 h-8 text-green-600" />
        </div>
      </div>
      <div v-if="accountInfo?.accountType !== 'Standard'" class="bg-white dark:bg-gray-700 shadow-md hover:shadow-lg rounded py-5 px-5 flex justify-between content-center items-center">
        <div>
          <span class="block text-2xl text-gray-700 dark:text-gray-200 font-medium mb-1">{{ dashboardInfo.monthlyCostEstimate }}</span>
          <span class="text-gray-500 dark:text-gray-300 text-xs">Estimated expenses this month</span>
        </div>

        <div class="bg-green-200 rounded p-2">
          <CurrencyDollarIcon class="w-8 h-8 text-green-600" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
      <div v-if="dashboardInfo.expiringRequests?.length > 0" class="bg-white dark:bg-gray-700 shadow-md rounded py-5 px-5">
        <h3 class="block text-lg text-gray-500 dark:text-gray-200 font-medium mb-1">
          Expiring requests
        </h3>
        <div class="grid grid-cols-autofill gap-4">
          <div
            v-for="request in dashboardInfo.expiringRequests"
            :key="request.id"
            class="bg-white rounded-lg shadow-md hover:shadow-lg dark:bg-slate-800 dark:shadow-slate-700 transition-shadow p-5 cursor-pointer"
          >
            <router-link class="flex flex-col items-center place-content-center" :to="{ name: 'detail-service-request', params: { id: request.id }}">
              <service-request-icon :service-request="request" />
              <service-request-status :service-request="request" />
            </router-link>
          </div>
        </div>
      </div>
      <div v-if="dashboardInfo.requestedResources?.length > 0" class="bg-white dark:bg-gray-700 shadow-md rounded py-5 px-5">
        <h3 class="block text-lg text-gray-500 dark:text-gray-200 font-medium mb-6">
          My requested resources
        </h3>
        <div class="max-w-lg">
          <dashboard-pie-chart />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useAccount from "@/composables/useAccount"
import useDashboard from "@/composables/useDashboard"
import useUser from "@/composables/useUser"
import { useAppStore } from "@/stores/app"
import { useDashboardStore } from "@/stores/dashboard"
import { ClockIcon, ShieldCheckIcon, DocumentTextIcon, SparklesIcon, CurrencyDollarIcon } from "@heroicons/vue/24/outline"
import { onMounted } from "vue"
import DashboardPieChart from "@/components/charts/DashboardPie.vue"
import ServiceRequestIcon from "@/components/service/ServiceRequestIcon.vue"
import ServiceRequestStatus from "@/components/service/ServiceRequestStatus.vue"

const { dashboardInfo } = useDashboard()
const { fetchDashboardData } = useDashboardStore()
const { accountInfo } = useAccount()
const { userInfo } = useUser()
const { setLoading } = useAppStore()

onMounted(async () => {
  try {
    setLoading(true)
    await fetchDashboardData()
  } catch (error) {
    setLoading(false)
  } finally {
    setLoading(false)
  }
})

</script>

<style scoped>
</style>
