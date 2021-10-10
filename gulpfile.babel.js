const { series, parallel, src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
sass.compiler = require("node-sass");
const babel = require("gulp-babel");
const cssnano = require("gulp-cssnano");
const beautify = require("gulp-beautify");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const sourcemaps = require("gulp-sourcemaps");
const clean = require("gulp-clean");
const kit = require("gulp-kit");
// const htmlmin = require("gulp-htmlmin");
// const ghPages = require("gulp-gh-pages");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;

const paths = {
  html: "./html/**/*.kit",
  sass: "./src/sass/**/*.scss",
  cssDist: "./dist/css",
  js: "./src/js/**/*.js",
  jsDist: "./dist/js",
  images: "./src/images/*",
  imagesDist: "./dist/images",
  dist: "./dist",
};

function javaScript(cb) {
  src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ["@babel/env"] }))
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(sourcemaps.write())
    .pipe(dest(paths.jsDist));
  cb();
}

function sassCompiler(cb) {
  src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(sourcemaps.write())
    .pipe(dest(paths.cssDist));
  cb();
}

function minify(cb) {
  src(paths.images).pipe(imagemin()).pipe(dest(paths.imagesDist));
  cb();
}

function handleKits(cb) {
  src(paths.html)
    .pipe(kit())
    // .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("./"));
  cb();
}

function cleanStuff(cb) {
  src(paths.dist, { read: false }).pipe(clean());
  cb();
}

function startBrowserSync(cb) {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  cb();
}

function watchForChanges(cb) {
  watch("./*.html").on("change", reload);
  watch(
    [paths.html, paths.sass, paths.js],
    parallel(handleKits, sassCompiler, javaScript)
  ).on("change", reload);
  watch(paths.images, minify).on("change", reload);
  cb();
}

// function deploy(cb) {
//   src("./*.html", "./dist", "./.htaccess").pipe(
//     ghPages({
//       push: false,
//     })
//   );
//   cb();
// }

const mainFunctions = parallel(handleKits, sassCompiler, javaScript, minify);
exports.cleanStuff = cleanStuff;
exports.default = series(mainFunctions, startBrowserSync, watchForChanges);
// exports.deploy = deploy;
