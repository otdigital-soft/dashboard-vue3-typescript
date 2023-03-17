<template>
  <div v-if="errorRaised" class="mt-6">
    <p>
      Oops, it looks like you've experienced an error: <span class="text-red-500"> {{ errorRaised }}</span>
    </p>
    <p class="mt-4">
      Back to Profile: <router-link class="text-blue-600 dark:text-blue-400 hover:underline" to="/profile">Go</router-link>
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import userApi from "@/apiResources/userApi"
import axios from "axios"

const route = useRoute()
const router = useRouter()
const errorRaised = ref<string | null>(null)
const baseUrl = computed(() => {
  const path = window.location.href.replace(route.path, "")
  if (path.indexOf("?") > -1) {
    return path.substring(0, path.indexOf("?"))
  }
  return path
})

const clientId = import.meta.env.VITE_SLACK_CLIENT_ID
const clientSecret = import.meta.env.VITE_SLACK_CLIENT_SECRET

onMounted(() => {
  const code = route.query.code
  const error = route.query.error
  if (error) {
    router.push("/profile")
  } else if (code) {
    const params = new URLSearchParams()
    params.append("client_id", clientId)
    params.append("client_secret", clientSecret)
    params.append("code", code as string)
    params.append("grant_type", "authorization_code")
    params.append("redirect_uri", `${baseUrl.value}/oauth/slack/link`)

    axios.post("https://slack.com/api/oauth.v2.access", params,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    )
      .then(function (response) {
        if (response.data.ok === true) {
          console.log("Slack OAuth profile response", response.data)
          userApi.registerWithSlack(response.data.authed_user.id)
            .then(() => {
              router.push("/profile")
            }).catch((error) => {
              console.log("Failed Concierge Api", error)
            })
        } else {
          errorRaised.value = response.data.error
          console.log(response.data)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
})

</script>
