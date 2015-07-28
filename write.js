import fs from 'fs';

export function write(options, callback) {
  const path = `./images/${options.id}.json`;
  const contents = JSON.stringify(options.urls);
  fs.writeFile(path, contents, (err) => {
    if (err) return callback(err);
    callback();
  });
};
