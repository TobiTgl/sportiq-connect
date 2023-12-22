import { getAuth, signOut } from "firebase/auth";

export default {
  name: "Profile",
  data() {
    return {
      // add variables
    };
  },
  setup() {
    const auth = getAuth();
    const user = auth.currentUser;
    const client_id: string = import.meta.env.VITE_CLIENT_ID;
    const redirect_uri: string = import.meta.env.VITE_REDIRECT_URI;
    const stravaAuth = () => {
      const stravaAuthUrl = `https://www.strava.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=activity%3Aread_all&approval_prompt=force`;
      window.open(stravaAuthUrl, "PopupWindow", "width=600,height=800");
    };
    return {
      user,
      stravaAuth,
    };
  },
};
