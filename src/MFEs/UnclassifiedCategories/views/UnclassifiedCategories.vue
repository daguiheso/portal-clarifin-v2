<template>
  <div class="d-flex align-items-center">
    <Pageheader
      heading="Categorías PUC"
      :maintitle="['Home', 'Categorías PUC']" />
  </div>

  <div class="row justify-content-center upload-template">
    <div class="bg-white py-4 px-5 col col-12 card">

      <div
        v-if="!areThereQueryParams"
        class="col-xs-12 text-start pb-2">
        <div class="col-md-12">

          <div class="d-flex justify-content-between flex-wrap">

            <div class="col-12 col-md-6 ps-md-3">
              <div class="form-group">
                <label class="control-label fw-semibold mb-2">Compañia / Sociedad</label>

                <multiselect1
                  v-model="store.businessSelected"
                  :show-labels="false"
                  :options="companies.data"
                  :custom-label="nameWithLang"
                  placeholder="Selecciona un nivel"
                  label="name"
                  track-by="name" />
              </div>
            </div>

            <div class="form-group col-12 col-md-5">
              <label class="control-label fw-semibold mb-2">Unidades de Negocio</label>

              <multiselect1
                v-model="store.businessUnitSelected"
                :show-labels="false"
                :options="store.businessSelected?.businessUnits || []"
                :custom-label="nameWithLang"
                placeholder="Select one"
                label="name"
                track-by="name"
                @select="selectBusinessUnit" />
            </div>
          </div>
        </div>
      </div>

      <div v-if="hasSelectedClientBusiness">
        <ul
          class="nav nav-tabs tab-style-1 d-sm-flex d-block"
          role="tablist">
          <li class="nav-item">
            <a
              class="nav-link active"
              data-bs-toggle="tab"
              data-bs-target="#all"
              aria-current="page"
              href="#all">
              Todas
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#not-classified"
              href="#not-classified">
              Sin Clasificar
            </a>
          </li>
        </ul>

        <div class="tab-content">
          <div
            id="all"
            class="tab-pane active p-0"
            role="tabpanel">

            <Accounting
              :template-id="templateCategorySelected" />
          </div>

          <div
            id="not-classified"
            class="tab-pane p-0"
            role="tabpanel">

            <AccountingNoClassified
              :template-id="templateCategorySelected" />
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onUnmounted, ref } from "vue"
import { format, subMonths } from "date-fns"
import Pageheader from "@/shared/components/pageheader/Pageheader.vue"
import { useRoute } from "vue-router"

import multiselect1 from "vue-multiselect"
import "vue-multiselect/dist/vue-multiselect.css"

import "vue3-form-wizard/dist/style.css"
import { useClientsBusiness } from "@/hooks/useClientsBusiness"

import useUnclassifiedCategoriesStore from "../stores"
import Accounting from "./Accounting.vue"
import AccountingNoClassified from "./AccountingNoClassified.vue"
import { initialState } from "../stores/state"

const store = useUnclassifiedCategoriesStore()
const { getCompanies, companies } = useClientsBusiness()
const templateCategorySelected = ref<any>(null)
const route = useRoute()

// const queryParamBusiness = route.query.business
// const queryParamStartDate = route.query.start_date
// const queryParamEndDate = route.query.end_date

store.accounting.data = []
store.accounting.error = null
store.businessSelected = null

store.getKeys()
getCompanies()
store.getTemplateCategoriesByClient()


const hasSelectedClientBusiness = computed(() => store.businessSelected && store.businessUnitSelected)

const selectBusinessUnit = async () => {
  getAccountingFor2YearsAgo()

  await setTemplateCategory()

  store.getKeysByCompany()
}

const setTemplateCategory = async () => {
  const haveTemplateCategory = store.existTemplateCategoryForBusinessUnit(store.businessUnitSelected.id)

  if (!haveTemplateCategory) {
    await store.createTemplateCategoryByClient({
      data: {
        name: `Company: ${store.businessSelected.name} - Business Unit: ${store.businessUnitSelected.name} - Created from Portal`,
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
  const businessData = companies.value.data as Business[]

  return businessData.find((b: Business) => b.id === store.businessSelected.id)?.industry
})

const nameWithLang = ({ name }: any) => `${name}`

const getAccountingFor2YearsAgo = () => {
  const today = new Date()
  const sixMonthsAgo = subMonths(today, 24)

  const formattedToday = format(today, "yyyy-M-dd")
  const formattedSixMonthsAgo = format(sixMonthsAgo, "yyyy-M-dd")

  store.getAccounting({
    params: {
      start_date: formattedSixMonthsAgo,
      end_date: formattedToday
    }
  })
}

// const getAccounting = (startDate: any, endDate: any) => {
//   store.getAccounting({
//     params: {
//       start_date: startDate,
//       end_date: endDate
//     }
//   })
// }

const areThereQueryParams = computed(() => Object.keys(route.query).length)

// const init = async () => {
//   if (areThereQueryParams.value) {

//     store.businessSelected = { id: queryParamBusiness }

//     await store.getTemplateCategoriesByClient()

//     getAccounting(queryParamStartDate, queryParamEndDate)

//     await setTemplateCategory()

//     store.getKeysByCompany()
//   }
// }

// init()

onUnmounted(() => {
  store.$state = initialState()
})
</script>

<style lang="scss">

</style>