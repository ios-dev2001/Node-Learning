const whiteListSites = ["https://www.google.com", "http://localhost:3500"];

const crosOption = {
  origin: (origin, callback) => {
    if (whiteListSites.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Unable to access the site"));
    }
  },
  operationSuccessStatus: 200,
};

module.exports = crosOption;
