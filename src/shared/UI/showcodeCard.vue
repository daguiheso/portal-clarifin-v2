<template>
    <div class="card custom-card" :class="customCardClass">
        <div class="card-header justify-content-between" :class="customCardHeaderClass">
            <div v-if="title" class="card-title" v-html="title"></div>
            <div v-if="header" v-html="header"></div>
            <div class="prism-toggle">
                <button class="btn btn-sm btn-primary-light" @click="toggleCode">
                    Show Code
                    <i class="ri-code-line ms-2 align-middle"></i>
                </button>
            </div>
        </div>
        <div class="card-body" :class="customCardBodyClass" v-if="!showCode">
            <slot></slot>
        </div>
        <div class="card-footer border-top-0" v-if="showCode" :class="customCardFooterClass">
            <code class="language-html">
                <pre class="language-html" >
{{ code.script }}
</pre>
    </code>
        </div>
    </div>
</template>
  
<script >
export default {
    props: {
        title: String,
        header: String,
        code: Object,
        customCardClass: String,
        customCardHeaderClass: String,
        customCardBodyClass: String,
        customCardFooterClass: String,
    },
    data() {
        return {
            showCode: false
        };
    },
    methods: {
        toggleCode() {
            this.showCode = !this.showCode;
        }
    }
};
</script>
  
<style scoped>
/* required class */
.my-editor {
    /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
    background: #2d2d2d;
    color: #ccc;

    /* you must provide font-family font-size line-height. Example: */
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
    outline: none;
}
</style>