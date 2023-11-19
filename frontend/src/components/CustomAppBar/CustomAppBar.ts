import { useTheme } from "vuetify";
import { useDisplay } from "vuetify";
import { ref } from "vue";

export default {
  name: "customAppBar",
  data() {
    return {
      features: [
        {
          title: "Home",
          route: "Home",
          icon: "mdi-home",
        },
      ],
    };
  },
  setup() {
    const theme = useTheme();
    const { xs, lgAndUp } = useDisplay();
    const drawer = ref(lgAndUp.value ? true : false);
    const themeTitle = ref(theme.global.current.value.dark ? "Dunkel" : "Hell");

    const toggleTheme = () => {
      theme.global.name.value = theme.global.current.value.dark
        ? "light"
        : "dark";
      themeTitle.value = theme.global.current.value.dark ? "Dunkel" : "Hell";
    };

    return {
      toggleTheme,
      xs,
      themeTitle,
      drawer,
    };
  },
};
