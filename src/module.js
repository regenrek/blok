import { resolve } from "path";
import consola from "consola";

export default async function blokModule({
  prefix = "",
  withConsole = false,
  debug = false
} = {}) {
  const { nuxt, requireModule } = this
  const logger = consola.withScope("@nujek/blok");
  const runtimeDir = resolve(__dirname, 'runtime')
  nuxt.options.build.transpile.push(runtimeDir, '@nujek/blok')

  await requireModule(["@nujek/dynamic", { withConsole, debug }]);

  nuxt.hook("components:dirs", (dirs) => {
    dirs.push({
      path: resolve(runtimeDir, "components"),
      prefix: '',
      pathPrefix: false
    });
  });

  if (withConsole) {
    logger.success({
      message: "blok component ready",
      additional: `Module @nujek/blok successfully registered.\nReady to auto import and hydrate components based on storyblok blok schemas\nRead docs: https://nujek-docs.vercel.io`,
      badge: true,
    });
  }
}

module.exports.meta = require("./../package.json");
