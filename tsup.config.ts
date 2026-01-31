import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["source"],
  format: ["esm"],
  dts: true,            // genera .d.ts
  sourcemap: false,
  clean: true,
  treeshake: true,
  minify: false,
  skipNodeModulesBundle: true,
  splitting: true,      // para mayor compatibilidad
  outDir: "dist",

});
