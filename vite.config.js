import { defineConfig } from "vite";
import { resolve } from "path";
import sassGlobImports from "vite-plugin-sass-glob-import";

import handlebars from "vite-plugin-handlebars";
import pageData from "./pageData.js";

const src = resolve(__dirname, "./src");
const dist = resolve(__dirname, "./dist");

// grob
import { globSync } from "glob";
import path from "node:path";
import { fileURLToPath } from "node:url";
const jsFiles = Object.fromEntries(
  globSync("src/assets/js/**/*.js", {
    ignore: ["node_modules/**", "**/dist/**"],
  }).map((file) => [
    path.relative(
      "src",
      file.slice(0, file.length - path.extname(file).length)
    ),
    fileURLToPath(new URL(file, import.meta.url)),
  ])
);

const htmlFiles = Object.fromEntries(
  globSync("src/**/*.html", {
    ignore: ["node_modules/**", "**/dist/**", "src/assets/components/**"],
  }).map((file) => [
    path.relative(
      "src",
      file.slice(0, file.length - path.extname(file).length)
    ),
    fileURLToPath(new URL(file, import.meta.url)),
  ])
);

const inputObject = { ...jsFiles, ...htmlFiles };

export default defineConfig({
  root: src,
  base: "./",
  plugins: [
    sassGlobImports(),
    handlebars({
      partialDirectory: resolve(__dirname, "./src/assets/components"),
      context: (pagePath) => {
        return {
          data: pageData[pagePath],
        };
      },
      // helpers: {
      //   br: (contents) => {
      //     let str = contents;
      //     str = str.replace(/\r?\n/g, "<br>");
      //     return str;
      //   },
      // },
    }),
  ],
  build: {
    // minify: false,
    outDir: dist,
    rollupOptions: {
      input: inputObject,
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
            return "assets/images/[name]_[hash].[ext]";
          }
          if (/\.css$/.test(name ?? "")) {
            return "assets/css/[name]_[hash].[ext]";
          }
          return "assets/[name].[ext]";
        },
      },
    },
  },
  server: {
    open: "/",
  },
});
