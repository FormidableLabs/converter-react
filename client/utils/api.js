/**
 * Fetch data from rest API.
 */
import Promise from "bluebird";
import "isomorphic-fetch";

const badRequest = 400;
const BASE_URL = "http://";
const COLON_URL = ":";

const api = {
  // Statefully set the base port and host (for server-side).
  setBase: (host, port) => {
    if (host) {
      api.BASE_URL = BASE_URL + host;
      if (port) {
        api.BASE_URL = api.BASE_URL + COLON_URL + port;
      }
    }
  },

  // Invoke fetches for each of the different data types and return array.
  fetchConversions: (types, value) =>
    Promise.all(types.split(",").map((type) =>
      fetch(`${api.BASE_URL}/api/${type}?from=${encodeURIComponent(value)}`)
        .then((res) => {
          if (res.status >= badRequest) {
            throw new Error("Bad server response");
          }
          return res.json();
        })
        .then((data) => ({
          title: type,
          content: data.to
        }))
    ))
};

export default api;
