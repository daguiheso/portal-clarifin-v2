<template>
  <Multiselect
    :id="id"
    v-model="initialvalue"
    :class="className"
    :options="options"
    :placeholder="placeholder"
    track-by="name"
    label="name"
    :can-clear="canClear ?? true"
    :name="name"
    :mode="mode || 'single'"
    :groups="groups || false"
    :close-on-select="closeonselect || true"
    :searchable="searchable || false"
    :create-option="createoption || false" />
</template>

<script>
import Multiselect from "@vueform/multiselect"

export default {
  components: {
    Multiselect,
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ["width", "className", "height", "type", "options", "series", "refs", "placeholder", "id", "name", "value", "mode", "groups", "closeonselect", "searchable", "createoption", "canClear"],
  data () {
    return {
      initialvalue: this.value,
    }
  },
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
