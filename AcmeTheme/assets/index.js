// AcmeTheme/assets/index.js
import FormHandler from "formHandler"
import Search from "./search"
import Store from "./store"

function init() {
  FormHandler.init();
  Search.init();
  document.addEventListener("turbolinks:load", router);
  router();
  if ('serviceWorker' in navigator && window.location.pathname !== '/offline') {
    navigator.serviceWorker.register('/serviceWorker.js',
      { scope: '/' });
  }
}

function router() {
  const location = new URL(window.location.href);
  if (location.pathname.match(/\/store\/.*/)) {
    if (!Store.initialized) {
      Store.initialized = true;
      Store.init();
    }
    Store.activate();
    if (location.searchParams.get("purchase") === "success") {
      Store.handleSuccess();
    }
  }
}

init();
