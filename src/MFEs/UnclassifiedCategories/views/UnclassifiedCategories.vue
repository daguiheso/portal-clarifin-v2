<template>
  <Pageheader
    heading="Categorias a Clasificar"
    :maintitle="['Home', 'Categorias a clasificar']" />

  <div class="row justify-content-center upload-template">
    <div class="bg-white py-4 px-5 col col-12 card">

      <div
        v-if="!areThereQueryParams"
        class="col-xs-12 text-start pb-4">
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
              <label class="control-label fw-semibold mb-2">Negocio</label>

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

      <div class="table-responsive">
        <table class="table text-nowrap">
          <thead>
            <tr>
              <th scope="col">
                Categoria
              </th>
              <th scope="col">
                Tag
              </th>

              <th scope="col">
                Nivel
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(item, index) in listAccounting"
              :key="index">

              <td>{{ item.description }}</td>
              <td><span class="badge bg-danger-transparent">No clasificada</span></td>

              <td class="col-4">
                <div class="">
                  <multiselect1
                    v-model="item.level"
                    :show-labels="false"
                    :options="filteredLevels"
                    :custom-label="nameWithLang"
                    placeholder="Select one"
                    label="name"
                    track-by="name"
                    @select="handleSelectLevel">
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
                      <div class="no-result">
                        No hay niveles propios
                      </div>
                    </template>
                  </multiselect1>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"
import { format, subMonths } from "date-fns"
import Pageheader from "@/shared/components/pageheader/Pageheader.vue"
import { useRoute } from "vue-router"

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
const currentLevelsFilter = ref<"all" | "own" | "base">("all")
const route = useRoute()

const queryParamClient = route.query.client
const queryParamBusiness = route.query.business
const queryParamStartDate = route.query.start_date
const queryParamEndDate = route.query.end_date

store.accounting = {
  data: [],
  error: null,
  isLoading: false
}

getClients()
store.getLevels()

const listAccounting = computed(() => Array.isArray(store.accounting.data) ? [...store.accounting.data] : [])

const filteredLevels = computed(() => {
  if (currentLevelsFilter.value === "all") return levelsAndBusinessLevels.value

  if (currentLevelsFilter.value === "own") return store.levelsByBusiness.data

  return store.levels.data
})

const levelsAndBusinessLevels = computed(() => {
  return [
    ...store.levels.data,
    ...store.levelsByBusiness.data
  ]
})

const selectClient = () => {
  getBusiness(clientSelected.value.id)

  businessSelected.value = null
  store.getTemplateCategoriesByClient(clientSelected.value.id)
}

const setFilterLevels = (type: "all" | "own" | "base") => {
  currentLevelsFilter.value = type
}

const selectBusiness = async () => {
  getAccountingFor6MonthsAgo()

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

const getAccountingFor6MonthsAgo = () => {
  const today = new Date()
  const sixMonthsAgo = subMonths(today, 6)

  const formattedToday = format(today, "yyyy-M-dd")
  const formattedSixMonthsAgo = format(sixMonthsAgo, "yyyy-M-dd")

  store.getAccounting({
    clientId: clientSelected.value.id,
    businessId: businessSelected.value.id,
    params: {
      start_date: formattedSixMonthsAgo,
      end_date: formattedToday
    }
  })
}

const handleSelectLevel = (level: any) => {
  store.createCategoriesByTemplateClient({
    clientId: clientSelected.value.id,
    businessId: businessSelected.value.id,
    templateId: templateCategorySelected.value,
    data: {
      code: templateCategorySelected.value,
      idLevel: level.id
    }
  })
}

const getAccounting = (startDate: any, endDate: any) => {
  store.getAccounting({
    clientId: clientSelected.value.id,
    businessId: businessSelected.value.id,
    params: {
      start_date: startDate,
      end_date: endDate
    }
  })
}

const areThereQueryParams = computed(() => Object.keys(route.query).length)

const init = async () => {
  if (Object.keys(route.query).length) {

    clientSelected.value = { id: queryParamClient }
    businessSelected.value = { id: queryParamBusiness }

    await store.getTemplateCategoriesByClient(queryParamClient as string)

    getAccounting(queryParamStartDate, queryParamEndDate)

    await setTemplateCategory()

    store.getLevelsByBusiness({
      clientId: clientSelected.value.id,
      businessId: businessSelected.value.id
    })
  }
}

init()
</script>

<style lang="scss">

</style>