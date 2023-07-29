const { fetchData } = require('../models/data');

function fetchDataPromise() {
  return new Promise((resolve, reject) => {
    fetchData((err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

module.exports = {
  fetchDataPromise,
};
