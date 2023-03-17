<template v-once>
  <textarea v-if="mode === 'textarea'" :value="value" />
  <input
    v-else
    :value="value"
    @change="onChange($event, metadata)"
  >
</template>

<script>
import Tagify from "@yaireo/tagify/dist/tagify.min.js"
import "@yaireo/tagify/dist/tagify.css"

export default {
  name: "Tags",
  props: {
    // eslint-disable-next-line vue/require-default-prop
    mode: String,
    // eslint-disable-next-line vue/require-default-prop
    settings: Object,
    // eslint-disable-next-line vue/require-default-prop
    value: [String, Array],
    // eslint-disable-next-line vue/require-default-prop
    onChange: Function,
    // eslint-disable-next-line vue/require-default-prop
    metadata: [Object, Array, String]
  },
  watch: {
    value (newVal) {
      this.tagify.loadOriginalValues(newVal)
    }
  },
  mounted () {
    this.tagify = new Tagify(this.$el, this.settings)
  }
}
</script>
