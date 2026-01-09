// import local dependencies
import Router from "./util/Router";
// import assignemailtocase from "./routes/assignEmailToCase";
import index from "./routes/index";
import logout from "./routes/logout";
import validate from "./routes/validate";

// Use this variable to set up the common and page specific functions. If you
// rename this variable, you will also need to rename the namespace below.
const routes = new Router({
  // All pages
  // assignemailtocase,
  logout,
  index,
  validate
});

// Load Events
window.onload = () => routes.loadEvents();
