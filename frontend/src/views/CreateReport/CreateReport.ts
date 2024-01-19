import { getReportServiceUrl } from "@/helpers/helpers";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { ref } from "vue";
import { useDate } from "vuetify";

export default {
  name: "Create",
  data() {
    return {
      // add variables
    };
  },
  setup() {
    const dateConverter = useDate();
    const user = getAuth().currentUser;
    const notConnected = ref(false);
    const listOfActivities = ref<Array<any>>();
    const length = ref(0);

    const loading = ref(true);
    const showAlert = ref(false);
    const alertType = ref<"error" | "success" | "info" | undefined>(undefined);
    const alertMessage = ref("Getting activities...");

    async function getActivities() {
      loading.value = true;
      alertType.value = undefined;
      alertMessage.value = "Getting activities...";
      showAlert.value = true;
      const url =
        `${getReportServiceUrl()}/analysis/activities` +
        (startDate.value !== undefined
          ? "?after=" + new Date(startDate.value).getTime() / 1000
          : "") +
        (endDate.value !== undefined
          ? "&before=" + new Date(endDate.value).getTime() / 1000
          : "");
      console.log(url);

      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${user?.getIdToken()}`,
          },
        })
        .then((res) => {
          if (res.status === 204) {
            notConnected.value = true;
            showAlert.value = false;
            loading.value = false;
          } else {
            listOfActivities.value = res.data;
            length.value = res.data.length;
            showAlert.value = false;
            loading.value = false;
          }
        })
        .catch((error) => {
          alertType.value = "error";
          alertMessage.value = error.message;
          loading.value = false;
          showAlert.value = true;
        });
    }

    const startDate = ref();
    const endDate = ref();

    const startDialog = ref(false);
    const endDialog = ref(false);

    const listOfTypes = ref(["Run", "Cycling", "Swimming"]);
    const selectedOption = ref();

    return {
      notConnected,
      showAlert,
      alertType,
      alertMessage,
      loading,
      listOfActivities,
      listOfTypes,
      selectedOption,
      startDialog,
      endDialog,
      startDate,
      endDate,
      getActivities,
      length,
    };
  },
};
