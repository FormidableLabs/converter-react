/**
 * Enums / values for "types".
 */
// All the individual types.
const types = {
  DEFAULT_TYPE: "camel",

  TYPES: {
    camel: "camel case",
    snake: "snake case",
    dash: "dasherized"
  },

  /**
   * Get title from array of type keys.
   *
   * @param   {String} type conversion type (e.g., "camel")
   * @returns {String}      UI-friendly title
   */
  getTitle: (type) => types.TYPES[type] ||
    (type === types.ALL ? types.ALL_DESC : undefined)
};

// Special case "all types".
types.ALL = Object.keys(types.TYPES).join(",");
types.ALL_DESC = "all the things";

export default types;
