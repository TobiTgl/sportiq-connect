export function getBackendUrl() {
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_BACKEND_URL_DEV;
  } else if (import.meta.env.PROD) {
    return window.location.protocol + "//" + window.location.host + "/backend";
  }
}
export function getReportServiceUrl() {
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_BACKEND_URL_DEV;
  } else if (import.meta.env.PROD) {
    return window.location.protocol + "//" + window.location.host + "/report";
  }
}
export function getAuthServiceUrl() {
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_BACKEND_URL_DEV;
  } else if (import.meta.env.PROD) {
    return window.location.protocol + "//" + window.location.host + "/auth";
  }
}
export function getAdministrationServiceUrl() {
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_BACKEND_URL_DEV;
  } else if (import.meta.env.PROD) {
    return (
      window.location.protocol + "//" + window.location.host + "/administration"
    );
  }
}

export function getRedirectUrl() {
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_REDIRECT_URI_DEV;
  } else if (import.meta.env.PROD) {
    return window.location.protocol + "//" + window.location.host + "/redirect";
  }
}

export function getStravaAuthUrl() {
  return `https://www.strava.com/oauth/authorize?client_id=${
    import.meta.env.VITE_CLIENT_ID
  }&response_type=code&redirect_uri=${getRedirectUrl()}&approval_prompt=force&scope=activity:read_all,profile:read_all`;
}
