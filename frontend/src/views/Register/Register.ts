import CustomFooter from "@/components/CustomFooter/index.vue";
import CustomAppBar from "@/components/CustomAppBar/index.vue";
import { useDisplay } from "vuetify";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import router from "@/router";
import { ref } from "vue";
import axios from "axios";
import { getAuthServiceUrl } from "@/helpers/helpers";

export default {
  name: "Register",
  components: {
    "custom-app-bar": CustomAppBar,
    "custom-footer": CustomFooter,
  },
  data() {
    return {
      showPassword: false,
      rules: {
        password: [
          (v: any) => !!v || "Password is required.",
          (v: any) =>
            /^.{8,}$/.test(v) || "Password must be at least 8 characters.",
          (v: any) =>
            /.*\d.*/.test(v) || "Password must contain at least one number.",
          (v: any) =>
            /^.*[A-Z].*$/.test(v) ||
            "Password must contain at least one uppercase letter.",
          (v: any) =>
            /^.*[!@#$%^&*()_+{}|;:'",.<>?/\\-].*$/.test(v) ||
            "Password must contain at least one special character.",
        ],
        email: [
          (v: any) => !!v || "E-Mail is required.",
          (v: any) =>
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            "Unvalid e-mail address.",
        ],
        name: [
          (v: any) => !!v || "Name is required.",
          (v: any) =>
            (v && v.length >= 3) || "Name must be at least 3 characters.",
          (v: any) =>
            /^[A-Za-z\s]+$/.test(v) || "Name must only contain characters.",
        ],
      },
    };
  },
  setup() {
    const email = ref("");
    const password = ref("");
    const name = ref("");

    const { xs } = useDisplay();
    const isValid = ref(false);
    const auth = getAuth();
    const loading = ref(false);
    const errorMessage = ref("");

    const handleRegister = async () => {
      errorMessage.value = "";
      loading.value = true;
      await createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          // Set user name
          updateProfile(userCredential.user, {
            displayName: name.value,
          })
            .then(() => {
              userCredential.user.getIdToken().then((token) => {
                axios.post(
                  getAuthServiceUrl() + "/auth/settenant",
                  {
                    tenant: "Free",
                  },
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );
                router.push({ name: "Home" });
                loading.value = false;
              });
            })
            .catch((error) => {
              console.log(error.code);
              switch (error.code) {
                default:
                  errorMessage.value = error.message;
                  break;
              }
              loading.value = false;
            });
        })
        .catch((error) => {
          console.log(error.code);
          switch (error.code) {
            case "auth/invalid-credential":
              errorMessage.value =
                "The credential used cannot be used to perform the desired action.";
              break;
            case "auth/invalid-email":
              errorMessage.value =
                "The provided value for the email is invalid.";
              break;
            case "auth/invalid-password":
              errorMessage.value =
                "The provided value for the password is invalid.";
              break;
            case "auth/email-already-exists":
              errorMessage.value =
                "The provided email is already in use by an existing user. If you try to login, please use the login page!.";
              break;
            case "auth/email-already-in-use":
              errorMessage.value =
                "The provided email is already in use by an existing user. If you try to login, please use the login page!.";
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
      name,
      xs,
      isValid,
      auth,
      loading,
      errorMessage,
      handleRegister,
    };
  },
};
