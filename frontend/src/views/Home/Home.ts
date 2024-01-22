import { useDisplay } from "vuetify";
import { ref, onBeforeMount } from "vue";
import { getAuth } from "firebase/auth";

import axios from "axios";
import { getAdministrationServiceUrl } from "@/helpers/helpers";

export default {
  name: "Home",
  data() {
    return {};
  },
  setup() {
    const { xs, smAndDown } = useDisplay();

    const auth = getAuth();
    const user = auth.currentUser;

    onBeforeMount(() => {
      user?.getIdToken().then((token): void => {
        console.log(token);
        axios
          .get(`${getAdministrationServiceUrl()}/report`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            // error handling when Strava auth data could not be saved
            console.log(error);
          });
      });
    });

    return {
      xs,
      smAndDown,
    };
  },
};


