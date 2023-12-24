<template>
  <v-dialog v-model="isDialogOpen" max-width="680">
    <v-card class="pa-5">
      <v-card-title class="text-center">
        Select new profile picture
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form @submit.prevent="uploadImg" v-model="isValid">
          <v-file-input
            v-model="imgFile"
            label="Profile picture"
            :rules="rules.img"
            :clearable="false"
            accept="image/*"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn variant="outlined" @click.prevent="isDialogOpen = false">
          Cancel
        </v-btn>
        <v-btn
          variant="outlined"
          color="primary"
          :disabled="!isValid"
          @click.prevent="uploadImg"
        >
          Upload
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { getAuth } from "firebase/auth";
import { computed, ref } from "vue";

// props & emits
const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void;
}>();

// defines if the dialog is open or not
const isDialogOpen = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

// rules
const rules = {
  img: [(v: any) => !!imgFile.value || "Image is required."],
};

const loading = ref(false);
const auth = getAuth();
const user = auth.currentUser;

const imgFile = ref<[File] | undefined>(undefined);
const isValid = ref(false);

async function uploadImg() {
  loading.value = true;
  // TODO: implement upload image
  console.log("uploading image...\nThis function is not yet implemented!");
  console.log(imgFile.value?.[0]);
  window.location.reload();
}
</script>
