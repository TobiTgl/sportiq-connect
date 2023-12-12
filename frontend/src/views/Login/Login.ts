import CustomFooter from "@/components/CustomFooter/index.vue";
import CustomAppBar from "@/components/CustomAppBar/index.vue";
import { useDisplay } from "vuetify";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import router from "@/router";
import { ref } from "vue";

export default {
  name: "Login",
  components: {
    "custom-app-bar": CustomAppBar,
    "custom-footer": CustomFooter,
  },
  data() {
    return {
      // add variables
    };
  },
  setup() {
    const { xs } = useDisplay();
    return {
      xs,
    };
  },
};
