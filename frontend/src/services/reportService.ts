import axios from "axios";
import { getBackendUrl } from "@/helpers/helpers";
import { getAuth } from "firebase/auth";

// Alternative implementation using .then() and .catch()
export async function getAllReports() {
  const auth = getAuth();
  return await auth.currentUser?.getIdToken().then((token) => {
    return axios
      .get(getBackendUrl() + "/report/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        switch (error.code) {
          case "ERR_NETWORK":
            throw new Error("Backend not available. Please contact support.");

          default:
            throw error;
        }
      });
  });
}

export async function getSingleReport(id: String) {
  const auth = getAuth();
  return await auth.currentUser?.getIdToken().then((token) => {
    return axios
      .get(getBackendUrl() + `/report/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        switch (error.code) {
          case "ERR_NETWORK":
            throw new Error("Backend not available. Please contact support.");
          case "ERR_NOT_FOUND":
            throw new Error("Report not found.");

          default:
            throw error;
        }
      });
  });
}
