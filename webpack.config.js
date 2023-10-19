const Encore = require("@symfony/webpack-encore");
const tailwindcss = require("tailwindcss");

Encore
  // Le répertoire où les fichiers compilés seront stockés
  .setOutputPath("public/build/")
  // Le chemin public utilisé par le serveur web pour accéder au répertoire de sortie
  .setPublicPath("/build")
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())

  // Entrées
  .addEntry("app", "./assets/app.js")
  //CSS loader
  .enablePostCssLoader((options) => {
    options.postcssOptions = {
      plugins: [tailwindcss("./tailwind.config.js"), require("autoprefixer")],
    };
  })
  // Prise en charge de React
  .enableReactPreset()

  // Vous pouvez ajouter d'autres fonctionnalités comme Sass, TypeScript, etc.
  // Voir la documentation de Symfony pour plus d'exemples.
  .enableStimulusBridge("./assets/controllers.json")
  // Obtient la configuration Webpack
  .configureFilenames({
    js: "[name].[contenthash].js",
    css: "[name].[contenthash].css",
  });
// Permet de créer des fichiers séparés pour les dépendances
Encore.enableSingleRuntimeChunk();

module.exports = Encore.getWebpackConfig();
