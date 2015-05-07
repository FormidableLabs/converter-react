/**
 * Querystring utilities.
 */
export default {
  // Parse querystring into bootstrap object.
  parseBootstrap: (querystring) => {
    const bootstrap = (querystring || "")
      .replace(/^\?/, "")
      .split("&")
      .map(part => part.split("="))
      .filter(pair => pair[0] === "__bootstrap")[0];

    if (!bootstrap) {
      return null;
    }

    const [types, value] = bootstrap[1].split(":");
    return {
      types: types,
      value: decodeURIComponent(value)
    };
  }
};
