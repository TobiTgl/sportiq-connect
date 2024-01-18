<template>
  <v-container fluid class="text-center">
    <h1>Get the complete company analysis platform.</h1>
    <v-row justify="center" class="mt-3">
      <v-col cols="12" class="pb-0">
        <v-label>How often do you want to pay?</v-label>
      </v-col>
      <v-col cols="12">
        <label class="switch">
          <input type="checkbox" id="togBtn" v-model="isYearly" />
          <div class="slider round">
            <span class="on">Yearly</span>
            <span class="off">Monthly</span>
          </div>
        </label>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col
        v-for="item in subscriptions"
        :id="item"
        cols="12"
        sm="6"
        md="4"
        class="pricing-card mb-5"
      >
        <subscription-card
          :title="item.title"
          :yearlyPrice="item.yearlyPrice"
          :monthlyPrice="item.monthlyPrice"
          :description="item.description"
          :features="item.features"
          :buttonText="item.buttonText"
          :highlighted="item.highlighted"
          :isYearly="isYearly"
          :currentplan="item.currentPlan"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import SubscriptionCard from "@/components/SubscriptionCard.vue";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { ref } from "vue";
import { getAuthServiceUrl } from "@/helpers/helpers";

const auth = getAuth();
const user = auth.currentUser;

const loading = ref(true);

const msg = ref("");
const showMsg = ref(false);
const msgType = ref<"success" | "error">("success");

const isYearly = ref(true);
const subscriptions = ref([
  {
    title: "Free",
    monthlyPrice: "0",
    yearlyPrice: "0",
    description: "The basics plan for simple analytics and beginners",
    features: ["Create Reports", "5 requests per day", "...", "..."],
    buttonText: "Continue with Free",
    currentPlan: true,
  },
  {
    title: "Standard",
    monthlyPrice: "15",
    yearlyPrice: "13,75",
    description:
      "Advanced collaboration for individuals and unlimited requests",
    features: [
      "Save and share reports",
      "Follow friends",
      "Unlimited requests",
      "...",
      "...",
    ],
    buttonText: "Continue with Standard",
    highlighted: true,
    currentPlan: false,
  },
  {
    title: "Enterprise",
    monthlyPrice: "",
    yearlyPrice: "",
    description: "Advanced collaboration organizations and unlimited requests",
    features: [
      "Get your own private space",
      "Create multiple users",
      "Custom branding",
      "...",
      "...",
    ],
    buttonText: "Contact Sales",
    currentPlan: false,
  },
]);

if (user) {
  user
    ?.getIdToken()
    .then((token) => {
      axios
        .get(getAuthServiceUrl() + "/auth/gettenant", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const subscription = res.data;
          console.log(subscription);
          if (subscription === "Free") {
            subscriptions.value[0].currentPlan = true;
            subscriptions.value[1].currentPlan = false;
            subscriptions.value[2].currentPlan = false;
          } else if (subscription === "Standard") {
            subscriptions.value[0].currentPlan = false;
            subscriptions.value[1].currentPlan = true;
            subscriptions.value[2].currentPlan = false;
          } else if (subscription === "Enterprise") {
            subscriptions.value[0].currentPlan = false;
            subscriptions.value[1].currentPlan = false;
            subscriptions.value[2].currentPlan = true;
          }
          loading.value = false;
        });
    })
    .catch((error) => {
      console.log(error);
      loading.value = false;
    });
} else {
  loading.value = false;
}
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 125px;
  height: 34px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(-70deg, #9867f0 0%, #ed4e50 100%);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2ab934;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(90px);
  -ms-transform: translateX(90px);
  transform: translateX(90px);
}

/*------ ADDED CSS ---------*/
.on {
  display: none;
}

.on,
.off {
  color: white;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  font-size: 10px;
  font-family: Verdana, sans-serif;
}

input:checked + .slider .on {
  display: block;
}

input:checked + .slider .off {
  display: none;
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.pricing-card {
  transition: transform 0.3s;
}

.pricing-card:hover {
  transform: scale(1.05);
}
</style>
