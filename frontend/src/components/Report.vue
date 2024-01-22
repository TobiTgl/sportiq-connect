<template>
  <v-card class="mb-4" :max-width="width">
    <v-card-title>{{ data }}</v-card-title>
  </v-card>
</template>

<script lang="ts" setup>
defineProps({
  data: { type: Object, required: true },
  width: { type: Number, required: false },
});
</script>
