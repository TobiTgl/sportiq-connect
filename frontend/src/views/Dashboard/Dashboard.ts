import { ref } from "vue";
import ListReport from "@/components/ListReport.vue";

export default {
  name: "Dashboard",
  components: {
    "list-report": ListReport,
  },
  setup() {
    const reports = ref();

    // TODO: Replace with API call
    reports.value = [
      {
        title: "Report 1",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae aliquet nisl nunc eget nisl. Donec auctor, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae aliquet nisl nunc eget nisl.",
      },
      {
        title: "Report 2",
        text: "This is a report about something",
      },
      {
        title: "Report 3",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae aliquet nisl nunc eget nisl. Donec auctor, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae aliquet nisl nunc eget nisl.",
      },
      {
        title: "Report 4",
        text: "This is a report about something",
      },
      {
        title: "Report 5",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae aliquet nisl nunc eget nisl. Donec auctor, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae aliquet nisl nunc eget nisl.",
      },
      {
        title: "Report 6",
        text: "This is a report about something",
      },
      {
        title: "Report 7",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae aliquet nisl nunc eget nisl. Donec auctor, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae aliquet nisl nunc eget nisl.",
      },
      {
        title: "Report 8",
        text: "This is a report about something",
      },
      {
        title: "Report 9",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae aliquet nisl nunc eget nisl. Donec auctor, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae aliquet nisl nunc eget nisl.",
      },
      {
        title: "Report 10",
        text: "This is a report about something",
      },
    ];

    return {
      reports,
    };
  },
};
