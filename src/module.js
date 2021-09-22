import { join } from "path";
import consola from "consola";

export default async function blokModule({
  prefix = "",
  withConsole = false,
  debug = false
} = {}) {
  const logger = consola.withScope("@nujek/blok");

  await this.requireModule("@nujek/dynamic", { withConsole, debug });

  this.nuxt.hook("components:dirs", (dirs) => {
    dirs.push({
      path: join(__dirname, "components"),
      pattern: "**/*.vue",
      prefix,
    });
  });

  if (withConsole) {
    logger.success({
      message: "blok component ready",
      additional: `Module @nujek/blok successfully registered.\nReady to auto import and hydrate components based on storyblok blok schemas\nRead docs: https://blok.nujek.io`,
      badge: true,
    });
  }

  return true;
}

module.exports.meta = require("./../package.json");
