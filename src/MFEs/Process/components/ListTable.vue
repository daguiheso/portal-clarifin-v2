<template>
  <template v-if="store.proccessResult.isLoading">
    <ClaSpinner />
  </template>

  <template v-else-if="!store.proccessResult.data.length">
    <div
      class="alert alert-info"
      role="alert">
      No se encontraron procesos
    </div>
  </template>

  <template v-else>
    <vue-good-table
      ref="accountingTable"
      class="cla-table"
      :columns="columns"
      :rows="store.proccessResult.data"
      max-height="600px"
      :search-options="{
        enabled: true,
        placeholder: 'Busca por nombre de categoria o código',
      }"
      :pagination-options="{
        enabled: true,
        mode: 'pages',
        perPage: 100,
        position: 'bottom',
        perPageDropdown: [50, 100, 200],
        dropdownAllowAll: false,
        jumpFirstOrLast : true,
        firstLabel : 'Primera Pag',
        lastLabel : 'Ultima Pag',
        nextLabel: 'Siguiente',
        prevLabel: 'Anterior',
        rowsPerPageLabel: 'Registros por página',
        ofLabel: 'de',
        pageLabel: 'Página', // for 'pages' mode
        allLabel: 'Todas',
      }"
      compact-mode
      style-class="vgt-table condensed">

      <template #table-row="props">

        <span v-if="props.column.field === 'createAt'">
          {{ formattedDate(props.row.createAt) }}
        </span>

        <span v-else-if="props.column.field === 'dateProcess'">
          <span class="badge bg-dark-transparent">
            {{ formattedMonthAndYear(props.row.dateProcess) }}
          </span>
        </span>

        <span v-else-if="props.column.field === 'status'">
          <span :class="statusClass(props.row.status)">
            {{ props.row.status }}
          </span>
        </span>

        <span v-else-if="props.column.field === 'businessUnits'">
          {{ props.row.businessUnits.length }}
        </span>

        <!-- Fallback para columnas sin personalización -->
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>

    </vue-good-table>
    <!-- <p>p: {{ accountingTable?.selectedRows }}</p> -->

  </template>
</template>

<script lang="ts" setup>
import { ref } from "vue"

import "vue-multiselect/dist/vue-multiselect.css"

import "vue3-form-wizard/dist/style.css"

import useProcessStore from "../stores"
import ClaSpinner from "@/commons/components/ClaSpinner.vue"
import { formattedDate, formattedMonthAndYear } from "@/commons/utils"


const store = useProcessStore()
const accountingTable = ref<any>(null)

const statusClass = (status: string) => {
  return {
    "badge bg-success-transparent": status === "SUCCESS",
    "badge bg-warning-transparent": status === "INITIAL",
    "badge bg-danger-transparent": status === "ERROR",
  }
}

const columns = ref([
  {
    label: "Creado",
    field: "createAt",
  },
  {
    label: "Estado",
    field: "status",
  },
  {
    label: "Mes Cargado",
    field: "dateProcess",
  },
  {
    label: "Unid Negocio",
    field: "businessUnits",
  },
  {
    label: "Id Formato",
    field: "idFormat",
  },
  {
    label: "Id Process",
    field: "idProcess",
  },
])

</script>

<style lang="scss">
.cla-table {
  .vgt-table {
    border: none;
    td, th {
      vertical-align: middle;
      border: none !important;
    }
  }

  th.vgt-checkbox-col {
    background: none;
  }
  .vgt-global-search {
    border: none;

    &__input {
      width: 50%;
      padding: 0;
      .input__icon {
        display: none;
      }
    }
  }


  .vgt-selection-info-row {
    border: none;
  }
}

</style>
