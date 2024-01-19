import { useDisplay } from "vuetify";
import SubscriptionList from "@/components/SubscriptionList.vue";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    "subscription-list": SubscriptionList,
  },
  setup() {
    const { xs, smAndDown } = useDisplay();

    return {
      xs,
      smAndDown,
    };
  },
};
