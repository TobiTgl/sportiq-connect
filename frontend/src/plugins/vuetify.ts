import axios from "axios";
import { getBackendUrl } from "@/helpers/helpers";

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { aliases, mdi } from "vuetify/iconsets/mdi";

// Composables
import { createVuetify } from "vuetify";

// fetch custom theme if on a tenant domain
let customColor = "#48A9A6";
if (window.location.hostname.split(".").length > 1) {
  let subdomain = window.location.hostname.split(".")[0];
  await axios
    .get(getBackendUrl() + "/administration/theme/" + subdomain)
    .then((res) => {
      customColor = res.data;
    })
    .catch((error) => {
      throw error;
    });
}

export default createVuetify({
  theme: {
    defaultTheme: "light",

    themes: {
      light: {
        colors: {
          // add the colors which should be changed from the default
          secondary: customColor,
        },
      },
      dark: {
        colors: {
          // add the colors which should be changed from the default
          secondary: customColor,
        },
      },
    },
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});
