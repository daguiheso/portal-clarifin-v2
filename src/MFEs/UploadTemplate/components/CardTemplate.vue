<template>
  <div class="card-template co-p-12 d-flex flex-column co-mt-16 co-me-16 w-100">
    <img
      :src="`https://cobre-utils.s3.us-east-2.amazonaws.com/portal/assets/country-flags/rounded/${asset}.svg`"
      alt="template"
      width="20"
      height="20">

    <p class="co-label co-label--sm co-mt-8 mb-0 co-text-secondary">
      {{ description }}
    </p>
    <CobreButton
      v-for="template in templates"
      :key="template.path"
      theme="link"
      size="auto"
      class="p-0 co-mt-8"
      style="justify-content: flex-start !important;"
      :label="template.message"
      :disabled="disabled"
      @click="handleClickOption(template)">
      <template #start>
        <i
          :class="template.icon"
          class="co-icon co-icon--sm" />
      </template>
    </CobreButton>
  </div>
</template>

<script setup lang="ts">
import { CobreButton } from "@cobre-npm/ds-v3"
import { Template } from "../interfaces/template.interface"


interface Props {
  asset: string;
  description: string;
  templates: Template[];
  disabled?: boolean;
}

defineProps<Props>()

const emits = defineEmits(["click-option"])

const handleClickOption = (option: Template) => {
  emits("click-option", option)
}

</script>

<style scoped lang="scss">

.card-template {
    height: 147px;
    border-radius: var(--cobre-radius-S);
    background-color: var(--cobre-primary-5);
  }

</style>