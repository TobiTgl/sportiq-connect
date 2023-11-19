import { useDisplay } from "vuetify";

export default {
  name: "Home",
  data() {
    return {};
  },
  setup() {
    const { xs, smAndDown } = useDisplay();

    return {
      xs,
      smAndDown,
    };
  },
};
