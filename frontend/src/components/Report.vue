<template>
  <v-card class="mb-4" :max-width="width">
    <v-card-title>{{data[0]}}</v-card-title>
  </v-card>
</template>

<script lang="ts" setup>
defineProps({
  data: {},
  width: { type: Number, required: false },
});

</script>
