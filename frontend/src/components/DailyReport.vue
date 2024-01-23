<template>
  <v-container fluid class="text-center">
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4">
        <v-card class="report-container rounded-lg pa-3" elevation="2">
          <h3>Reports created in the last 24 hours (globally)</h3>
          <h3 class="number">{{ displayedReport }}</h3>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { getReportServiceUrl } from "@/helpers/helpers";
import { onBeforeMount, ref, watch } from "vue";

const { xs, smAndDown } = useDisplay();
const dailyReport = ref(0);
const displayedReport = ref(0);

const auth = getAuth();
const user = auth.currentUser;

watch(dailyReport, (newVal, oldVal) => {
  const duration = 2000;
  const difference = newVal - oldVal;
  let start = Date.now();

  const easeInOutQuad = (t: number) =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  const step = () => {
    const elapsed = Math.min(Date.now() - start, duration);
    const t = elapsed / duration; // Normalized time (0.0 to 1.0)
    displayedReport.value = Math.floor(easeInOutQuad(t) * difference + oldVal);

    if (elapsed < duration) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
});

onBeforeMount(async () => {
  await axios
    .get(`${getReportServiceUrl()}/report/dailyreport`)
    .then((res) => {
      dailyReport.value = res.data;
    })
    .catch((error) => {});
});
</script>
<style>
.number {
  color: #48a9a6; /* Vue green */
  font-size: 2em;
}
.report-container {
  border: 1px solid #ddd; /* Gray border */
  /*box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Slight shadow for depth */
}
.report-container:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3) !important;
  transition: box-shadow 0.3s ease-in-out;
}
</style>
