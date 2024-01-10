import { ref, onMounted } from "vue";
import ListReport from "@/components/ListReport.vue";
import { getAllReports } from "@/services/reportService";

export default {
  name: "Dashboard",
  components: {
    "list-report": ListReport,
  },
  setup() {
    const reports = ref();
    const loading = ref(true);
    const showAlert = ref(true);
    const alertType = ref<"error" | "success" | undefined>(undefined);
    const alertMessage = ref("Getting reports");

    onMounted(() => {
      getAllReports()
        .then((data) => {
          reports.value = data;
          loading.value = false;
          showAlert.value = false;
        })
        .catch((error) => {
          alertType.value = "error";
          alertMessage.value = error.message;
          loading.value = false;
        });
    });

    return {
      reports,
      loading,
      showAlert,
      alertType,
      alertMessage,
    };
  },
};
