<template>
  <v-container v-if="data.length === 0">
    <v-row class="fill-height" align-content="center" justify="center">
      <v-col cols="12">
        <v-alert icon="mdi-information-outline">
          No reports have been posted yet!
        </v-alert>
      </v-col>
    </v-row>
  </v-container>

  <vue-flex-waterfall
    v-else
    align-content="center"
    col="5"
    :break-at="breakAt"
    col-spacing="15"
    :break-by-container="true"
  >
    <report-vue
      v-for="item in data"
      :id="item.title"
      :width="width"
      :data="item"
    />
  </vue-flex-waterfall>
</template>

<script lang="ts" setup>
import { VueFlexWaterfall } from "vue-flex-waterfall";
import ReportVue from "@/components/Report.vue";

defineProps({
  data: { type: Array<any>, required: true },
});

const width = 200;
const breakAt = (() => {
  const obj: Record<string, number> = {};
  for (let i = 1; i <= 5; i++) {
    obj[width * (i + 1) + 15 * i] = i;
  }
  return obj;
})();
</script>
