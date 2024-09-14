<template>
  <button class="btn btn-icon btn-light rounded-start-0 input-group-text flex-fill product-quantity-minus"
    @click="decrementValue"><i class="ri-subtract-line"></i></button>
  <input type="text" class="form-control form-control-sm border-0 text-center w-100" :placeholder="placeholder"
    :name="name" aria-label="quantity" v-model="inputValue">
  <button class="btn btn-icon btn-light rounded-end-0 input-group-text flex-fill product-quantity-plus"
    @click="incerementValue"><i class="ri-add-line"></i></button>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: {
    initialValue: {
      type: Number,
      default: 1,
    },
    name: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'quantity',
    }
  },
  setup(props, { emit }) {
    // Define a reactive variable to track the input value
    let inputValue = ref(props.initialValue);

    // Function to change the input type
    const incerementValue = () => {
      // Increase the count by one
      inputValue.value = isNaN(inputValue.value) ? 1 : Number(inputValue.value) + 1;
    };

    const decrementValue = () => {
      // Decrease the count by 1, but not less than 1
      inputValue.value = isNaN(inputValue.value) ? 1 : Math.max(1, Number(inputValue.value) - 1);
    };

    // Watch for changes in inputValue and emit an event to notify the parent
    watch(inputValue, () => {
      emit('input', inputValue.value);
    });

    // Return values and functions to be used in the template
    return {
      inputValue,
      incerementValue,
      decrementValue,
    };
  },


};
</script>
