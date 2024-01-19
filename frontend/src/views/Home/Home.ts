import { useDisplay } from "vuetify";
import SubscriptionList from "@/components/SubscriptionList.vue";
import DailyReport from "@/components/DailyReport.vue";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    "subscription-list": SubscriptionList,
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
