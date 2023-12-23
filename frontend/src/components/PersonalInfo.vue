<template>
  <v-card class="pa-3" variant="outlined">
    <v-card-title>Personal info </v-card-title>
    <v-card-subtitle> Info about you </v-card-subtitle>

    <v-card-text>
      <v-form v-model="isValid">
        <v-row align="center">
          <v-col cols="12" sm="6">
            <v-avatar
              size="100"
              @click.prevent="selectImgOverlay = !selectImgOverlay"
              class="my-5"
            >
              <v-img src="https://i.pravatar.cc">
                <v-icon class="bg-primary on-top"> mdi-camera </v-icon>
              </v-img>
            </v-avatar>
            <select-image
              :model-value="selectImgOverlay"
              @update:model-value="selectImgOverlay = false"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Email (cannot be changed)"
              v-model="email"
              type="email"
              readonly
              variant="plain"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Name"
              v-model="name"
              type="name"
              :readonly="!editForm"
              :variant="!editForm ? 'plain' : 'filled'"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Password"
              v-model="password"
              type="password"
              :readonly="!editForm"
              :variant="!editForm ? 'plain' : 'filled'"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn
        v-if="!editForm"
        @click.prevent="
          editForm = !editForm;
          password = '';
        "
        variant="outlined"
      >
        Bearbeiten
      </v-btn>
      <template v-else>
        <v-btn
          color="error"
          @click.prevent="
            editForm = !editForm;
            password = '********';
          "
          :disabled="loading"
          variant="outlined"
        >
          Abbrechen
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          class="ml-5"
          color="success"
          @click.prevent="save"
          :loading="loading"
          :disabled="loading"
          variant="outlined"
        >
          Speichern
        </v-btn>
      </template>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { getAuth } from "firebase/auth";
import { ref } from "vue";
import SelectImage from "@/components/SelectImage.vue";

// rules
const rules = {
  password: [(v: any) => !!v || "Password is required."],
  email: [
    (v: any) => !!v || "E-Mail is required.",
    (v: any) =>
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
      "Unvalid e-mail address.",
  ],
};

const loading = ref(false);
const auth = getAuth();
const user = auth.currentUser;

const selectImgOverlay = ref(false);
const editForm = ref(false);
const name = ref<String | null | undefined>(user?.displayName);
const email = ref<String | null | undefined>(user?.email);
const password = ref<String>("********");
const isValid = ref(false);

async function save() {
  loading.value = true;
  // TODO: implement update user info
  console.log("uploading image...\nThis function is not yet implemented!");
  editForm.value = false;
  loading.value = false;
}
</script>

<style scoped>
.on-top {
  position: absolute;
  bottom: 0;
  height: 30%;
  width: 100%;
  left: 0;
  opacity: 0.6;
}
</style>
