import async from 'async';
import config from './config';
import Flickr from 'flickrapi';
import { write } from './write';

// Lazily authenticate flickr client
let flickr;

const q = async.queue( (park, callback) => {
    const [lat, lon] = park.center;
    console.log(`Searching ${park.name}`);
    flickr.photos.search({
      lat: lat,
      lon: lon,
      safe_search: 1, // safe mode, someone think of the children!
      license: '2',
      per_page: 10,
      text: 'park',
      sort: 'interestingness-desc'
    }, (err, res) => {
      if (err) return callback(err);

      // More photo formatting options here
      // https://www.flickr.com/services/api/misc.urls.html
      const urls = res.photos.photo.map( (photo) => {
        return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
      });

      console.log(`Found ${urls.length} photos`);

      if (!urls.length) return callback();

      write({ id: park.park_id, urls: urls }, callback);
    });
}, config.concurrency);

export function scrape(parks, callback) {
  Flickr.tokenOnly(config.flickr, (error, client) => {
    if (error) return callback(error);
    flickr = client;
    q.push(parks);
    q.drain = callback;
  });
};
