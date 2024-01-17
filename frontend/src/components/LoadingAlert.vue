<template>
  <v-row class="my-5" justify="center">
    <v-card>
      <v-container>
        <v-row class="fill-heigh" align-content="center" justify="center">
          <v-col class="text-subtitle-1 text-center" cols="12">
            <v-alert :type="$props.alertType">{{ $props.alertMessage }}</v-alert>
          </v-col>
          <v-col cols="6" v-if="$props.loading">
            <v-progress-linear
              color="primary"
              rounded
              height="6"
              indeterminate
            ></v-progress-linear>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-row>
</template>

<script lang="ts" setup>
const props = defineProps({
  alertMessage: String,
  alertType: {
    type: String as () => "error" | "success" | "warning" | "info" | undefined,
    default: undefined,
  },
  loading: Boolean,
})
</script>
