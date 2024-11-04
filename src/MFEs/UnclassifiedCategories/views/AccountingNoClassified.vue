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
    <div class="table-responsive">
      <table class="table text-nowrap">
        <thead>
          <tr>
            <th scope="col">
              Categoria
            </th>
            <th scope="col">
              Código
            </th>
            <th scope="col">
              Tag
            </th>
            <th scope="col">
              LLaves
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(item, index) in listAccountingNoClassified"
            :key="index">

            <td>{{ item.description }}</td>
            <td>{{ item.code }}</td>
            <td><span class="badge bg-danger-transparent">No clasificada</span></td>

            <td class="col-4">
              <div class="">
                <multiselect1
                  v-model="item.category"
                  :show-labels="false"
                  :options="filteredLevelNames"
                  placeholder="Select one"
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
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
  const categoryId = levelsAndBusinessLevels.value.find(level => level?.name === item.category)?.id

  if (!categoryId) {
    // TODO: Handler possible error
    return
  }

  store.createCategoriesByTemplateClient({
    templateId: props.templateId,
    data: {
      code: item.code,
      idLevel: categoryId
    }
  })
}

</script>
