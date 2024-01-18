import { ref, onBeforeMount } from "vue";
import { getAuth } from "firebase/auth";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { getAdministrationServiceUrl } from "@/helpers/helpers";

import LoadingAlert from "@/components/LoadingAlert.vue";

export default {
  name: "Redirect",
  data() {
    return {
      // add variables
    };
  },
  components: {
    "loading-alert": LoadingAlert,
  },
  setup() {
    const alertMessage = ref("");
    const alertType = ref<"error" | "success" | "warning" | "info" | undefined>(
      undefined
    );
    const loading = ref(false);

    const auth = getAuth();
    const user = auth.currentUser;
    const route = useRoute();
    const router = useRouter();
    const statusCode = ref("");

    onBeforeMount(() => {
      const loading = ref(true);
      const params = route.query;
      // check if params are empty/undefined
      if (Object.keys(params).length > 0 && params.code !== undefined) {
        alertMessage.value = "Verbindung mit Strava wird hergestellt...";
        const code = params.code;

        // remove code from url
        window.history.replaceState({}, document.title, "/redirect" + "");

        // Send Strava auth code to backend
        user?.getIdToken().then((token) => {
          axios
            .get(
              `${getAdministrationServiceUrl()}/administration/stravaAuth?code=${code}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            )
            .then((res) => {
              // Strava auth data saved successfully
              localStorage.setItem("athleteId", res.data);
              loading.value = false;
              alertType.value = "success";
              alertMessage.value =
                "Ihr Account wurde mit Strava Verbunden! Sie werden in 3 Sekunden weitergeleitet...";
              setTimeout(() => {
                router.push("/profile");
              }, 3000);
            })
            .catch((error) => {
              // error handling when Strava auth data could not be saved
              statusCode.value = error.response.status;
              alertType.value = "error";
              alertMessage.value = `Verbindung zu Strava konnte nicht hergestellt werden. Bitte versuchen Sie es erneut. (Status: ${statusCode.value})`;
              loading.value = false;
            });
        });
      } else {
        //error handling when user reloads redirect page without query params
        loading.value = false;
        alertType.value = "info";
        alertMessage.value = `Die Verbindung zu Strava ist nur über die Profilseite möglich. Sie werden in 3 Sekunden weitergeleitet...`;
        setTimeout(() => {
          router.push("/profile");
        }, 3000);
      }
    });

    return {
      alertMessage,
      alertType,
      loading,
    };
  },
};
