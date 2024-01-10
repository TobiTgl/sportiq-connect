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

    onMounted(() => {
      getAllReports()
        .then((data) => {
          reports.value = data;
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
