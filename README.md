# Programmatically controlling your Lightbox diet

Lightbox is a Polish company providing catered diets to your door. Their service, and their food, is pretty good. Their website... not so much. And, unfortunately, their website is the only way to control your choice of meals.

I set out to reverse-engineer and control this programmatically, and to build a very simple library to control this, using `axios` (to fetch and interact with pages) and `cheerio` (to parse the HTML/JS fragments their website requests yield).

The end result will be accompanied by a React Native application with the following feature set:

- Logging in to lightbox
- Checking your meals
- Choosing your meals for a day
- Exporting nutritional data (it's available!) to Google Fit or another nutrition tracker.

## Initializing the repo

This repository is a monorepo, and uses `lerna` to manage multiple typescript packages.

To initialize everything, install lerna (globally via `npm install -g lerna` or locally by `npm install`ing the root of this repo). From there, `npx lerna bootstrap` to bootstrap the repository, install all dependencies and get ready to hack.

`npx lerna run build` builds all libraries and packages. On the application side, this will only build an Android APK file.

`npx lerna run test` runs all tests present in all packages. Right now, this is pretty sparse, as the API is still subject to (major) changes.