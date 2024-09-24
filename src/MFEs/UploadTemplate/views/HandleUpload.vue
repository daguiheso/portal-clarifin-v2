<template>
  <Pageheader
    heading="Cargar Plantilla"
    :maintitle="['Home', 'Cargar plantilla']" />

  <!-- Start:: row-1 -->
  <div class="row justify-content-center upload-template">
    <div class="bg-white py-4 px-5 col col-12 card">
      <form-wizard
        step-size="xs"
        color="#3629d3"
        error-color="#ff7070"
        next-button-text="Cargar"
        back-button-text="Atrás"
        finish-button-text="Terminar"
        @on-complete="goToHome">

        <!-- <template #next>
          <button
            type="button"
            class="wizard-btn d-flex align-items-center">
            <div
              v-if="store.uploadFile.isLoading"
              class="spinner-border spinner-border-sm me-2"
              role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            Procesar
          </button>
        </template> -->

        <tab-content
          title="Cargar Plantilla"
          :before-change="validateStep1">
          <div class="col-xs-12 text-start pb-4">
            <div class="col-md-12">

              <div class="d-flex justify-content-around">

                <div class="form-group col-12 col-md-5">
                  <label class="control-label fw-semibold mb-2">Cliente</label>

                  <multiselect1
                    v-model="searchSelectedValue"
                    :show-labels="false"
                    :options="store.clients.data"
                    :custom-label="nameWithLang"
                    placeholder="Select one"
                    label="name"
                    track-by="name"
                    @select="selectedClient" />
                </div>

                <div class="form-group col-12 col-md-5">
                  <label class="control-label fw-semibold mb-2">Negocio</label>

                  <multiselect1
                    v-model="business"
                    :show-labels="false"
                    :options="store.business.data"
                    :custom-label="nameWithLang"
                    placeholder="Select one"
                    label="name"
                    track-by="name" />
                </div>
              </div>

              <hr class="my-4">

              <div class="d-flex justify-content-around">
                <div class="form-group mb-3 col-12 col-md-5">
                  <label class="control-label fw-semibold mb-2">Mes a cargar</label>
                  <input
                    v-model="dateImport"
                    placeholder="Mes a cargar"
                    class="form-control"
                    type="month"
                    min="2022-010"
                    max="2026-09"
                    required="true">
                </div>
                <!-- <div class="form-group">
                  <div class="input-group">
                    <Datepicker1
                      v-model="dateImport"
                      placeholder="Date Time"
                      class="datepicker-here"
                      month-picker />
                  </div>
                </div> -->

                <div class="form-group col-12 col-md-5">
                  <label class="control-label fw-semibold mb-2">Formato</label>

                  <multiselect1
                    v-model="format"
                    :show-labels="false"
                    :options="store.formats.data"
                    placeholder="Select one"
                    label="description"
                    track-by="description" />

                </div>
              </div>

              <ClaUploader
                ref="dragAndDrop"
                class="mt-4 px-4"
                :current-file-type="{ extensions: allowedExtensions }"
                :upload-from-device-label="'Upload from device'"
                :max-size-label="'Max size 2MB'"
                :drag-file-label="'Drag your file here'"
                :file-upload="fileContent"
                :disabled="false"
                @files-dropped="onFileChange"
                @files-input="onFileChange"
                @deleted-file="onFileDelete" />

              <div
                v-if="!isValidStep1 && isStep1Dirty"
                class="alert alert-secondary mx-4 mt-4"
                role="alert">
                Hay campos obligatorios que no se han completado
              </div>


            </div>
          </div>
        </tab-content>

        <tab-content title="Resultado">
          <div class="col-xs-12 text-start pb-4">
            <div class="col-md-12">
              <div v-if="store.uploadFile.error">
                <h2 class="main-content-title fs-24 mb-5 text-center">
                  No se pudo procesar la plantilla
                </h2>
                <div
                  class="alert alert-secondary"
                  role="alert">
                  {{ store.uploadFile.error.errorDescription }}
                </div>

                <template v-if="store.uploadFile.error.errors.length">
                  <p>
                    Revisa los siguientes puntos:
                  </p>
                  <ul>
                    <li
                      v-for="error in store.uploadFile.error.errors"
                      :key="error"
                      class="mb-2">
                      {{ error }}
                    </li>
                  </ul>
                </template>
              </div>

              <div v-else>
                <h2 class="main-content-title fs-24 mb-5 text-center">
                  Plantilla procesada correctamente
                </h2>
              </div>

            </div>
          </div>
        </tab-content>

      </form-wizard>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"
