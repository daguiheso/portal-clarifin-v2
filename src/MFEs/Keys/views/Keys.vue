<template>
  <div class="d-flex justify-content-between align-items-center">
    <Pageheader
      heading="LLaves"
      :maintitle="['Home', 'LLaves']" />

    <button
      v-if="companySelected"
      type="button"
      class="btn btn-primary btn-wave"
      data-bs-target="#modalCreateKey"
      data-bs-toggle="modal"
      href="javascript:;">
      Crear llave
    </button>
  </div>

  <div class="row justify-content-center upload-template">
    <div class="bg-white py-4 px-5 col col-12 card">

      <div class="col-xs-12 text-start pb-4">
        <div class="col-md-12">

          <div class="d-flex justify-content-around flex-wrap">

            <div class="form-group col-12 col-md-5">
              <label class="control-label fw-semibold mb-2">Compañia / Sociedad</label>

              <multiselect1
                v-model="companySelected"
                :show-labels="false"
                :options="companies.data"
                :custom-label="nameWithLang"
                placeholder="Selecciona un nivel"
                label="name"
                track-by="name"
                @select="selectBusiness" />
            </div>

            <div class="form-group col-12 col-md-5">
              <label class="control-label fw-semibold mb-2">Unidades de Negocio</label>

              <multiselect1
                v-model="businessUnitSelected"
                :show-labels="false"
                :options="companySelected?.businessUnits || []"
                :custom-label="nameWithLang"
                placeholder="Select one"
                label="name"
                track-by="name"
                @select="selectBusinessUnit" />
            </div>

          </div>

        </div>
      </div>

      <div
        v-if="store.keysByCompany.data.length"
        class="table-responsive">
        <table class="table text-nowrap">
          <thead>
            <tr>
              <th scope="col">
                Id
              </th>
              <th scope="col">
                LLave
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(item, index) in store.keysByCompany.data"
              :key="index">

              <td>{{ item?.id }}</td>
              <td>{{ item?.name }}</td>

            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-else
        class="text-center">
        <p>No hay llaves creadas</p>
      </div>

    </div>
  </div>

  <div
    id="modalCreateKey"
    class="modal fade">
    <div
      class="modal-dialog"
      role="document">
      <div class="modal-content modal-content-demo">
        <div class="modal-header">
          <h6 class="modal-title">
            Creación de llave
          </h6>
          <button
            aria-label="Close"
            class="btn-close"
            data-bs-dismiss="modal"
            type="button" />
        </div>
        <div class="modal-body">
          <form id="newKeyForm">
            <div class="col-10 offset-1">
              <label
                for="input-placeholder"
                class="form-label">
                Nombre de la llave
              </label>
              <input
                id="input-placeholder"
                v-model="nameNewKey"
                type="text"
                class="form-control"
                placeholder="Nombre de la llave">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            class="btn ripple btn-danger"
            data-bs-dismiss="modal"
            type="button">
            Cancelar
          </button>
          <button
            class="btn btn-primary btn-wave"
            type="submit"
            form="newKeyForm"
            :disabled="!isValidForm"
            @click.prevent="createKey">
            Crear
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onUnmounted, ref } from "vue"

import multiselect1 from "vue-multiselect"
import "vue-multiselect/dist/vue-multiselect.css"
import "vue3-form-wizard/dist/style.css"

import Pageheader from "@/shared/components/pageheader/Pageheader.vue"
import { useClientsBusiness } from "@/hooks/useClientsBusiness"
import useUnclassifiedCategoriesStore from "../stores"
import { initialState } from "../stores/state"

const store = useUnclassifiedCategoriesStore()
const { getCompanies, companies } = useClientsBusiness()
const companySelected = ref<any>(null)
const templateCategorySelected = ref<any>(null)
const nameNewKey = ref<string>("")

store.getKeys()

const isValidForm = computed(() => nameNewKey.value)
const businessUnitSelected = ref<any>({})

getCompanies()
store.getTemplateCategoriesByClient()

const selectBusiness = async () => {
}

const selectBusinessUnit = async () => {
  await setTemplateCategory()

  store.getKeysByCompany({
    companyId: companySelected.value.id
  })
}

const setTemplateCategory = async () => {
  const haveTemplateCategory = store.existTemplateCategoryForBusinessUnit(businessUnitSelected.value.id)

  if (!haveTemplateCategory) {

    await store.createTemplateCategoryByClient({
      companyId: companySelected.value.id,
      idBusinessUnit: businessUnitSelected.value.id,
      data: {
        name: `Company: ${companySelected.value.name} - Business Unit: ${businessUnitSelected.value.name} - Created from Portal`,
        industry: companySelected.value.industry || "Other"
      }
    })

    templateCategorySelected.value = store.createTemplateCategory?.data?.id
  } else {
    templateCategorySelected.value = haveTemplateCategory?.id
  }
}

const nameWithLang = ({ name }: any) => `${name}`


const createKey = async () => {
  const result = await store.createKey({
    companyId: companySelected.value.id,
    idBusinessUnit: businessUnitSelected.value.id,
    keys: [{
      name: nameNewKey.value
    }]
  })

  if (result) {
    store.getKeysByCompany({
      companyId: companySelected.value.id
    })

    nameNewKey.value = ""
  }
}

onUnmounted(() => {
  store.$state = initialState()
})

</script>

<style lang="scss">

</style>