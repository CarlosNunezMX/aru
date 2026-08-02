import { defineConfig } from "tsup";
import { tsconfigPathsPlugin } from "esbuild-plugin-tsconfig-paths";
export default defineConfig({
  entry: ["source/index.ts", "source/modules/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: false,
  clean: true,
  treeshake: true,
  minify: false,
  skipNodeModulesBundle: true,
  splitting: true,
  outDir: "dist",
  tsconfig: "./tsconfig.json",
  esbuildPlugins: [tsconfigPathsPlugin()],
});
