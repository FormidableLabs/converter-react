/**
 * Enums / values for "types".
 */
// All the individual types.
let types = {
  TYPES: {
    camel: "camel case",
    snake: "snake case",
    dash: "dasherized"
  },

  getTitle: function (key) {
    return types.TYPES[key] ||
      (key === types.ALL ? types.ALL_DESC : undefined);
  }
};

// Special case "all types".
types.ALL = Object.keys(types.TYPES);
types.ALL_DESC = "all the things";

export default types;
