<template>
  <div class="d-flex justify-content-between align-items-center">
    <Pageheader
      heading="Carga de PUC"
      :maintitle="['Home', 'Carga de PUC']" />

    <button
      type="button"
      class="btn btn-primary btn-wave"
      data-bs-target="#modalDeletePUC"
      data-bs-toggle="modal"
      href="javascript:;">
      <!-- <i class="icon-x co-cursor-pointer typcn typcn-delete" /> -->
      Eliminar PUC´s previamente cargados
    </button>
  </div>

  <!-- Start:: row-1 -->
  <div class="row justify-content-center upload-template">
    <div class="bg-white py-4 px-5 col col-12 card">
      <form-wizard
        step-size="xs"
        color="#231e1e"
        error-color="#ff7070"
        next-button-text="Cargar"
        back-button-text="Atrás"
        finish-button-text="Terminar"
        @on-complete="goToHome">

        <tab-content
          title="Cargar Plantilla"
          :before-change="validateStep1">
          <div class="col-xs-12 text-start pb-4">
            <div class="col-md-12">

              <div class="d-flex justify-content-start">

                <div class="form-group col-12 col-md-5">
                  <label class="control-label fw-semibold mb-2">Compañia / Sociedad</label>

                  <multiselect1
                    v-model="companySelected"
                    :show-labels="false"
                    :options="companies.data"
                    :custom-label="nameWithLang"
                    placeholder="Selecciona una compañia"
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

                <div class="form-group col-12 col-md-5">
                  <label class="control-label fw-semibold mb-2">Formato</label>

                  <multiselect1
                    v-model="format"
                    :show-labels="false"
                    :options="store.formats.data"
                    placeholder="Selecciona un formato"
                    label="description"
                    track-by="description" />

                </div>
              </div>

              <div class="d-flex justify-content-around mt-4">
                <div class="form-group col-12 col-md-5">
                  <div class="form-check form-check-md form-switch d-flex align-items-center">
                    <input
                      id="switch-md"
                      v-model="ignoreMonthValidation"
                      class="form-check-input"
                      type="checkbox"
                      role="switch">
                    <label
                      class="form-check-label"
                      for="switch-md">
                      Ignorar validaciones entre meses
                    </label>
                  </div>
                </div>

                <div class="form-group col-12 col-md-5" />
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
              <template v-if="store.uploadFile.error">
                <h2 class="main-content-title fs-24 mb-5 text-center">
                  No se pudo procesar la plantilla
                </h2>
                <div
                  class="alert alert-secondary"
                  role="alert">
                  {{ store.uploadFile.error.errorDescription || store.uploadFile.error }}
                </div>

                <template v-if="store.uploadFile.error.errors?.length">
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
              </template>

              <template v-else>
                <h2 class="main-content-title fs-24 mb-5 text-center">
                  Plantilla procesada correctamente
                </h2>

                <!-- <div
                  v-if="Array.isArray(store.accounting.data) && store.accounting.data.length"
                  class="text-center mt-5">
                  <p>Se han encontrado categorías PUC aún sin clasificar.</p>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="goToUnclassifiedCategories">
                    Clasificar categorías PUC
                  </button>
                </div> -->
              </template>

            </div>
          </div>
        </tab-content>

      </form-wizard>

    </div>
  </div>

  <div
    id="modalDeletePUC"
    class="modal fade">
    <DeleteUploadedPUC />
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

import useUploadTemplateStore from "../stores"
import ClaUploader from "../components/ClaUploader.vue"
import { useClientsBusiness } from "@/hooks/useClientsBusiness"
import DeleteUploadedPUC from "./DeleteUploadedPUC.vue"
import { getLastDayOfMonth, handleError } from "@/commons/utils"

const store = useUploadTemplateStore()
const companySelected = ref<any>(null)
const format = ref<any>(null)
const dateImport = ref<any>(null)
const isStep1Dirty = ref(false)
const router = useRouter()
const { getCompanies, companies } = useClientsBusiness()

const allowedExtensions = [".xlsx", ".xls"]

const fileContent = ref<File | null>(null)
const dragAndDrop = ref()
const showErrors = ref(false)
const ignoreMonthValidation = ref(false)

const isValidStep1 = computed(() => {
  return companySelected.value && format.value && dateImport.value && fileContent.value
})

getCompanies()
store.getFormats()

companySelected.value = null

const nameWithLang = ({ name }: any) => `${name}`

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
  const blob = new Blob([fileContent.value as File], { type: "application/vnd.ms-excel; charset=utf-8" })

  showErrors.value = false

  await store.uploadFile({
    companyId: companySelected.value.id,
    idFormat: format.value.id,
    dateImport: `${dateImport.value}-${getLastDayOfMonth(dateImport.value)}`,
    file: blob,
    ignorePreviousBalance: ignoreMonthValidation.value
  })

  // if (result) getAccounting()

  return true
}

const onFileChange = (file: File) => {
  const maxSizeInMB = 2
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024
  const fileExtension = file.name.split(".").pop()

  if (file.size > maxSizeInBytes) {

    handleError(new Error("File size exceeds the limit of 2MB"))

    return
  } else if (!allowedExtensions.includes(`.${fileExtension}`)) {

    handleError(new Error("File extension not allowed. Please upload a file with \".xml\" extension"))

    return
  }

  fileContent.value = file
}

// const getAccounting = () => {
//   store.getAccounting({
//     companyId: companySelected.value.id,
//     params: {
//       start_date: `${dateImport.value}-1`,
//       end_date: `${dateImport.value}-${getLastDayOfMonth(dateImport.value)}`
//     }
//   })
// }

// const goToUnclassifiedCategories = () => {
//   router.push(`/unclassified-categories?client=${clientSelected.value.id}&business=${companySelected.value.id}&start_date=${dateImport.value}-1&end_date=${dateImport.value}-${getLastDayOfMonth(dateImport.value)}`)
// }

const goToHome = () => router.push("/")

</script>

<style lang="scss">

.upload-template {
  .wizard-tab-content {
    padding: 20px 0;
    border: none !important;
  }
}
</style>