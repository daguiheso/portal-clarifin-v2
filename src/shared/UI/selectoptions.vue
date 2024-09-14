<template>
  <Multiselect :class="className" v-model="initialvalue" :options="options" :placeholder="placeholder" :id="id" track-by="name"
    label="name" :can-clear="canClear ?? true"
    :name="name" :mode="mode || 'single'" :groups="groups || false" :close-on-select="closeonselect || true" :searchable="searchable || false" :create-option="createoption || false"/>
</template>

<script>
import Multiselect from "@vueform/multiselect";

export default {
  props: ['width', 'className', 'height', 'type', 'options', 'series', 'refs', 'placeholder', 'id', 'name', 'value', 'mode', 'groups', 'closeonselect', 'searchable', 'createoption', 'canClear'],
  components: {
    Multiselect,
  },
  data() {
    return {
      initialvalue: this.value,
    }
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
