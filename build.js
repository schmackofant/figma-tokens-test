const { registerTransforms } = require("@tokens-studio/sd-transforms");
const StyleDictionary = require("style-dictionary");

const formatValue = (tokenType, value) => {
  let formattedValue;
  switch (tokenType) {
    case "color":
    default:
      formattedValue = value;
  }
  return formattedValue;
};

registerTransforms(StyleDictionary);

/**
 * Custom format that generate tailwind color config based on css variables
 */
StyleDictionary.registerFormat({
  name: "tw/css-variables",
  formatter({ dictionary }) {
    return (
      "module.exports = " +
      `{\n${dictionary.allProperties
        .map((token) => {
          const value = formatValue(token.type, token.value);
          return `  "${token.path.slice(1).join("-")}": "var(--${
            token.name
          }, ${value});"`;
        })
        .join(",\n")}\n}`
    );
  },
});

const sd = StyleDictionary.extend({
  source: ["./output.json"],
  platforms: {
    js: {
      transformGroup: "tokens-studio",
      buildPath: "build/js/",
      files: [
        {
          destination: "variables.js",
          format: "tw/css-variables",
        },
      ],
    },
    css: {
      transforms: [
        "ts/descriptionToComment",
        "ts/size/px",
        "ts/opacity",
        "ts/size/lineheight",
        "ts/type/fontWeight",
        "ts/resolveMath",
        "ts/size/css/letterspacing",
        "ts/typography/css/shorthand",
        "ts/border/css/shorthand",
        "ts/shadow/css/shorthand",
        "ts/color/css/hexrgba",
        "ts/color/modifiers",
        "name/cti/kebab",
      ],
      buildPath: "build/css/",
      files: [
        {
          destination: "variables.css",
          format: "css/variables",
        },
      ],
    },
  },
});

sd.cleanAllPlatforms();
sd.buildAllPlatforms();
