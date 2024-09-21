<template>
  <aside class="errors-check co-mt-32">
    <p class="co-subtitle co-fw-600 co-mb-12">
      {{ $t("newBulk.drawer.title") }}
    </p>

    <p class="co-text-secondary co-labe co-label--sm co-mb-32">
      {{ $t("newBulk.drawer.description") }}
    </p>

    <div
      v-for="step in steps"
      :key="step.title"
      class="error-check__steps">
      <div class="d-flex align-items-center">
        <div
          class="rounded-circle co-bg-secondary-5 co-me-12 co-center"
          style="width: 20px; height:20px">
          <i class="icon-arrow-right co-icon co-icon--sm co-text-secondary-50" />
        </div>

        <p class="co-fw-600 co-label co-label--sm mb-0">
          {{ step.title }}
        </p>
      </div>
      <p class="co-label co-label--sm co-text-secondary co-ms-32 co-mb-12">
        {{ step.description }}
      </p>
    </div>

  </aside>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n"


const { t } = useI18n()

const steps = [
  {
    title: t("newBulk.drawer.stepOne.title"),
    description:t("newBulk.drawer.stepOne.description"),
  },
  {
    title: t("newBulk.drawer.stepTwo.title"),
    description:t("newBulk.drawer.stepTwo.description"),
  },
  {
    title: t("newBulk.drawer.stepThree.title"),
    description:t("newBulk.drawer.stepThree.description"),
  }
]

</script>

<style scoped lang="scss">

.error-check {
		&__steps{
			border-bottom: var(--cobre-border-stroke-M) solid var(--cobre-border-line);
      margin-top: 16px;

      &:first-child {
        margin-top: 0;
      }

      &:last-child {
        border: none
      }
		}
}

</style>