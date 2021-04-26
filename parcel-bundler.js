const Bundler = require('parcel-bundler');
const path = require("path")

function getFullPath(relativePathArray) {
  const absolutePathArray = []
  relativePathArray.forEach(relativePath => {
    const absolutePath = path.resolve(relativePath)
    absolutePathArray.push(absolutePath)
  })
  return absolutePathArray
}

const imagesFiles = getFullPath([
  "./resources/assets/images/*.jpeg",
  "./resources/assets/images/*.jpg",
  "./resources/assets/images/*.png",
  "./resources/assets/images/*.gif"
])

const sassFiles = getFullPath([
  "./resources/assets/sass/*.scss",
  "./resources/assets/sass/*.css"
])

const scriptsFiles = getFullPath([
  "./resources/assets/scripts/*.jsx",
  "./resources/assets/scripts/*.js"
])

const options = {
  outDir: './public',
  minify: true,
  cache: false,
  watch: (process.argv.indexOf("--watch") !== -1 ? true : false),
  autoInstall: false,
  hmr: false,
  sourceMaps: false
};

(async function () {
  const images = new Bundler(imagesFiles, options);
  await images.bundle();

  const sass = new Bundler(sassFiles, options);
  await sass.bundle()

  const scripts = new Bundler(scriptsFiles, options)
  await scripts.bundle()
})();