<template>
  <v-card
    class="mb-3 rounded-xl"
    :width="width"
    :color="user ? 'secondary' : ''"
  >
    <v-card class="rounded-lg my-8 mx-8" style="overflow: visible">
      <v-card-text class="text-left text-truncate">
        Creator: {{ data.username }}
      </v-card-text>
      <v-card-text class="text-center text-h6 font-weight-medium pt-3 pb-0">
        {{ data.name }}
      </v-card-text>
      <v-card-text class="text-center">
        <p>Amount of Activities:{{ data.amountOfActivities }}</p>
        <p>Max Speed {{ Math.round(data.avgSpeed * 100) / 100 }}</p>
        <p>Average Speed {{ Math.round(data.avgSpeed * 100) / 100 }}</p>
        <p>Average Heartbeat {{ Math.round(data.avgHeartRate * 10) / 10 }}</p>
        <p>Max Heartbeat {{ Math.round(data.avgHeartRate * 10) / 10 }}</p>
        <p>Average Distance {{ Math.round(data.avgDistance * 100) / 100 }}</p>
      </v-card-text>
      <v-card-text class="text-right text-truncate">
        Timestamp: {{ niceDate }}
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const user = auth?.currentUser;

const props = defineProps({
  data: { type: Object, required: true },
  width: { type: Number, required: false },
});

const niceDate = ref("");
niceDate.value = `${new Date(props.data.timestamp).getDate()}.${
  new Date(props.data.timestamp).getMonth() + 1
}.${new Date(props.data.timestamp).getFullYear()}`;
</script>
