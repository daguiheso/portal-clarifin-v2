<template>
  <template v-if="store.accounting.isLoading">
    <ClaSpinner />
  </template>

  <template v-else-if="!listAccountingNoClassified.length">
    <div
      class="alert alert-info"
      role="alert">
      No se encontraron resultados
    </div>
  </template>

  <template v-else>
    <vue-good-table
      ref="accountingTable"
      class="cla-table"
      :columns="columns"
      :rows="listAccountingNoClassified"
      :search-options="{
        enabled: true,
        placeholder: 'Busca por nombre de categoria o código',
      }"
      :select-options="{
        enabled: true,
        selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
        selectionInfoClass: 'custom-class',
        selectionText: 'Registros seleccionados',
        clearSelectionText: 'Limpiar',
        disableSelectInfo: true, // disable the select info panel on top
        selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
        alwaysShowSelectionInfo: true, // always show the row count, even when nothing is selected
      }"
      compact-mode
      style-class="vgt-table condensed">

      <template #table-row="props">
        <span v-if="props.column.field == 'keys'">
          <div class="d-flex align-items-center">
            <multiselect1
              v-model="props.row.category"
              :disabled="Boolean(accountingTable?.selectedRows?.length && !accountingTable?.selectedRows.some((row: any) => row.code === props.row.code))"
              :show-labels="false"
              :options="filteredLevelNames"
              open-direction="bottom"
              :option-height="10"
              placeholder="Select one"
              @select="handleSelectLevel(props.row)">
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

              <template
                #option="{ option }">
                <div class="d-flex">
                  <span class="me-2">{{ option }}</span>

                  <div
                    v-if="store.createCategoriesByTemplate.isLoading"
                    class="spinner-grow spinner-grow-sm me-4"
                    role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
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
        </span>

        <span
          v-else
          class="">
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>

    </vue-good-table>
  </template>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"

import multiselect1 from "vue-multiselect"
import "vue-multiselect/dist/vue-multiselect.css"

import "vue3-form-wizard/dist/style.css"

import useUnclassifiedCategoriesStore from "../stores"
import ClaSpinner from "@/commons/components/ClaSpinner.vue"

const store = useUnclassifiedCategoriesStore()
const currentLevelsFilter = ref<"all" | "own" | "base">("all")
const accountingTable = ref<any>(null)

interface Props {
  templateId: string
}

const props = defineProps<Props>()

const listAccountingNoClassified = computed(() => Array.isArray(store.accountingNotClassified) ? [...store.accountingNotClassified] : [])

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

const filteredLevelNames = computed(() => filteredLevels.value.map(level => level?.name))

const setFilterLevels = (type: "all" | "own" | "base") => currentLevelsFilter.value = type

const handleSelectLevel = (item: any) => {
  const idLevel = levelsAndBusinessLevels.value.find(level => level?.name === item.category)?.id

  if (!idLevel) {
    // TODO: Handler possible error
    return
  }

  const selectedRows = accountingTable.value?.selectedRows ?? []
  const mappedRows: { code: any; idLevel: typeof idLevel }[] = []

  selectedRows.forEach((row: any) => {
    mappedRows.push({ code: row.code, idLevel })
    row.category = item.category
  })

  const data = selectedRows.length? mappedRows : [{ code: item.code, idLevel }]

  store.createCategoriesByTemplateClient({
    templateId: props.templateId,
    data
  })
}

const columns = ref([
  {
    label: "Categoria",
    field: "description",
    width: "400px",
  },
  {
    label: "Código",
    field: "code",
    type: "number",
    sortable: false,
  },
  {
    label: "LLaves",
    field: "keys",
    sortable: false,
    width: "250px",
  },
])

</script>
