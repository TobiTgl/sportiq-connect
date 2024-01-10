<template>
  <v-card class="mb-4" :max-width="width">
    <v-card-title>{{ data.title }}</v-card-title>
    <v-card-text> {{ data.text }} </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
defineProps({
  data: { type: Object, required: true },
  width: { type: Number, required: true },
});
</script>
