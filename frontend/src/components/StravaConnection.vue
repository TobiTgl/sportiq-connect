<template>
  <v-card class="pa-3" variant="outlined">
    <v-card-title>Strava connection</v-card-title>
    <v-card-subtitle> Info about you and your preferences </v-card-subtitle>
    <v-card-text>
      <v-text-field v-if="stravaAthleteId !== null" readonly variant="plain"
        >Your Strava athleteId: {{ stravaAthleteId }}
      </v-text-field>
      <v-btn
        v-if="stravaAthleteId === null"
        color="orange"
        @click="stravaAuth"
        variant="outlined"
      >
        Connect to Strava
      </v-btn>
      <v-btn v-else color="error" @click="overlay = true" variant="outlined">
        Disconnect
      </v-btn>
      <v-dialog
        v-model="overlay"
        class="align-center justify-center"
        max-width="500"
      >
        <v-card class="pa-5 text-center">
          <v-card-title class="text-error">
            <h1>Warning!</h1>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <p class="mb-2">
              Do you really want to disconnect your Strava account?
            </p>
            <p>This action can't be undone!</p>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn class="px-5" variant="outlined" @click="overlay = false">
              Cancel
            </v-btn>
            <v-btn
              class="ml-5 px-5"
              variant="outlined"
              color="primary"
              @click="disconnectStrava"
            >
              Disconnect
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import { getStravaAuthUrl } from "@/helpers/helpers";

const overlay = ref(false);
const stravaAthleteId = ref<string | null>(null);

const client_id: string = import.meta.env.VITE_CLIENT_ID;

onBeforeMount(() => {
  stravaAthleteId.value = localStorage.getItem("athleteId");
});

const stravaAuth = () => {
  window.location.href = getStravaAuthUrl();
};

const disconnectStrava = () => {
  localStorage.removeItem("athleteId");
  stravaAthleteId.value = null;
  overlay.value = false;
};
</script>
