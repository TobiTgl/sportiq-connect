<template>
  <v-card class="pa-3" variant="outlined">
    <v-card-title>Strava connection</v-card-title>
    <v-card-subtitle> Info about you and your preferences </v-card-subtitle>
    <v-card-text>
      <v-text-field
        v-if="stravaId !== null"
        v-model="stravaId"
        readonly
        variant="plain"
      />
      <v-btn
        v-if="stravaId === null"
        color="primary"
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
import { getAuth } from "firebase/auth";
import { ref } from "vue";

const auth = getAuth();
const user = auth.currentUser;
const stravaId = ref<string | null>(null);
const overlay = ref(false);

const client_id: string = import.meta.env.VITE_CLIENT_ID;
const redirect_uri: string = import.meta.env.VITE_REDIRECT_URI;

const stravaAuth = () => {
  const stravaAuthUrl = `https://www.strava.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=activity%3Aread_all&approval_prompt=force`;
  window.open(stravaAuthUrl, "PopupWindow", "width=600,height=800");
};

const disconnectStrava = () => {
  // TODO: delete connection in database
  stravaId.value = null;
};
</script>
