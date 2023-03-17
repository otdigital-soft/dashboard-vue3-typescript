<template>
  <div
    class="text-gray-900 bg-white border-r border-gray-100 left-sidebar left-sidebar-1 dark:bg-gray-900 dark:border-gray-800 dark:text-white"
  >
    <Logo />
    <div class="left-sidebar-title">
      <span>My Resources</span>
    </div>
    <ul>
      <li class="l0">
        <router-link to="/dashboard" class="left-sidebar-item" :class="{active: pathname === '/dashboard'}">
          <GlobeAltIcon class="h-5 w-5" />
          <span class="title">Dashboard</span>
        </router-link>
      </li>
      <li class="l0">
        <router-link
          to="/service-requests"
          class="left-sidebar-item"
          :class="{active: pathname === '/service-requests'}"
        >
          <TicketIcon class="h-5 w-5" />
          <span class="title">Service Requests</span>
        </router-link>
      </li>
      <li class="l0">
        <router-link to="/my-reviews" class="left-sidebar-item" :class="{active: pathname === '/my-reviews'}">
          <ShieldCheckIcon class="h-5 w-5" />
          <span class="title">My Reviews</span>
        </router-link>
      </li>
    </ul>
    <div
      v-if="isInRole('BillingAdmin') || isInRole('Deployer') || isInRole('AccountAdmin') || isInRole('AccountOwner')"
      class="left-sidebar-title"
    >
      <span>System Resources</span>
    </div>
    <ul>
      <li v-if="isInRole('Deployer') || isInRole('AccountAdmin') || isInRole('AccountOwner')" class="l0">
        <button
          class="left-sidebar-item"
          :class="{'active': pathname.startsWith('/deployments'), 'hidden-sibling': !deploymentsOpen, 'open-sibling': deploymentsOpen}"
          @click="deploymentsOpen = !deploymentsOpen"
        >
          <CircleStackIcon class="h-5 w-5" />
          <span class="title">Deployments</span>
          <ChevronRightIcon class="ml-auto arrow h-4 w-4" />
        </button>
        <ul>
          <li class="l1">
            <router-link
              to="/deployments/pending"
              class="left-sidebar-item"
              :class="{active: pathname === '/deployments/pending'}"
            >
              <span class="title">Awaiting deployment</span>
            </router-link>
          </li>
          <li class="l1">
            <router-link
              to="/deployments/expiring-soon"
              class="left-sidebar-item"
              :class="{active: pathname === '/deployments/expiring-soon'}"
            >
              <span class="title">Expiring soon</span>
            </router-link>
          </li>
          <li class="l1">
            <router-link
              to="/deployments/ready-to-remove"
              class="left-sidebar-item"
              :class="{active: pathname === '/deployments/ready-to-remove'}"
            >
              <span class="title">Ready to remove</span>
            </router-link>
          </li>
        </ul>
      </li>
      <li v-if="isInRole('Deployer') || isInRole('AccountAdmin') || isInRole('AccountOwner') || isInRole('BillingAdmin')" class="l0">
        <button
          class="left-sidebar-item"
          :class="{'active': pathname.startsWith('/reports'), 'hidden-sibling': !reportsOpen, 'open-sibling': reportsOpen}"
          @click="reportsOpen = !reportsOpen"
        >
          <DocumentChartBarIcon class="h-5 w-5" />
          <span class="title">Reports</span>
          <ChevronRightIcon class="ml-auto arrow h-4 w-4" />
        </button>
        <ul>
          <li v-if="isInRole('Deployer') || isInRole('AccountAdmin') || isInRole('AccountOwner')" class="l1">
            <router-link
              to="/reports/my-reports"
              class="left-sidebar-item"
              :class="{active: pathname === '/reports/my-reports'}"
            >
              <span class="title">My reports</span>
            </router-link>
          </li>
          <li v-if="isInRole('Deployer') || isInRole('AccountAdmin') || isInRole('AccountOwner')" class="l1">
            <button
              class="left-sidebar-item"
              :class="{'active': pathname.startsWith('/reports/service-requests'), 'hidden-sibling': !serviceRequestReportsOpen, 'open-sibling': serviceRequestReportsOpen}"
              @click="serviceRequestReportsOpen = !serviceRequestReportsOpen"
            >
              <span class="title">Service requests</span>
              <ChevronRightIcon class="ml-auto arrow h-4 w-4" />
            </button>
            <ul>
              <li v-if="isInRole('AccountAdmin') || isInRole('AccountOwner') || isInRole('BillingAdmin')" class="l2">
                <router-link
                  to="/reports/service-requests"
                  class="left-sidebar-item"
                  :class="{active: pathname === '/reports/service-requests'}"
                >
                  <span class="title">Summary</span>
                </router-link>
              </li>
              <li v-if="isInRole('AccountAdmin') || isInRole('AccountOwner') || isInRole('BillingAdmin')" class="l2">
                <router-link
                  to="/reports/service-requests/detail"
                  class="left-sidebar-item"
                  :class="{active: pathname === '/reports/service-requests/detail'}"
                >
                  <span class="title">Detail</span>
                </router-link>
              </li>
            </ul>
          </li>
          <li v-if="isInRole('Deployer') || isInRole('AccountAdmin') || isInRole('AccountOwner')" class="l1">
            <button
              class="left-sidebar-item"
              :class="{'active': pathname.startsWith('/reports/deployed-resources'), 'hidden-sibling': !deployedResourcesReportsOpen, 'open-sibling': deployedResourcesReportsOpen}"
              @click="deployedResourcesReportsOpen = !deployedResourcesReportsOpen"
            >
              <span class="title">Deployed resources</span>
              <ChevronRightIcon class="ml-auto arrow h-4 w-4" />
            </button>
            <ul>
              <li v-if="isInRole('Deployer') || isInRole('AccountAdmin') || isInRole('AccountOwner')" class="l2">
                <router-link
                  to="/reports/deployed-resources"
                  class="left-sidebar-item"
                  :class="{active: pathname === '/reports/deployed-resources'}"
                >
                  <span class="title">Summary</span>
                </router-link>
              </li>
              <li v-if="isInRole('Deployer') || isInRole('AccountAdmin') || isInRole('AccountOwner')" class="l2">
                <router-link
                  to="/reports/deployed-resources/detail"
                  class="left-sidebar-item"
                  :class="{active: pathname === '/reports/deployed-resources/detail'}"
                >
                  <span class="title">Detail</span>
                </router-link>
              </li>
            </ul>
          </li>
          <li v-if="isInRole('Deployer') || isInRole('AccountAdmin') || isInRole('AccountOwner')" class="l1">
            <button
              class="left-sidebar-item"
              :class="{'active': pathname.startsWith('/reports/resource-charges'), 'hidden-sibling': !chargesReportsOpen, 'open-sibling': chargesReportsOpen}"
              @click="chargesReportsOpen = !chargesReportsOpen"
            >
              <span class="title">Resource charges</span>
              <ChevronRightIcon class="ml-auto arrow h-4 w-4" />
            </button>
            <ul>
              <li v-if="isInRole('AccountAdmin') || isInRole('AccountOwner') || isInRole('BillingAdmin')" class="l2">
                <router-link
                  to="/reports/resource-charges"
                  class="left-sidebar-item"
                  :class="{active: pathname === '/reports/resource-charges'}"
                >
                  <span class="title">Summary</span>
                </router-link>
              </li>
              <li v-if="isInRole('AccountAdmin') || isInRole('AccountOwner') || isInRole('BillingAdmin')" class="l2">
                <router-link
                  to="/reports/resource-charges/detail"
                  class="left-sidebar-item"
                  :class="{active: pathname === '/reports/resource-charges/detail'}"
                >
                  <span class="title">Detail</span>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li v-if="isInRole('BillingAdmin') || isInRole('Deployer') || isInRole('AccountAdmin') || isInRole('AccountOwner')" class="l0">
        <router-link to="/billing" class="left-sidebar-item" :class="{active: pathname === '/billing'}">
          <CreditCardIcon class="h-5 w-5" />
          <span class="title">Billing</span>
        </router-link>
      </li>
      <li v-if="isInRole('AccountAdmin') || isInRole('AccountOwner')" class="l0">
        <button
          class="left-sidebar-item"
          :class="{'active': pathname.startsWith('/admin'), 'hidden-sibling': !adminOpen, 'open-sibling': adminOpen}"
          @click="adminOpen = !adminOpen"
        >
          <CogIcon class="h-5 w-5" />
          <span class="title">Admin</span>
          <ChevronRightIcon class="ml-auto arrow h-4 w-4" />
        </button>
        <ul>
          <li class="l1">
            <router-link
              to="/admin/settings"
              class="left-sidebar-item"
              :class="{active: pathname === '/admin/settings'}"
            >
              <span class="title">Settings</span>
            </router-link>
          </li>
          <li class="l1">
            <router-link
              to="/admin/policies"
              class="left-sidebar-item"
              :class="{active: pathname === '/admin/policies'}"
            >
              <span class="title">Policies</span>
            </router-link>
          </li>
          <li class="l1">
            <router-link
              to="/admin/invitations"
              class="left-sidebar-item"
              :class="{active: pathname === '/admin/invitations'}"
            >
              <span class="title">Invitations</span>
            </router-link>
          </li>
          <li class="l1">
            <router-link to="/admin/users" class="left-sidebar-item" :class="{active: pathname === '/admin/users'}">
              <span class="title">Users</span>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import {
  ChevronRightIcon,
  CreditCardIcon,
  CogIcon,
  CircleStackIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  TicketIcon,
  DocumentChartBarIcon
} from "@heroicons/vue/24/outline"
import Logo from "./Logo.vue"
import useUser from "@/composables/useUser"

const adminOpen = ref(false)
const deploymentsOpen = ref(false)
const reportsOpen = ref(false)
const serviceRequestReportsOpen = ref(false)
const deployedResourcesReportsOpen = ref(false)
const chargesReportsOpen = ref(false)
const { userInfo } = useUser()

const pathname = computed(() => useRouter().currentRoute.value.path)
const roles = computed(() => userInfo.value?.roles)

const isInRole = (role: string):boolean => roles.value?.includes(role)

</script>
