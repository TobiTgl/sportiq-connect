// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { aliases, mdi } from "vuetify/iconsets/mdi";

// Composables
import { createVuetify } from "vuetify";

export default createVuetify({
  theme: {
    defaultTheme: "light",

    themes: {
      light: {
        colors: {
          // add the colors which should be changed from the default
          //primary: "#3f51b5",
        },
      },
      dark: {
        colors: {
          // add the colors which should be changed from the default
          // primary: "#3f51b5",
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
