var request = require('request');
var cheerio = require('cheerio');

var url = 'https://www.ifly50.com/en_gb/'

for (var i=1; i<=10; i++) {
  scrape(url+i, i);
};

function scrape(url, index) {

  request.get(url, function(error, response, body) {
    if (error) {
      console.log(error);
      return process.exit(1);
    }

    if (response.statusCode !== 200) {
      console.log(response.statusCode);
      return process.exit(1);
    }

    if (response.statusCode === 200) {
      var $ = cheerio.load(body);
      var $results = $('.page-image-normal');
      var images = { id: index, desktop: '', mobile: ''};

      $results.each(function() {

        if (this.attribs.style.match(/url.*/)) {
          var imgAttr = this.attribs.style.match(/url.*/);
          imgAttr = imgAttr.toString();

          var img = imgAttr.substring(4, imgAttr.length-2);
          img.includes('1296') ? images.desktop = img : images.mobile = img;
        }

      });

      return console.log(images); //returns the images from the scrape on that url
    }
  });
}