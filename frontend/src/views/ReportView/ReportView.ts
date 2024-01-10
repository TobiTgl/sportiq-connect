import { ref, onMounted } from "vue";
import Report from "@/components/Report.vue";
import { getSingleReport } from "@/services/reportService";
import { useRoute } from "vue-router";

export default {
  name: "ReportView",
  components: {
    report: Report,
  },
  setup() {
    const route = useRoute();
    const report = ref();
    const loading = ref(true);
    const showAlert = ref(true);
    const alertType = ref<"error" | "success" | undefined>(undefined);
    const alertMessage = ref("Getting report");

    onMounted(() => {
      getSingleReport(route.params.id.toString())
        .then((data) => {
          report.value = data;
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
      report,
      loading,
      showAlert,
      alertType,
      alertMessage,
    };
  },
};
