function getApi () {
// google search api
fetch("https://google-news1.p.rapidapi.com/search?q=florida%20man&country=US&lang=en", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "c2dbb5a7fdmsha6ee8767c5acd11p1dee2ejsne2cc8e8d8536",
		"x-rapidapi-host": "google-news1.p.rapidapi.com"
	}
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
}

getApi();