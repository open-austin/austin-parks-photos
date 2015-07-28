import config from './config';
import request from 'request';
import { scrape } from './scrape';

const opts = {
  url: config.parks_href,
  json: true,
  headers: {
    'User-Agent': config.userAgent
  }
}
request(opts, (err, res, body) => {
  if (err) throw new Error(err);
  const buffer = new Buffer(body.content, 'base64');
  try {
    const parks = JSON.parse(buffer.toString());
    scrape(parks, () => {
      console.log('all done');
    });
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
});
