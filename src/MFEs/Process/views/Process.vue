<template>
  <div class="d-flex justify-content-between align-items-center">
    <Pageheader
      heading="Historial de PUC´s"
      :maintitle="['Home', 'Historial de PUC´s']" />

    <button
      type="button"
      class="btn btn-primary btn-wave"
      data-bs-target="#modalCreateKey"
      data-bs-toggle="modal"
      href="javascript:;"
      @click="redirectToUploadPuc">
      Cargar PUC
    </button>
  </div>

  <div class="row justify-content-center upload-template">
    <div class="bg-white py-4 px-5 col col-12 card">

      <div class="col-xs-12 text-start pb-4">
        <div class="col-md-12">

          <div class="d-flex justify-content-start flex-wrap">

            <div class="form-group col-12 col-md-5">
              <label class="control-label fw-semibold mb-2">Compañia / Sociedad</label>

              <multiselect1
                v-model="companySelected"
                :show-labels="false"
                :options="companies.data"
                placeholder="Selecciona un nivel"
                label="name"
                track-by="name"
                @select="selectCompany" />
            </div>

          </div>

        </div>
      </div>

      <ListTable v-if="companySelected" />

    </div>
  </div>

</template>

<script lang="ts" setup>
import { onUnmounted, ref } from "vue"

import multiselect1 from "vue-multiselect"
import "vue-multiselect/dist/vue-multiselect.css"
import "vue3-form-wizard/dist/style.css"

import Pageheader from "@/shared/components/pageheader/Pageheader.vue"
import { useClientsBusiness } from "@/hooks/useClientsBusiness"
import useProcessStore from "../stores"
import { initialState } from "../stores/state"
import ListTable from "../components/ListTable.vue"
import { useRouter } from "vue-router"

const store = useProcessStore()
const { getCompanies, companies } = useClientsBusiness()
const router = useRouter()
const companySelected = ref<any>(null)

getCompanies()

const selectCompany = () => {
  store.getProcessByCompanyId(companySelected.value.id)
}

const redirectToUploadPuc = () => {
  router.push("/uploadv2")
}

onUnmounted(() => {
  store.$state = initialState()
})

</script>

<style lang="scss">

</style>
