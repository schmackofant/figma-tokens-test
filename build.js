const { registerTransforms } = require("@tokens-studio/sd-transforms")
const StyleDictionary = require("style-dictionary")
const glob = require("glob")
const fs = require("fs")

const formatValue = (tokenType, value) => {
  let formattedValue
  switch (tokenType) {
    case "color":
    default:
      formattedValue = value
  }
  return formattedValue
}

const cssFiles = glob.sync("styles/variables.css")

function transformHSLValues(precision) {
  cssFiles.forEach((file) => {
    const css = fs.readFileSync(file, "utf8")

    const transformedCss = css.replace(
      /hsl\(([\d.]+)[,\s]+([\d.]+)%[,\s]+([\d.]+)%\)/g,
      (match, hue, saturation, lightness) => {
        hue = `${roundNumber(hue, precision)}deg`
        saturation = `${roundNumber(saturation, precision)}%`
        lightness = `${roundNumber(lightness, precision)}%`
        return `${hue} ${saturation} ${lightness}`
      }
    )

    fs.writeFileSync(file, transformedCss)
  })

  function roundNumber(number, precision) {
    const rounded = parseFloat(number).toFixed(precision)
    const str = rounded.toString()
    const match = str.match(/^(\d+)\.(\d+)$/)
    if (match && match[2] === "0".repeat(match[2].length)) {
      return match[1]
    }
    return rounded
  }
}

registerTransforms(StyleDictionary)

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
          const value = formatValue(token.type, token.value)
          return `  "${token.path.slice(1).join("-")}": "var(--${
            token.name
          }, ${value});"`
        })
        .join(",\n")}\n}`
    )
  },
})

const sd = StyleDictionary.extend({
  source: ["./tokens-output.json"],
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
      buildPath: "styles/",
      files: [
        {
          destination: "variables.css",
          format: "css/variables",
        },
      ],
    },
  },
})

sd.cleanAllPlatforms()
sd.buildAllPlatforms()

// Example usage:
transformHSLValues(1)
