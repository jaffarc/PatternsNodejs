const request = require('request');
//const rp = require('request-promise');

function extend(ext,obj) {
   for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        return  ext[i] = obj[i];
      }
   }
};

exports.extend = extend;

function httpGet(url, callback) {
  const options = {
    url :  url,
    json : true
  };
  request(options,
    function(err, res, body) {
      callback(err, body);
    }
  );
}
exports.httpGet = httpGet;

