<template>
  <v-card class="pa-3" variant="outlined" :loading="loading">
    <v-card-title>Payments & subscriptions</v-card-title>
    <v-card-subtitle>
      Your payment info and current subscription
    </v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <v-alert v-if="showMsg" :text="msg" :type="msgType" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3">
          <v-select
            label="Current subscription"
            :items="['Free', 'Standard', 'Enterprise']"
            v-model="subscription"
          />
        </v-col>
      </v-row>
      <v-btn
        @click.prevent="setTenant"
        :loading="loading"
        :disabled="loading"
        variant="outlined"
        color="primary"
      >
        Update
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import axios from "axios";
import { getAuth } from "firebase/auth";
import { ref } from "vue";
import { getAuthServiceUrl } from "@/helpers/helpers";

const auth = getAuth();
const user = auth.currentUser;

const subscription = ref("Free");
const loading = ref(true);

const msg = ref("");
const showMsg = ref(false);
const msgType = ref<"success" | "error">("success");

user
  ?.getIdToken()
  .then((token) => {
    axios
      .get(getAuthServiceUrl() + "/auth/gettenant", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        subscription.value = res.data;
        loading.value = false;
      });
  })
  .catch((error) => {
    console.log(error);
    loading.value = false;
  });

const setTenant = () => {
  loading.value = true;
  user
    ?.getIdToken()
    .then((token) => {
      axios
        .post(
          getAuthServiceUrl() + "/auth/settenant",
          {
            tenant: subscription.value,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(() => {
          msg.value = "Tenant successfully updated!";
          msgType.value = "success";
          showMsg.value = true;
          loading.value = false;
          setTimeout(() => {
            showMsg.value = false;
          }, 4000);
        })
        .catch((error) => {
          console.log(error.response.data.message);
          msg.value = error.response.data.message;
          msgType.value = "error";
          showMsg.value = true;
          loading.value = false;
        });
    })
    .catch((error) => {
      console.log(error.response.data.message);
      msg.value = error.response.data.message;
      msgType.value = "error";
      showMsg.value = true;
      loading.value = false;
    });
};
</script>
