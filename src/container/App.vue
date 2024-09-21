<template>
  <router-view
    v-if="isPublicRoute"
    v-slot="{ Component }">
    <transition>
      <component :is="Component" />
    </transition>
  </router-view>
  <Layout v-else />

</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"
import "vue3-toastify/dist/index.css"
import "../scss/index.scss"

import Layout from "./views/Layout.vue"

const route = useRoute()

const publicRoutes = ["/login", "/error", "/"]

const isPublicRoute = computed(() => publicRoutes.some(publicRoute => route.path === publicRoute))
</script>