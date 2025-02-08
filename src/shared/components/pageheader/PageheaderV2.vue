<template>
  <div class="d-md-flex d-block align-items-center justify-content-between page-header-breadcrumb">
    <div>
      <h2 class="main-content-title fs-24 mb-1">
        {{ heading }}
      </h2>
      <ol class="breadcrumb mb-0">
        <li
          v-for="(value, key) in maintitle"
          :key="key"
          class="breadcrumb-item"
          :class="{ active: key === maintitle.length - 1 }">
          <!-- Último breadcrumb (activo) -->
          <span v-if="key === maintitle.length - 1">{{ value }}</span>

          <!-- Breadcrumbs clicables -->
          <span
            v-else
            class="breadcrumb-link"
            style="cursor: pointer;"
            @click="navigateTo(key)">
            {{ value }}
          </span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
import { useRouter } from "vue-router"

// Definición de props
const props = defineProps<{
  heading: string
  maintitle: string[]
  routes?: string[]
}>()

const router = useRouter()

// Función para redirigir
const navigateTo = (index: number) => {
  const route = props.routes?.[index]

  if (route) {
    router.push(route)
  }
}
</script>

<style scoped>
.breadcrumb-link:hover {
  text-decoration: underline;
  color: #007bff;
}
.breadcrumb-item.active {
  font-weight: bold;
}
</style>
