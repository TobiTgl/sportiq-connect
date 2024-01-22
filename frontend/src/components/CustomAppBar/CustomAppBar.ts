import { useTheme } from "vuetify";
import { useDisplay } from "vuetify";
import { computed, ref } from "vue";
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
          needsAuth: false,
        },
        {
          title: "Dashboard",
          route: "Dashboard",
          icon: "mdi-view-dashboard",
          needsAuth: true,
        },
        {
          title: "Create Report",
          route: "Create",
          icon: "mdi-card-plus-outline",
          needsAuth: true,
        },
      ],
    };
  },
  setup() {
    const theme = useTheme();
    const { xs, lgAndUp } = useDisplay();
    const drawer = ref(lgAndUp.value ? true : false);
    const themeTitle = ref(theme.global.current.value.dark ? "Dark" : "Light");

    const toggleTheme = () => {
      theme.global.name.value = theme.global.current.value.dark
        ? "light"
        : "dark";
      themeTitle.value = theme.global.current.value.dark ? "Dark" : "Light";
    };

    const auth = getAuth();
    const user = auth.currentUser;
    const role = ref("");
    const tenant = ref("");

    user?.getIdTokenResult(true).then((res) => {
      if (res.claims.role) {
        role.value = "" + res.claims.role;
        tenant.value = "" + res.claims.tenant;
      }
    });

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

    const title = computed(() => {
      if (user !== null) {
        if (tenant.value === "Standard") {
          return "SportIQ Connect (Standard)";
        } else if (tenant.value !== "Free") {
          return "SportIQ Connect - " + tenant.value;
        } else {
          return "SportIQ Connect";
        }
      } else {
        return "SportIQ Connect";
      }
    });

    return {
      toggleTheme,
      xs,
      themeTitle,
      drawer,
      user,
      handleLogout,
      goTo,
      role,
      tenant,
      title,
    };
  },
};
