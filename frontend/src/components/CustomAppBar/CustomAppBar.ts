import { useTheme } from "vuetify";
import { useDisplay } from "vuetify";
import { ref } from "vue";
import { getAuth, signOut } from "firebase/auth";
import router from "@/router";

export default {
  name: "customAppBar",
  data() {
    return {
      features: [
        {
          title: "Home",
          route: "Startpage",
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

    const auth = getAuth();
    const user = auth.currentUser;

    const handleLogout = async () => {
      await signOut(auth)
        .then(() => {
          localStorage.removeItem("athleteId");
          router.push("/");
          location.reload();
        })
        .catch((error) => {
          console.log(error.code);
        });
    };

    const goTo = async (route: String) => {
      router.push({ name: "" + route });
    };

    return {
      toggleTheme,
      xs,
      themeTitle,
      drawer,
      user,
      handleLogout,
      goTo,
    };
  },
};
