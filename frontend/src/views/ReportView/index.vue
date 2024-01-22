<template>
  <v-container fluid>
    <h1 class="mb-5">{{ data ? data.name : "" }}</h1>

    <!-- alert -->
    <v-container v-if="loading || showAlert">
      <v-row
        v-if="showAlert"
        class="fill-heigh"
        align-content="center"
        justify="center"
      >
        <v-col class="text-subtitle-1 text-center" cols="12">
          <v-alert :type="alertType">{{ alertMessage }}</v-alert>
        </v-col>
        <v-col cols="12" v-if="loading">
          <v-progress-linear
            color="primary"
            rounded
            height="6"
            indeterminate
          ></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>

    <template v-else>
      <v-card class="mb-6">
        <v-card-title class="text-center"
          ><h1 class="pa-5">Report {{ data.name }}</h1></v-card-title
        >
        <v-container>
          <h1 class="text-center">Metrics</h1>
          <v-row class="mb-6" no-gutters>
            <v-col>
              <v-sheet class="pa-2 ma-2 rounded-xl">
                <v-card-text class="text-center">
                  <v-row class="mb-2 pt-6" no-gutters>
                    <v-col class="text-grey-darken-2">
                      <h1>Amount of Activities</h1>
                    </v-col>

                    <v-col class="text-red">
                      <h1>Max Heartbeat</h1>
                    </v-col>
                    <v-col class="text-orange">
                      <h1>Max Speed</h1>
                    </v-col>
                  </v-row>
                  <v-row class="mb-2" no-gutters>
                    <v-col class="pt-6 text-grey-darken-2">
                      <h1>{{ data.amountOfActivities }}</h1>
                    </v-col>
                    <v-col class="pt-6 text-red">
                      <h1>
                        {{ data.avgMaxHeartRate.toString().slice(0, 5) }}
                      </h1>
                    </v-col>
                    <v-col class="pt-6 text-orange">
                      <h1>{{ data.avgMaxSpeed.toString().slice(0, 5) }}</h1>
                    </v-col>
                  </v-row>
                  <v-row class="mb-2" no-gutters>
                    <v-col class="pt-6"> </v-col>
                    <v-col class="pt-6 text-red">
                      <h1>bpm</h1>
                    </v-col>
                    <v-col class="pt-6 text-orange">
                      <h1>km/h</h1>
                    </v-col>
                  </v-row>
                  <v-row class="mb-2 pt-6" no-gutters>
                    <v-col class="text-amber">
                      <h1>Average Speed</h1>
                    </v-col>
                    <v-col class="text-blue">
                      <h1>Average Heartbeat</h1>
                    </v-col>

                    <v-col class="text-teal text-green">
                      <h1>Average Distance</h1>
                    </v-col>
                  </v-row>
                  <v-row class="mb-2" no-gutters>
                    <v-col class="pt-6 text-amber">
                      <h1>{{ data.avgSpeed.toString().slice(0, 5) }}</h1>
                    </v-col>
                    <v-col class="pt-6 text-blue">
                      <h1>{{ data.avgHeartRate.toString().slice(0, 5) }}</h1>
                    </v-col>
                    <v-col class="pt-6 text-green">
                      <h1>
                        {{ data.avgDistance.toString().slice(0, 5) / 1000 }}
                      </h1>
                    </v-col>
                  </v-row>
                  <v-row class="mb-2" no-gutters>
                    <v-col class="pt-6 text-amber">
                      <h1>km/h</h1>
                    </v-col>
                    <v-col class="pt-6 text-blue">
                      <h1>bpm</h1>
                    </v-col>
                    <v-col class="pt-6 text-green">
                      <h1>km</h1>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <v-card class="mb-6" v-if="data !== null">
        <v-container>
          <h1 class="text-center">Type of Activities</h1>
          <v-row justify="center">
            <li class="no-bullets" v-for="type in data.typeSummary">
              <v-col>
                <h2>{{ type }}</h2>
              </v-col>
            </li>
          </v-row>
        </v-container>
      </v-card>
      <v-card class="mb-6">
        <h1 class="text-center">Heartbeat data</h1>
        <p>{{ data.avgHeartRateData }}</p>
      </v-card>
      <v-card class="mb-6">
        <h1 class="text-center">Speed data</h1>
        <p>{{ data.avgSpeedData }}</p>
      </v-card>
      <v-card class="mb-6">
        <h1 class="text-center">distance data</h1>
        <p>{{ data.distanceData }}</p>
      </v-card>
      <v-card class="mb-6">
        <h1 class="text-center">Max Heartbeat Data</h1>
        <p>{{ data.maxHeartRateData }}</p>
      </v-card>
      <v-card class="mb-6">
        <h1 class="text-center">Max Speed Data</h1>
        <p>{{ data.maxSpeedData }}</p>
      </v-card>
      <v-card class="mb-6">
        <h1 class="text-center">Moving-time Data</h1>
        <p>{{ data.movingTimeData }}</p>
      </v-card>
    </template>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getSingleReport } from "@/services/reportService";
import { useRoute } from "vue-router";

const route = useRoute();
const data = ref();
const loading = ref(true);
const showAlert = ref(true);
const alertType = ref<"error" | "success" | undefined>(undefined);
const alertMessage = ref("Getting report");

onMounted(async () => {
  await getSingleReport(route.params.id.toString())
    .then((res) => {
      data.value = res;
      loading.value = false;
      showAlert.value = false;
    })
    .catch((error) => {
      alertType.value = "error";
      alertMessage.value = error.message;
      loading.value = false;
    });
});
</script>
