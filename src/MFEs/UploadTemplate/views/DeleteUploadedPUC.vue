<template>
  <div
    class="modal-dialog modal-lg"
    role="document">
    <div class="modal-content modal-content-demo">
      <div class="modal-header">
        <h6 class="modal-title">
          Eliminar información de PUC´s cargados
        </h6>
        <button
          id="closeModalDeletePUC"
          aria-label="Close"
          class="btn-close"
          data-bs-dismiss="modal"
          type="button" />
      </div>
      <div class="modal-body">
        <div class="d-flex justify-content-around flex-wrap">

          <div class="form-group col-12 col-md-5">
            <label class="control-label fw-semibold mb-2">Compañia / Sociedad</label>

            <multiselect1
              v-model="companySelected"
              :show-labels="false"
              :options="companies.data"
              :preselect-first="true"
              placeholder="Selecciona una compañia"
              label="name"
              track-by="name" />
          </div>

          <div class="form-group mb-3 col-12 col-md-5">
            <label class="control-label fw-semibold mb-2">Mes a eliminar</label>
            <input
              v-model="dateImport"
              placeholder="Mes a cargar"
              class="form-control"
              type="month"
              required="true">
          </div>
        </div>

        <div
          v-if="isConfirming"
          class="alert alert-warning mt-3"
          role="alert">
          ¿Estás seguro de que deseas eliminar esta información? Se eliminaran desde el mes seleccionado hasta el mes actual.
          Presiona <strong class="text-dark">"Continuar"</strong> para confirmar.
        </div>

      </div>

      <div class="modal-footer">
        <button
          class="btn ripple btn-danger"
          data-bs-dismiss="modal"
          type="button">
          Cancelar
        </button>

        <button
          class="btn btn-primary btn-wave d-flex align-items-center"
          type="button"
          :disabled="!isValidForm"
          @click="handleDeleteClick">
          <div
            v-if="store.deletePUC.isLoading"
            class="spinner-border spinner-border-sm me-2"
            role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          {{ isConfirming ? "Continuar" : "Eliminar" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"

import multiselect1 from "vue-multiselect"
import "vue-multiselect/dist/vue-multiselect.css"
import useUploadTemplateStore from "../stores"


import { useClientsBusiness } from "@/hooks/useClientsBusiness"

const store = useUploadTemplateStore()
const { getCompanies, companies } = useClientsBusiness()

const companySelected = ref<any>(null)
const dateImport = ref<any>(null)
const isConfirming = ref(false)

const isValidForm = computed(() => {
  return companySelected.value && dateImport.value
})

getCompanies()

companySelected.value = null

const handleDeleteClick = () => {
  if (isConfirming.value) {
    deletePUC()
  } else {
    isConfirming.value = true
  }
}

const deletePUC = () => {
  store.deletePUC({
    companyId: companySelected.value.id,
    dateImport: `${dateImport.value}-01`
  }).finally(() => {
    isConfirming.value = false;

    (document.querySelector("#closeModalDeletePUC") as HTMLElement)?.click()
  })
}
</script>