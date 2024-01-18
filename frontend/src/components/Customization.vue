<template>
  <v-container fluid>
    <v-form>
      <v-btn class="mb-5" @click.prevent="reset">Reset to current state</v-btn>
      <v-row>
        <v-col cols="12" md="7" class="mr-5">
          <p>Current Logo:</p>
          <v-row class="mt-5">
            <img alt="Current logo" src="@/assets/logo.svg" height="80" />
            <v-file-input
              clearable
              label="File input"
              v-model="logo"
            ></v-file-input>
          </v-row>
          <v-btn
            class="mt-5"
            color="primary"
            @click.prevent="updateLogo"
            :loading="loading"
            :disabled="validLogo"
          >
            Update Logo
          </v-btn>
        </v-col>
        <v-col>
          <p>Current color:</p>
          <v-color-picker class="mt-5" v-model="color" v-model:mode="mode" />
          <v-select
            label="Color mode"
            v-model="mode"
            :items="modes"
            style="max-width: 300px"
          />
          <v-btn
            class="mt-5"
            color="primary"
            @click.prevent="updateColor"
            :loading="loading"
            :disabled="validColor"
          >
            Update Color
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { getAdministrationServiceUrl } from "@/helpers/helpers";
import vuetify from "@/plugins/vuetify";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { ref, computed } from "vue";

const loading = ref(false);
const logo = ref();
const currentColor = ref(vuetify.theme.current.value.colors.secondary);
const color = ref(currentColor.value);
const mode = ref<"hsla" | "rgb" | "rgba" | "hsl" | "hex" | "hexa" | undefined>(
  "hexa"
);
const modes = ref(["hsla", "rgba", "hexa"]);

const validColor = computed(() => {
  return color.value === currentColor.value;
});

const validLogo = computed(() => {
  return logo.value === undefined;
});

function reset() {
  logo.value = undefined;
  color.value = currentColor.value;
}

function updateLogo() {
  // Todo: update the logo
  loading.value = true;
  console.log(logo.value);
  setTimeout(() => {
    loading.value = false;
  }, 1500);
}

async function updateColor() {
  loading.value = true;
  const token = await getAuth().currentUser?.getIdToken();

  await axios
    .post(
      getAdministrationServiceUrl() + "/administration/theme",
      {
        color: color.value,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((res) => {
      window.location.reload();
    })
    .catch((error) => {
      throw error;
    });
}
</script>
