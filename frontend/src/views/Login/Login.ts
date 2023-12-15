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
      showPassword: false,
      rules: {
        password: [(v: any) => !!v || "Password is required."],
        email: [
          (v: any) => !!v || "E-Mail is required.",
          (v: any) =>
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            "Unvalid e-mail address.",
        ],
      },
    };
  },
  setup() {
    const email = ref("");
    const password = ref("");

    const { xs } = useDisplay();
    const isValid = ref(false);
    const auth = getAuth();
    const loading = ref(false);
    const errorMessage = ref("");

    const handleLogin = async () => {
      errorMessage.value = "";
      loading.value = true;
      await signInWithEmailAndPassword(auth, email.value, password.value)
        .then(() => {
          router.push({ name: "Home" });
          loading.value = false;
        })
        .catch((error) => {
          console.log(error.code);
          switch (error.code) {
            case "auth/invalid-credential":
              errorMessage.value =
                "Wrong credentials. Please check your email and password.";
              break;
            case "auth/invalid-email":
              errorMessage.value =
                "The provided value for the email is invalid.";
              break;
            case "auth/invalid-password":
              errorMessage.value =
                "The provided value for the password is invalid.";
              break;
            case "auth/user-not-found":
              errorMessage.value =
                "There is no existing user record corresponding to the provided identifier.";
              break;
            default:
              errorMessage.value = error.message;
              break;
          }
          loading.value = false;
        });
    };

    return {
      email,
      password,
      xs,
      isValid,
      auth,
      loading,
      errorMessage,
      handleLogin,
    };
  },
};
