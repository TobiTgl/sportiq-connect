import CustomFooter from "@/components/CustomFooter/index.vue";
import CustomAppBar from "@/components/CustomAppBar/index.vue";
import { useDisplay } from "vuetify";

export default {
  name: "NotFoundPage",
  components: {
    "custom-app-bar": CustomAppBar,
    "custom-footer": CustomFooter,
  },
  setup() {
    const { xs } = useDisplay();
    console.error(
      "CustomError: Failed to load resource, this page does not exist"
    );

    return {
      xs,
    };
  },
};
