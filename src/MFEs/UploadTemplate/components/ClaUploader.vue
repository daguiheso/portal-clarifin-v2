<template>
  <section class="co-uploader">
    <div
      v-show="!fileUpload"
      @drop.prevent="onDrop">
      <div
        class="co-uploader__drag-area position-relative"
        :class="{
          'co-uploader__drag-area--disabled co-uploader__pointer-event-none': disabled,
          'co-uploader__drag-area--active': activeDrop
        }">
        <input
          id="fileInput"
          class="w-100 h-100 opacity-0 position-absolute input-file co-cursor-pointer co-uploader"
          type="file"
          :multiple="false"
          :accept="currentFileType?.extensions"
          @change="onFileChange($event)">

        <div
          v-if="!fileUpload"
          class="co-uploader__box co-center flex-column h-100 d-flex justify-content-center align-items-center"
          :class="{
            'co-uploader__box--active-drop': activeDrop,
            'co-uploader__disabled': disabled
          }">
          <!-- <img
            src="@/assets/images/icon-cloud-upload.svg"
            alt="upload"
            width="42.083"
            height="37.875"> -->

          <p class="co-uploader__title co-label co-body--md co-fw-500 text-center mb-0 co-mt-8">
            {{ uploadFromDeviceLabel }} {{ dragFileLabel }}
          </p>

          <p
            class="co-uploader__text co-label co-label--sm list-item co-mt-8 mb-0"
            :class="{'co-uploader__text--disabled': disabled}">
            {{ maxSizeLabel }}
          </p>
        </div>
      </div>
    </div>

    <div
      v-if="fileUpload"
      class="co-uploader__selected-file w-100">
      <div class="d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center">
          <!-- <img
            src="@/assets/images/icon-uploaded.svg"
            alt="uploaded"
            width="24"
            height="24"> -->
          <p class="co-body co-body--lg px-3 mb-0">
            {{ fileUpload.name }}
            <span class="co-body co-body--md ms-2 co-uploader__text">
              {{ calculateSize() }} {{ digitalStorage(fileUpload.size).storage }}
            </span>
          </p>
        </div>
        <i
          class="icon-x co-cursor-pointer typcn typcn-delete"
          @click="deleteFile" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue"

const emit = defineEmits([
  "files-dropped",
  "files-input",
  "deleted-file"
])

interface Props {
  currentFileType: any;
  fileUpload: any;
  disabled: boolean;
  uploadFromDeviceLabel: string;
  maxSizeLabel: string;
  dragFileLabel?: string;
}

const activeDrop = ref(false)

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const onDrop = (e: any) => {
  if (!props.disabled) emit("files-dropped", e.dataTransfer.files[0])
}

const onFileChange = (e: any) => {
  if (!props.disabled) emit("files-input", e.target.files[0])
}

const deleteFile = () => emit("deleted-file")

const calculateSize = () => {
  const size = props.fileUpload?.size

  return (size / digitalStorage(size).divide || 0).toFixed(1)
}

const digitalStorage = (size: any) => {
  const sizeLength = String(size).length

  return sizeLength > 6 ? { storage: "MB", divide: 1000000 } : { storage: "KB", divide: 1000 }
}

const preventDefaults = (e: any) => {
  activeDrop.value = e.type === "dragover"
  e.preventDefault()
}

const events = [
  "dragenter",
  "dragover",
  "dragleave",
  "drop"
]

onMounted(() => events.forEach((eventName) => document.body.addEventListener(eventName, preventDefaults)))

onUnmounted(() => events.forEach((eventName) => document.body.removeEventListener(eventName, preventDefaults)))

const resetInputFile = () => ((document.getElementById("fileInput") as any).value = "")

defineExpose({
  resetInputFile
})
</script>

<style lang="scss" scoped>

.co-uploader {
  &__drag-area {
    border: 1px dashed #9A8BFF;
    border-radius: 5px;
    height: 140px;

    &--active {
      background-color: #E7E3FF;
      border: 2px solid #6B58FF;
    }

    &--disabled {
      background-color: #F5F5F7;
      border: 1px solid #D1D0D5;
    }

    // Cambiar cursor a pointer en hover solo si no está deshabilitado
    &:not(&--disabled):hover {
      cursor: pointer;
    }
  }

  &__icon {
    color: #6B58FF;

    &--disabled {
      color: #B8B6C1;
    }
  }

  &__title {
    color: #3E3E56;
    max-width: 510px;
  }

  &__text {
    color: #59597A;

    &--disabled {
      color: #B8B6C1;
    }
  }

  &__pointer-event-none {
    pointer-events: none;
    cursor: none;
  }

  &__box {
    border-radius: 5px;
    color: #3E3E56;
    background: #F9F8FF;

    &--active-drop:hover {
      background: #D9D3FF;
      cursor: pointer;
    }

    &--disabled {
      background: #F5F5F7;
      color: #B8B6C1;
      cursor: not-allowed;
    }
  }

  &__selected-file {
    padding: 16px;
    border-radius: 8px;
    background-color: #EBF1FF;
    color: #3E3E56;

    // Cambiar el cursor en hover sobre el archivo seleccionado
    &:hover {
      cursor: pointer;
    }
  }
}


</style>
