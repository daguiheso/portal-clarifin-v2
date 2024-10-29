<template>

  <div class="d-flex justify-content-between align-items-center">
    <Pageheader
      heading="LLaves"
      :maintitle="['Home', 'LLaves']" />

    <button
      type="button"
      class="btn btn-primary btn-wave"
      data-bs-target="#modaldemo12"
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
              <label class="control-label fw-semibold mb-2">Cliente</label>

              <multiselect1
                v-model="clientSelected"
                :show-labels="false"
                :options="clients.data"
                :custom-label="nameWithLang"
                placeholder="Select one"
                label="name"
                track-by="name"
                @select="selectClient" />
            </div>

            <div class="form-group col-12 col-md-5">
              <label class="control-label fw-semibold mb-2">Compañia / Sociedad</label>

              <multiselect1
                v-model="businessSelected"
                :show-labels="false"
                :options="business.data"
                :custom-label="nameWithLang"
                placeholder="Selecciona un nivel"
                label="name"
                track-by="name"
                @select="selectBusiness" />
            </div>

          </div>

        </div>
      </div>

      <div
        v-if="store.levelsByBusiness.data.length"
        class="table-responsive">
        <table class="table text-nowrap">
          <thead>
            <tr>
              <th scope="col">
                LLave
              </th>
              <!-- <th scope="col">
                Tag
              </th>
              <th scope="col">
                LLaves
              </th> -->
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(item, index) in store.levelsByBusiness.data"
              :key="index">

              <td>{{ item?.name }}</td>

              <!-- <td class="col-4">
                <div class="">
                  <multiselect1
                    v-model="item.level"
                    :show-labels="false"
                    :options="filteredLevels"
                    :custom-label="nameWithLang"
                    placeholder="Select one"
                    label="name"
                    track-by="name"
                    @select="handleSelectLevel(item)">
                    <template #beforeList>
                      <div
                        class="d-flex p-2"
                        style="">
                        <span
                          class="badge d-flex align-items-center me-2"
                          :class="currentLevelsFilter === 'all' ? 'bg-dark text-light' : 'bg-outline-dark'"
                          role="button"
                          @click="setFilterLevels('all')">
                          Todas
                        </span>
                        <span
                          class="badge d-flex align-items-center me-2"
                          :class="currentLevelsFilter === 'base' ? 'bg-dark text-light' : 'bg-outline-dark'"
                          role="button"
                          @click="setFilterLevels('base')">
                          Base
                        </span>
                        <span
                          class="badge d-flex align-items-center me-2"
                          :class="currentLevelsFilter === 'own' ? 'bg-dark text-light' : 'bg-outline-dark'"
                          role="button"
                          @click="setFilterLevels('own')">
                          Propias
                        </span>
                      </div>
                    </template>

                    <template #noOptions>
                      <div
                        class="no-result"
                        style="font-size: 12px;">
                        No hay llaves propias
                      </div>
                    </template>
                  </multiselect1>
                </div>
              </td> -->
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
    id="modaldemo12"
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
          <form>
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
            type="button">
            Crear
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"
import { format, subMonths } from "date-fns"
import Pageheader from "@/shared/components/pageheader/Pageheader.vue"

import multiselect1 from "vue-multiselect"
import "vue-multiselect/dist/vue-multiselect.css"

import "vue3-form-wizard/dist/style.css"
import { useClientsBusiness } from "@/hooks/useClientsBusiness"


import useUnclassifiedCategoriesStore from "../stores"

const store = useUnclassifiedCategoriesStore()
const clientSelected = ref<any>(null)
const { getClients, getBusiness, clients, business } = useClientsBusiness()
const businessSelected = ref<any>(null)
const templateCategorySelected = ref<any>(null)
const nameNewKey = ref<string>("")
// const currentLevelsFilter = ref<"all" | "own" | "base">("all")

store.accounting = {
  data: [],
  error: null,
  isLoading: false
}

getClients()
store.getLevels()

const selectClient = () => {
  getBusiness(clientSelected.value.id)

  businessSelected.value = null
  store.getTemplateCategoriesByClient(clientSelected.value.id)
}

// const setFilterLevels = (type: "all" | "own" | "base") => {
//   currentLevelsFilter.value = type
// }

const selectBusiness = async () => {
  getUnclassifiedCategoriesByBusinessFor6MonthsAgo()

  await setTemplateCategory()

  store.getLevelsByBusiness({
    clientId: clientSelected.value.id,
    businessId: businessSelected.value.id
  })
}

const setTemplateCategory = async () => {
  const haveTemplateCategory = store.existTemplateCategoryForBusiness(businessSelected.value.id)

  if (!haveTemplateCategory) {
    await store.createTemplateCategoryByClient({
      clientId: clientSelected.value.id,
      businessId: businessSelected.value.id,
      data: {
        name: "Custom Portal",
        industry: industryByCurrentBussinesId.value || "Other"
      }
    })

    templateCategorySelected.value = store.createTemplateCategory?.data?.id
  } else {
    templateCategorySelected.value = haveTemplateCategory?.id
  }
}

interface Business {
  id: number;
  industry: string;
  // Add other properties as needed
}

const industryByCurrentBussinesId = computed(() => {
  const businessData = business.value.data as Business[]

  return businessData.find((b: Business) => b.id === businessSelected.value.id)?.industry
})

const nameWithLang = ({ name }: any) => `${name}`

const getUnclassifiedCategoriesByBusinessFor6MonthsAgo = () => {
  const today = new Date()
  const sixMonthsAgo = subMonths(today, 6)

  const formattedToday = format(today, "yyyy-M-dd")
  const formattedSixMonthsAgo = format(sixMonthsAgo, "yyyy-M-dd")

  store.getUnclassifiedCategoriesByBusiness({
    clientId: clientSelected.value.id,
    businessId: businessSelected.value.id,
    params: {
      start_date: formattedSixMonthsAgo,
      end_date: formattedToday
    }
  })
}

// const handleSelectLevel = (item: any) => {
//   store.createCategoriesByTemplateClient({
//     clientId: clientSelected.value.id,
//     businessId: businessSelected.value.id,
//     templateId: templateCategorySelected.value,
//     data: {
//       code: item.code,
//       idLevel: item.level.id
//     }
//   })
// }

</script>

<style lang="scss">

</style>