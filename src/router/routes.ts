import DashboardLayout from "@/layouts/DashboardLayout.vue"
import CenteredLayout from "@/layouts/CenteredLayout.vue"
import EmptyLayout from "@/layouts/EmptyLayout.vue"
import Dashboard from "@/views/Dashboard.vue"
import NotFound from "@/views/NotFound.vue"
import Unauthorized from "@/views/Unauthorized.vue"

const routes = [
  {
    path: "/dashboard",
    component: DashboardLayout,
    meta: {
      login: true
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: {
          title: "CloudScope Concierge - Dashboard"
        }
      },
      {
        path: "/notifications",
        name: "notifications",
        component: () => import("../views/Notifications.vue"),
        meta: {
          title: "CloudScope Concierge - Notifications"
        }
      },
      {
        path: "/profile",
        name: "profile",
        component: () => import("../views/Profile.vue"),
        meta: {
          title: "CloudScope Concierge - My Profile"
        }
      },
      {
        path: "/service-requests",
        name: "service-requests",
        component: () => import("../views/serviceRequests/ServiceRequestsIndex.vue"),
        meta: {
          title: "CloudScope Concierge - Service Requests"
        }
      },
      {
        path: "/service-requests/create",
        name: "create-service-request",
        component: () => import("../views/serviceRequests/CreateServiceRequest.vue"),
        meta: {
          title: "CloudScope Concierge - Create a Service Request",
          roles: ["AccountAdmin", "AccountOwner", "Creator"]
        }
      },
      {
        path: "/service-requests/:id",
        name: "detail-service-request",
        props: true,
        component: () => import("../views/serviceRequests/ServiceRequestDetail.vue"),
        meta: {
          title: "CloudScope Concierge - Service Request Detail"
        }
      },
      {
        path: "/service-requests/review/:id",
        name: "review-service-request",
        props: true,
        component: () => import("../views/serviceRequests/ReviewServiceRequest.vue"),
        meta: {
          title: "CloudScope Concierge - Review Service Request"
        }
      },
      {
        path: "/service-requests/edit/:id",
        name: "edit-service-request",
        props: true,
        component: () => import("../views/serviceRequests/EditServiceRequest.vue"),
        meta: {
          title: "CloudScope Concierge - Edit Service Request",
          roles: ["AccountAdmin", "AccountOwner", "Creator"]
        }
      },
      {
        path: "/service-requests/modify/:id",
        name: "modify-service-request",
        props: true,
        component: () => import("../views/serviceRequests/EditServiceRequest.vue"),
        meta: {
          title: "CloudScope Concierge - Modify Service Request",
          roles: ["AccountAdmin", "AccountOwner", "Creator"]
        }
      },
      {
        path: "/service-requests/remove/:id",
        name: "remove-service-request",
        props: true,
        component: () => import("../views/deployments/RemoveServiceRequest.vue"),
        meta: {
          title: "CloudScope Concierge - Remove Service Request",
          roles: ["AccountAdmin", "AccountOwner", "Deployer"]
        }
      },
      {
        path: "/billing",
        name: "billing",
        component: () => import("../views/billing/BillingIndex.vue"),
        meta: {
          title: "CloudScope Concierge - Billing",
          roles: ["AccountAdmin", "AccountOwner", "BillingAdmin"]
        }
      },
      {
        path: "/deployments/pending",
        name: "pending-deployments",
        component: () => import("../views/deployments/Pending.vue"),
        meta: {
          title: "CloudScope Concierge - Pending Deployments",
          roles: ["AccountAdmin", "AccountOwner", "Deployer"]
        }
      },
      {
        path: "/deployments/manage-resources/:id",
        name: "manage-deployment-resources",
        props: true,
        component: () => import("../views/deployments/ManageDeployment.vue"),
        meta: {
          title: "CloudScope Concierge - Manage Deployments",
          roles: ["AccountAdmin", "AccountOwner", "Deployer"]
        }
      },
      {
        path: "/deployments/expiring-soon",
        name: "expiring-deployments",
        component: () => import("../views/deployments/Expiring.vue"),
        meta: {
          title: "CloudScope Concierge - Expiring Deployments",
          roles: ["AccountAdmin", "AccountOwner", "Deployer"]
        }
      },
      {
        path: "/deployments/ready-to-remove",
        name: "ready-to-remove-deployments",
        component: () => import("../views/deployments/ReadyToRemove.vue"),
        meta: {
          title: "CloudScope Concierge - Ready to Remove Deployments",
          roles: ["AccountAdmin", "AccountOwner", "Deployer"]
        }
      },
      {
        path: "/reports/my-reports",
        name: "reports-my-reports",
        component: () => import("../views/reports/MyReports.vue"),
        meta: {
          title: "CloudScope Concierge - My Reports",
          roles: ["AccountAdmin", "AccountOwner", "Deployer"]
        }
      },
      {
        path: "/reports/service-requests",
        name: "reports-service-requests",
        component: () => import("../views/reports/ServiceRequest.vue"),
        meta: {
          title: "CloudScope Concierge - Service Requests Report",
          roles: ["AccountAdmin", "AccountOwner", "Deployer"]
        }
      },
      {
        path: "/reports/service-requests/detail",
        name: "reports-service-requests-detail",
        component: () => import("../views/reports/ServiceRequestDetail.vue"),
        meta: {
          title: "CloudScope Concierge - Report Service Detail Report",
          roles: ["AccountAdmin", "AccountOwner", "Deployer"]
        }
      },
      {
        path: "/reports/deployed-resources",
        name: "reports-deployed-resources",
        component: () => import("../views/reports/DeployedResource.vue"),
        meta: {
          title: "CloudScope Concierge - Deployed Resource Report",
          roles: ["AccountAdmin", "AccountOwner", "Deployer"]
        }
      },
      {
        path: "/reports/deployed-resources/detail",
        name: "reports-deployed-resources-detail",
        component: () => import("../views/reports/DeployedResourceDetail.vue"),
        meta: {
          title: "CloudScope Concierge - Deployed Resource Summary Report",
          roles: ["AccountAdmin", "AccountOwner", "Deployer"]
        }
      },
      {
        path: "/reports/resource-charges",
        name: "reports-resource-charges",
        component: () => import("../views/reports/ResourceCharge.vue"),
        meta: {
          title: "CloudScope Concierge - Resource Charge Report",
          roles: ["AccountAdmin", "AccountOwner", "Deployer"]
        }
      },
      {
        path: "/reports/resource-charges/detail",
        name: "reports-resource-charges-detail",
        component: () => import("../views/reports/ResourceChargeDetail.vue"),
        meta: {
          title: "CloudScope Concierge - Resource Charge Detail Report",
          roles: ["AccountAdmin", "AccountOwner", "Deployer"]
        }
      },
      {
        path: "/my-reviews",
        name: "my-reviews",
        component: () => import("../views/reviews/ReviewsIndex.vue"),
        meta: {
          title: "CloudScope Concierge - My Review Requests"
        }
      },
      {
        path: "/admin/settings",
        name: "settings",
        component: () => import("../views/admin/Settings.vue"),
        meta: {
          title: "CloudScope Concierge - Administrative Settings",
          roles: ["AccountAdmin", "AccountOwner"]
        }
      },
      {
        path: "/admin/policies",
        name: "policies",
        component: () => import("../views/admin/policies/PoliciesIndex.vue"),
        meta: {
          title: "CloudScope Concierge - Policies",
          roles: ["AccountAdmin", "AccountOwner"]
        }
      },
      {
        path: "/admin/policies/:id",
        name: "policies-edit",
        props: true,
        component: () => import("../views/admin/policies/PoliciesEdit.vue"),
        meta: {
          title: "CloudScope Concierge - Edit Policy",
          roles: ["AccountAdmin", "AccountOwner"]
        }
      },
      {
        path: "/admin/users",
        name: "users",
        component: () => import("../views/admin/Users.vue"),
        meta: {
          title: "CloudScope Concierge - Manage Users",
          roles: ["AccountAdmin", "AccountOwner"]
        }
      },
      {
        path: "/admin/invitations",
        name: "invitations",
        component: () => import("../views/admin/Invitations.vue"),
        meta: {
          title: "CloudScope Concierge - Invitations",
          roles: ["AccountAdmin", "AccountOwner"]
        }
      },
      {
        path: "/admin/link-ad",
        name: "link-directory",
        component: () => import("../views/admin/LinkDirectory.vue"),
        meta: {
          title: "CloudScope Concierge - Link Active Directory"
        }
      },
      {
        path: "/error/review-complete",
        name: "review-complete",
        component: () => import("../views/errors/ReviewCompleted.vue"),
        meta: {
          title: "CloudScope Concierge - Service Request Review Complete"
        }
      }
    ]
  },
  {
    path: "/centered",
    component: CenteredLayout,
    meta: {
      login: false
    },
    children: [
      {
        path: "/sign-in",
        name: "signin",
        component: () => import("../views/SignIn.vue"),
        meta: {
          title: "CloudScope Concierge - Sign In"
        }
      },
      {
        path: "/forgot-password",
        name: "forgot-password",
        component: () => import("../views/ForgotPassword.vue"),
        meta: {
          title: "CloudScope Concierge - Forgot Password"
        }
      },
      {
        path: "/reset-password/:token",
        name: "reset-password",
        props: true,
        component: () => import("../views/ResetPassword.vue"),
        meta: {
          title: "CloudScope Concierge - Reset Password"
        }
      },
      {
        path: "/verify-email/:token",
        name: "verify-email",
        props: true,
        component: () => import("../views/VerifyEmail.vue"),
        meta: {
          title: "CloudScope Concierge - Verify Email"
        }
      }
    ]
  },
  {
    path: "/empty",
    component: EmptyLayout,
    meta: {
      login: false
    },
    children: [
      {
        path: "/",
        name: "landing",
        component: () => import("../views/Index.vue"),
        meta: {
          title: "CloudScope Concierge"
        }
      },
      {
        path: "/join/:token",
        name: "join",
        props: true,
        component: () => import("../views/Join.vue"),
        meta: {
          title: "CloudScope Concierge - Join"
        }
      },
      {
        path: "/register",
        name: "register",
        component: () => import("../views/Register.vue"),
        meta: {
          title: "CloudScope Concierge - Register"
        }
      },
      {
        path: "/oauth/slack/install",
        name: "slack-install",
        component: () => import("../views/oauth/slack/Install.vue"),
        meta: {
          title: "CloudScope Concierge - Install Slack"
        }
      },
      {
        path: "/oauth/slack/link",
        name: "slack-link",
        component: () => import("../views/oauth/slack/Link.vue"),
        meta: {
          title: "CloudScope Concierge - Link Slack"
        }
      }
    ]
  },
  {
    path: "/error/unauthorized",
    name: "unauthorized",
    component: Unauthorized,
    meta: {
      login: false
    }
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFound,
    meta: {
      login: false
    }
  }
]

export default routes
