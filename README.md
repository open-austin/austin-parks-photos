Austin Parks Photo Scraper
---

This project just provides photo urls for [Austin Green Map](https://github.com/open-austin/austingreenmap).
The photos are sourced from Flickr with a
[Creative Commons](https://www.flickr.com/creativecommons/) license.

The data can be found in the `/images` directory which contains json data of
park photos.

#### Setup

```
npm install -g babel
npm install
cp config.js.sample config.js
```

Next, edit `config.js` with your information like api keys and other settings.

#### Run scraper

```
npm start
```

#### Clean

```
npm run clean
```

#### Data access

Make XHR requests to the github page.

Note: the gh-pages branch should only contain the images folder.