import { useRouter } from "vue-router"

import Pageheader from "@/shared/components/pageheader/Pageheader.vue"

import multiselect1 from "vue-multiselect"
import "vue-multiselect/dist/vue-multiselect.css"

import { FormWizard, TabContent } from "vue3-form-wizard"
import "vue3-form-wizard/dist/style.css"
// import Datepicker from "vue3-datepicker"
// import Datepicker1 from "@vuepic/vue-datepicker"
import useActionResult from "@/hooks/useActionResult"

import useUploadTemplateStore from "../stores"
import ClaUploader from "../components/ClaUploader.vue"


const store = useUploadTemplateStore()
const searchSelectedValue = ref<any>(null)
const business = ref<any>(null)
const format = ref<any>(null)
const dateImport = ref<any>(null)
const isStep1Dirty = ref(false)
const router = useRouter()
const { addSnackBarActionResult } = useActionResult()

const allowedExtensions = [".xlsx", ".xls"]

const fileContent = ref<File | null>(null)
const dragAndDrop = ref()
const showErrors = ref(false)

store.getClients()

const isValidStep1 = computed(() => {
  return searchSelectedValue.value && business.value && format.value && dateImport.value && fileContent.value
})

// interface UploadFileData {
//   status: string;
//   [key: string]: any;
// }

// const isOk = computed(() => {
//   const data = store.uploadFile.data as UploadFileData

//   return data?.status === "SUCCESS"
// })

const selectedClient = () => {
  store.getBusiness(searchSelectedValue.value.id)
  store.getFormats()

  business.value = null
}

const nameWithLang = ({ name }: any) => {
  return `${name}`
}

// const onChangeCurrentTab = async (prevIndex: number, nextIndex: number) => {

// }

const validateStep1 = async () => {
  isStep1Dirty.value = true
  if (!isValidStep1.value) return false

  return uploadFile()
}

const onFileDelete = () => {
  // if (isLoadingBulkPayment.value) return

  fileContent.value = null
  dragAndDrop.value?.resetInputFile()
}

const uploadFile = async () => {
  // localLoading.value = true
  const blob = new Blob([fileContent.value as File], { type: "application/vnd.ms-excel; charset=utf-8" })

  showErrors.value = false

  return store.uploadFile({
    idClient: searchSelectedValue.value.id,
    idBusiness: business.value.id,
    idFormat: format.value.id,
    dateImport: `${dateImport.value}-31`,
    // dateImport: "2023-01-01",
    file: blob
  })

  // store.resetUploadStatus()

  // localLoading.value = false
}

const onFileChange = (file: File) => {
  const maxSizeInMB = 2
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024
  const fileExtension = file.name.split(".").pop()

  if (file.size > maxSizeInBytes) {
    addSnackBarActionResult({
      message: "File size exceeds the limit of 2MB",
      type: "error",
      btnLabel: "",
    })

    return
  } else if (!allowedExtensions.includes(`.${fileExtension}`)) {
    addSnackBarActionResult({
      message: "File extension not allowed. Please upload a file with \".xml\" extension",
      type: "error",
      btnLabel: "",
    })

    return
  }

  fileContent.value = file
}

const goToHome = () => router.push("/home")

</script>

<style lang="scss">

.upload-template {
  .wizard-tab-content {
    padding: 20px 0;
    border: none !important;
  }
}
</style>