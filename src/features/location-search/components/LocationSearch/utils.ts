import toast from "react-hot-toast";

function getGeolocationErrorMsg(e: GeolocationPositionError) {
  switch (e.code) {
    case e.PERMISSION_DENIED:
      return "User denied geolocation";
    case e.POSITION_UNAVAILABLE:
      return "Geolocation could not be determined";
    case e.TIMEOUT:
      return "Geolocation access timeout";
    default:
      return "Something went wrong";
  }
}

function showGeolocationLoadingMsg() {
  toast.loading("Accessing geolocation…", {
    id: "geolocation_loading",
  });
}

function dismissGeolocationLoadingMsg() {
  toast.dismiss("geolocation_loading");
}

function isGeolocationAccessAvailable() {
  if (!("geolocation" in navigator) || !("permissions" in navigator)) {
    return false;
  }

  return navigator.permissions
    .query({
      name: "geolocation",
    })
    .then((permissionStatus) => permissionStatus.state === "granted");
}

export {
  getGeolocationErrorMsg,
  showGeolocationLoadingMsg,
  dismissGeolocationLoadingMsg,
  isGeolocationAccessAvailable,
};
