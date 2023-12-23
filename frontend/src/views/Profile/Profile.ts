import PersonalInfo from "@/components/PersonalInfo.vue";
import StravaConnection from "@/components/StravaConnection.vue";
import PaymentsSubscriptions from "@/components/PaymentsSubscriptions.vue";

export default {
  name: "Profile",
  data() {
    return {
      // add variables
    };
  },
  components: {
    "personal-info": PersonalInfo,
    "strava-connection": StravaConnection,
    "payments-subscriptions": PaymentsSubscriptions,
  },
};
