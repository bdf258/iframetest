// Load once

const INTERCOM_APP_ID = "ro0kgiih";

(function () {
  var w = window;
  var ic = w.Intercom;
  if (typeof ic === "function") {
    ic("reattach_activator");
    ic("update", {});
  } else {
    var d = document;
    var i = function () {
      i.c(arguments);
    };
    i.q = [];
    i.c = function (args) {
      i.q.push(args);
    };
    w.Intercom = i;
    var l = function () {
      var s = d.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.intercom.io/widget/" + INTERCOM_APP_ID;
      var x = d.getElementsByTagName("script")[0];
      x.parentNode.insertBefore(s, x);
    };
    if (d.readyState === "complete") {
      l();
    } else if (w.attachEvent) {
      w.attachEvent("onload", l);
    } else {
      w.addEventListener("load", l, false);
    }
  }
})();

// Check if Intercom should be enabled based on installation feature and user preferences
const isIntercomEnabled = () => {
  // First check if Intercom is allowed at installation level
  if (!window.allowIntercom) {
    return false; // Installation has disabled Intercom
  }

  // Installation allows it, now check user preference
  const userPrefsJson = localStorage.getItem("userPreferences");
  if (!userPrefsJson) {
    return true; // Default to enabled if no preferences
  }
  try {
    const userPrefs = JSON.parse(userPrefsJson);
    return userPrefs.enableIntercomMessenger !== false; // defaults to true
  } catch (e) {
    // If JSON is malformed, default to enabled
    // eslint-disable-next-line no-console
    console.error("Failed to parse userPreferences from localStorage:", e);
    return true;
  }
};

const intercomHelpers = {
  showForGuest: () => {
    if (isIntercomEnabled()) {
      window.Intercom("boot", { app_id: "ro0kgiih" });
    }
  },
  showForUser: (context = {}) => {
    if (isIntercomEnabled()) {
      window.Intercom("boot", { app_id: "ro0kgiih", ...context });
    }
  },
  shutdown: () => {
    if (window.Intercom && typeof window.Intercom === "function") {
      window.Intercom("shutdown");
    }
  },
  isEnabled: isIntercomEnabled,
};

export default intercomHelpers;
