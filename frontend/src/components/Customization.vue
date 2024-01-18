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
          <v-btn class="mt-5" color="primary" @click.prevent="updateLogo">
            Update Logo
          </v-btn>
        </v-col>
        <v-col>
          <p>Current color:</p>
          <v-color-picker class="mt-5" v-model="color" v-model:mode="mode" />
          <v-select v-model="mode" :items="modes" style="max-width: 300px" />
          <v-btn class="mt-5" color="primary" @click.prevent="updateColor">
            Update Color
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import vuetify from "@/plugins/vuetify";
import { ref } from "vue";

const logo = ref();
const currentColor = ref(vuetify.theme.current.value.colors.secondary);
const color = ref(currentColor.value);
const mode = ref<"hsla" | "rgb" | "rgba" | "hsl" | "hex" | "hexa" | undefined>(
  "hsla"
);
const modes = ref(["hsla", "rgba", "hexa"]);

function reset() {
  // Todo: update the logo
  logo.value = undefined;
  color.value = currentColor.value;
}

function updateLogo() {
  // Todo: update the logo
  console.log(logo.value);
}

function updateColor() {
  // Todo: update the color
  console.log(color.value);
}
</script>
