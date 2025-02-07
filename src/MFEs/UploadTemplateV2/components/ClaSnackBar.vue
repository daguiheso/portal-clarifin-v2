<template>
  <div class="co-snack d-flex align-items-center justify-content-between">
    <div class="d-flex align-items-center">
      <div :class="`co-center co-p-2 co-snack__icon co-snack__icon--${type} co-me-8`">
        <i
          class="co-icon co-icon--sm co-text-primary-95"
          :class="{
            'icon-check': type === 'success',
            'icon-x': type === 'error',
          }" />
      </div>
      <p class="co-mb-0 co-label co-label--md co-fw-500">
        {{ message }}
      </p>
      <button
        v-if="btnLabel"
        @click="btnAction">
        {{ btnLabel }}
      </button>
    </div>

    <CobreButton
      v-if="showCloseButton"
      theme="ghost"
      size="auto"
      class="co-ms-24 co-p-0"
      @click="handleClose">
      <template #content>
        <i class="icon-x co-icon co-icon--md co-text-primary-10" />
      </template>
    </CobreButton>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue"

interface Props {
  closeToast: (e?: MouseEvent) => void;
  message?: string;
  type?: "success" | "error";
  showCloseButton?: boolean;
  btnLabel?: string;
  btnAction?: () => void | Promise<void>;
}

const props = withDefaults(defineProps<Props>(), {
  message: "Single line snackbar with button",
  type: "success",
  btnLabel: "Undo",
  showCloseButton: true,
  btnAction: () => {}
})

const { closeToast: closeToastRef } = toRefs(props)

const handleClose = (event: MouseEvent) => {
  if (closeToastRef.value) {
    closeToastRef.value(event)
  }
}
</script>

<style lang="scss" scoped>
.co-snack {
  &__icon {
    width: 20px;
    height: 20px;
    border-radius: var(--cobre-radius-full);

    &--success {
      background: var(--cobre-success-medium);
    }

    &--error {
      background: var(--cobre-error-medium);
    }
  }
}
</style>
