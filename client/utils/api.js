/**
 * Fetch data from rest API.
 */
import Promise from "bluebird";
import fetch from "isomorphic-fetch";

let api = {
  BASE_URL: "",

  // Statefully set the base port and host (for server-side).
  setBase: (host, port) => {
    if (host) {
      api.BASE_URL = "http://" + host;
      if (port) {
        api.BASE_URL = api.BASE_URL + ":" + port;
      }
    }
  },

  // Invoke fetches for each of the different data types and return array.
  fetchConversions: (types, value) => Promise
    .all(types.split(",").map(type => {
      return fetch(
          `${api.BASE_URL}/api/${type}?from=${encodeURIComponent(value)}`)
        .then(res => {
          if (res.status >= 400) {
            throw new Error("Bad server response");
          }
          return res.json();
        })
        .then(data => ({
          title: type,
          content: data.to
        }));
    }))
};

export default api;
