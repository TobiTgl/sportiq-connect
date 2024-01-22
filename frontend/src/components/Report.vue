<template>
  <v-card class="mb-4" :max-width="width">
    <v-card-text>{{ data.username }}</v-card-text>
    <v-card-title> Title: {{ data.name }} </v-card-title>
    <v-card-text>
      <p>Timestamp: {{ data.timestamp }}</p>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
defineProps({
  data: { type: Object, required: true },
  width: { type: Number, required: false },
});
</script>
