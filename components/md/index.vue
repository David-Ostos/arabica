<template>
  <div class="h-full border p-4 rounded-xl">
    <div class="grid grid-cols-2 h-screen-topBar-footer border p-4 rounded-xl">
      <textarea
        v-model="md"
        class="w-full p-4 "
      />
      <MDC
      v-slot="{ data, body }"
      :value="md"
      >
      <article class="p-4 ">
        <h1 v-if="data?.title"
        >
            {{ data.title }}
          </h1>
          <MDCRenderer
            v-if="body"
            :body="body"
            :data="data"
          />
        </article>
      </MDC>
    </div>
    <BotonesBotonPrimary  />
  </div>
</template>

<script lang="ts" setup>


const md = ref(); 

</script>

<style scoped>
pre {
  padding: 1em 0 !important;
  --tw-prose-pre-bg: #8881 !important;
}
.line {
  display: block;
  padding: 0 1rem;
}
.line.highlight {
  width: 100%;
  background-color: #8881 !important;
}
.line.diff.remove {
  background-color: rgba(194, 58, 58, 0.3) !important;
}
.line.diff.add {
  background-color: rgba(46, 141, 46, 0.3) !important;
}
.line.diff.remove::before {
  content: '-';
  color: #c23a3a;
  position: absolute;
}
.line.diff.add::before {
  content: '+';
  color: #23b73c;
  position: absolute;
}
</style>