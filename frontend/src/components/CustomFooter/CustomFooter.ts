import pjson from "../../../package.json";

export default {
  name: "customFooter",
  data() {

    return {
      appVersion: pjson.version,
    };
  },
};
