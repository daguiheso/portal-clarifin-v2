<template>
  <Pageheader heading="Create Model Template" :maintitle='["Home", "Model Template"]'></Pageheader>

  <div>
    <!-- Botón global para añadir ítems al nivel 1 -->
     <div class="d-flex justify-content-end">
       <button class="add-level-1-btn" @click="addSibling(null)">Add Category</button>
     </div>

    <div v-for="(item, index) in items" :key="item.id"
         :class="{'item-container': true, 'drag-over-valid': item.isDragOverValid, 'drag-over-invalid': item.isDragOverInvalid }">
      <div
        class="item"
        :style="{ paddingLeft: `${(item.level) * 20}px` }"
        draggable="true"
        @dragstart="onDragStart($event, item, index, items)"
        @dragover="onDragOver($event, item, items)"
        @dragleave="onDragLeave($event, item)"
        @drop="onDrop($event, index, items)"
      >
        <div class="item-content">
          <div class="item-icon">
            <i class="icon ion-md-pricetags"></i>
          </div>
          <input
            v-model="item.name"
            placeholder="Item name"
            class="item-input"
            @input="updateItemOrder"
          />

          <!-- Mostrar el select solo si el ítem es terminal en el nivel actual -->
          <select v-if="shouldShowSelect(item)" v-model="item.selectedOption" class="item-select">
            <option v-for="(option, idx) in options" :key="idx" :value="option">{{ option }}</option>
          </select>

          <!-- Botones de acción -->
          <div class="item-actions">
            <!-- Mostrar el botón "Añadir subnivel" solo si no es el último nivel -->
            <button v-if="item.level < 2" class="action-btn" @click="addItem(item)">
              <i class="ri-add-fill"></i>
            </button>
            <button class="action-btn" @click="removeItem(item)">
              <i class="ri-subtract-fill"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Recursividad para mostrar los subniveles -->
      <template v-if="item.subItems && item.subItems.length > 0">
        <template v-for="(subItem, subIndex) in item.subItems" :key="subItem.id">
          <div
            class="item"
            :style="{ paddingLeft: `${(subItem.level) * 20}px` }"
            draggable="true"
            :class="{'drag-over-valid': subItem.isDragOverValid, 'drag-over-invalid': subItem.isDragOverInvalid }"
            @dragstart="onDragStart($event, subItem, subIndex, item.subItems)"
            @dragover="onDragOver($event, subItem, item.subItems)"
            @dragleave="onDragLeave($event, subItem)"
            @drop="onDrop($event, subIndex, item.subItems)"
          >
            <div class="item-content">
              <div class="item-icon">
                <i class="icon ion-md-pricetags"></i>
              </div>
              <input
                v-model="subItem.name"
                placeholder="Sub-item name"
                class="item-input"
                @input="updateItemOrder"
              />

              <!-- Mostrar el select solo si el ítem es terminal en el nivel actual -->
              <select v-if="shouldShowSelect(subItem)" v-model="subItem.selectedOption" class="item-select">
                <option v-for="(option, idx) in options" :key="idx" :value="option">{{ option }}</option>
              </select>

              <!-- Botones de acción -->
              <div class="item-actions">
                <!-- Mostrar el botón "Añadir subnivel" solo si no es el último nivel -->
                <button v-if="subItem.level < 2" class="action-btn" @click="addItem(subItem)">
                  <i class="ri-add-fill"></i>
                </button>
                <button class="action-btn" @click="removeItem(subItem, item.subItems)">
                  <i class="ri-subtract-fill"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Recursividad para mostrar los subniveles anidados -->
          <div v-if="subItem.subItems && subItem.subItems.length > 0">
            <div v-for="(nestedItem, nestedIndex) in subItem.subItems" :key="nestedItem.id">
              <div
                class="item"
                :style="{ paddingLeft: `${(nestedItem.level) * 20}px` }"
                draggable="true"
                :class="{'drag-over-valid': nestedItem.isDragOverValid, 'drag-over-invalid': nestedItem.isDragOverInvalid }"
                @dragstart="onDragStart($event, nestedItem, nestedIndex, subItem.subItems)"
                @dragover="onDragOver($event, nestedItem, subItem.subItems)"
                @dragleave="onDragLeave($event, nestedItem)"
                @drop="onDrop($event, nestedIndex, subItem.subItems)"
              >
                <div class="item-content">
                  <div class="item-icon">
                    <i class="icon ion-md-pricetags"></i>
                  </div>
                  <input
                    v-model="nestedItem.name"
                    placeholder="Nested item name"
                    class="item-input"
                    @input="updateItemOrder"
                  />

                  <!-- Mostrar el select solo si el ítem es terminal en el nivel actual -->
                  <select v-if="shouldShowSelect(nestedItem)" v-model="nestedItem.selectedOption" class="item-select">
                    <option v-for="(option, idx) in options" :key="idx" :value="option">{{ option }}</option>
                  </select>

                  <!-- Botones de acción -->
                  <div class="item-actions">
                    <!-- Mostrar el botón "Añadir subnivel" solo si no es el último nivel -->
                    <button v-if="nestedItem.level < 2" class="action-btn" @click="addItem(nestedItem)">
                      <i class="ri-add-fill"></i>
                    </button>
                    <button class="action-btn" @click="removeItem(nestedItem, subItem.subItems)">
                      <i class="ri-subtract-fill"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </template>
    </div>

    <div>
      <h3>Resultado JSON</h3>
      <pre>{{ JSON.stringify(items, null, 2) }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
// @ts-nocheck
import { ref } from 'vue';
import Pageheader from "@/shared/components/pageheader/Pageheader.vue";

const items = ref([
  {
    id: 1,
    name: '',
    level: 0,
    priority: 1,
    selectedOption: null,
    subItems: [],
    isDragOverValid: false,
    isDragOverInvalid: false,
  },
]);

// Variables para drag-and-drop
let draggedItem: null = null;
let draggedIndex: null = null;
let draggedParentArray: any[]|null = null;

const options = ref(['Opción 1', 'Opción 2', 'Opción 3']);

const shouldShowSelect = (item: { subItems: string|any[]; }) => {
  return !item.subItems.length;
};

const addItem = (parentItem: { level: number; subItems: { id: number; name: string; level: any; priority: any; selectedOption: null; subItems: never[]; isDragOverValid: boolean; isDragOverInvalid: boolean; }[]; }) => {
  if (parentItem.level < 2) {
    parentItem.subItems.push({
      id: Date.now(),
      name: '',
      level: parentItem.level + 1,
      priority: parentItem.subItems.length + 1,
      selectedOption: null,
      subItems: [],
      isDragOverValid: false,
      isDragOverInvalid: false,
    });
    updateItemOrder();
  }
};

const addSibling = () => {
  items.value.push({
    id: Date.now(),
    name: '',
    level: 0,
    priority: items.value.length + 1,
    selectedOption: null,
    subItems: [],
    isDragOverValid: false,
    isDragOverInvalid: false,
  });
  updateItemOrder();
};

const removeItem = (item: any, parentArray = items.value) => {
  const index = parentArray.indexOf(item);
  if (index !== -1) {
    parentArray.splice(index, 1);
    updateItemOrder();
  }
};

// Funciones para drag-and-drop
const onDragStart = (event: any, item: any, index: any, parentArray: any) => {
  draggedItem = item;
  draggedIndex = index;
  draggedParentArray = parentArray || items.value; // Si es null, está en el primer nivel
};

const onDragOver = (event: { preventDefault: () => void; }, item: { isDragOverValid: boolean; isDragOverInvalid: boolean; }, parentArray: any) => {
  event.preventDefault(); // Permite el drop

  // Verificar si el arrastre y la caída se realizan dentro del mismo nivel
  if (draggedParentArray === parentArray) {
    // Si es el mismo array, marcar como válido
    item.isDragOverValid = true;
    item.isDragOverInvalid = false;
  } else {
    // Si no es el mismo array, marcar como inválido
    item.isDragOverValid = false;
    item.isDragOverInvalid = true;
  }
};

const onDragLeave = (event: any, item: { isDragOverValid: boolean; isDragOverInvalid: boolean; }) => {
  // Restablecer el estado de las clases de arrastre cuando el elemento se deja
  item.isDragOverValid = false;
  item.isDragOverInvalid = false;
};

const onDrop = (event: { preventDefault: () => void; }, index: any, parentArray: any[]) => {
  event.preventDefault();

  // Restablecer las clases de arrastre
  resetDragOverState();

  // Verificar si el arrastre y la caída se realizan dentro del mismo nivel
  if (draggedParentArray !== parentArray) {
    // Si no son el mismo array, cancelar la operación
    return;
  }

  // Evitar la acción si se está soltando en la misma posición
  if (draggedIndex === index && parentArray === draggedParentArray) return;

  // Eliminar el elemento arrastrado de su posición original
  draggedParentArray.splice(draggedIndex, 1);

  // Insertar el elemento arrastrado en la nueva posición
  parentArray.splice(index, 0, draggedItem);

  // Resetear las variables de drag
  draggedItem = null;
  draggedIndex = null;
  draggedParentArray = null;

  // Actualizar el orden de los ítems
  updateItemOrder();
};

// Función para restablecer el estado de las clases de arrastre
const resetDragOverState = () => {
  const clearState = (itemsArray: any[]) => {
    itemsArray.forEach((item: { isDragOverValid: boolean; isDragOverInvalid: boolean; subItems: string|any[]; }) => {
      item.isDragOverValid = false;
      item.isDragOverInvalid = false;
      if (item.subItems && item.subItems.length) {
        clearState(item.subItems);
      }
    });
  };
  clearState(items.value);
};

// Función para actualizar el orden de prioridad de los ítems
const updateItemOrder = () => {
  const setPriority = (itemsArray: any[]) => {
    itemsArray.forEach((item: { priority: any; subItems: string|any[]; }, index: number) => {
      item.priority = index + 1;
      if (item.subItems && item.subItems.length) {
        setPriority(item.subItems); // Recursión para subniveles
      }
    });
  };

  setPriority(items.value);
};
</script>

<style lang="scss" scoped>
.item-container {
  border-radius: 8px;
  padding: 8px 22px;
  margin: 6px 0;
  background-color: #f9f9f9;

  &.drag-over-valid {
    border: 2px dashed green;
  }

  &.drag-over-invalid {
    border: 2px dashed red;
  }
}

.item {
  border-top: 1px solid rgb(240, 241, 243);
  border-bottom: 1px solid rgb(240, 241, 243);
  padding: 5px;

  &.drag-over-valid {
    background-color: #e0ffe0;
  }

  &.drag-over-invalid {
    background-color: #ffe0e0;
  }
}

/* Resto del CSS */
.item-content {
  display: flex;
  align-items: center;
}

.item-icon {
  margin-right: 8px;
  height: 22px;

  i {
    height: 22px;
  }
}

.item-input {
  flex: 1;
  padding: 0 5px;
  background: transparent;
  border-radius: 4px;
  margin-right: 8px;
  outline: none;
  height: 22px;
}

.item-select {
  padding: 0 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 8px;
  outline: none;
  height: 22px;
}

.item-actions {
  display: flex;
  gap: 4px;
}

.action-btn {
  background-color: #e0e0e0;
  border: none;
  border-radius: 4px;
  padding: 0px 0px;
  cursor: pointer;
  height: 22px;
  width: 22px;
}

.add-level-1-btn {
  background-color: #e0e0e0;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  margin-bottom: 10px;
}

.add-level-1-btn:hover,
.action-btn:hover {
  background-color: #d0d0d0;
}

input {
  border: 0;
}
</style>
