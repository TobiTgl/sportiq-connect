<template>
  <v-container fluid class="text-center">
    <h2>Reports created in the last 24 hours:</h2>
    <transition name="fade">
      <h2 class="number" :key="dailyReport">{{ dailyReport }}</h2>
    </transition>
  </v-container>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { getReportServiceUrl } from "@/helpers/helpers";
import { onBeforeMount, ref } from "vue";

const { xs, smAndDown } = useDisplay();
const dailyReport = ref(0);

const auth = getAuth();
const user = auth.currentUser;

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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.number {
  color: #42b983; /* Vue green */
  font-size: 3em;
}
</style>
