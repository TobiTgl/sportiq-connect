import { useDisplay } from "vuetify";
import { ref, onBeforeMount } from "vue";
import { getAuth } from "firebase/auth";
import SubscriptionList from "@/components/SubscriptionList.vue";
import DailyReport from "@/components/DailyReport.vue";

import axios from "axios";
import { getAdministrationServiceUrl } from "@/helpers/helpers";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    SubscriptionList,
    "daily-report": DailyReport,
  },
  setup() {
    const { xs, smAndDown } = useDisplay();

    return {
      xs,
      smAndDown,
    };
  },
};
