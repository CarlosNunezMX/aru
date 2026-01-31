import { defineConfig } from "tsup";

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
});
