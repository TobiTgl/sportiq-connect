<template>
  <v-container fluid class="text-center report-container">
    <h2>Reports created in the last 24 hours:</h2>
    <h2 class="number">{{ displayedReport }}</h2>
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
  user?.getIdToken().then((token) => {
    axios
      .get(`${getReportServiceUrl()}/report/dailyreport`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        dailyReport.value = res.data;
      })
      .catch((error) => {
        // error handling when Strava auth data could not be saved
        console.log(error);
      });
  });
});
</script>
<style>
.number {
  color: #48a9a6; /* Vue green */
  font-size: 3em;
}
.report-container {
  background-color: #f9f9f9; /* Light gray background */
  border: 1px solid #ddd; /* Gray border */
  border-radius: 10px; /* Rounded corners */
  padding: 20px; /* Some padding */
  max-width: 600px; /* Maximum width */
  margin: 0 auto; /* Center the container */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Slight shadow for depth */
}
.report-container:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.3s ease-in-out;
}
</style>
