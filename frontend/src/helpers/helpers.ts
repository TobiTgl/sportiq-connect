export function getBackendUrl() {
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_BACKEND_URL_DEV;
  }else if (import.meta.env.PROD) {
    return window.location.protocol + "//" + window.location.host + "/backend";
  }
}

export function getRedirectUrl() {
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_REDIRECT_URI_DEV;
  } else if (import.meta.env.PROD) {
    return window.location.protocol + "//" + window.location.host + "/profile";
  }
}
