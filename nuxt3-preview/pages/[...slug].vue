<template>
  <main v-if="pending">
    Loading...
  </main>  
  <main v-else-if="error">
    Error: {{ error }}
  </main>
  <main v-else :data-sb-object-id="page.__id">
    <h1 data-sb-field-path="title">{{ page.title }}</h1>
  </main>
</template>

<script setup lang="ts">
import { contentChangeEmitter } from "~~/utils/emitter";

const route = useRoute();
const { pending, error, data: page, refresh } = await useAsyncData(() =>
  $fetch('/api/page', {
    method: 'post',
    body: '/' + ([...route.params.slug] || []).join('/'),
  })
);

contentChangeEmitter.on('change', () => {
  console.log(`[...slug] Got a content change! refreshing data`);
  refresh();
})
</script>
