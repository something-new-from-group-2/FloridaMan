function getApi () {

// bing news search - limited to 1000 requests per month, includes links to article images if needed
    fetch("https://bing-news-search1.p.rapidapi.com/news/search?q=florida%20man&safeSearch=Off&textFormat=Raw&originalImg=true", {
        "method": "GET",
        "headers": {
            "x-bingapis-sdk": "true",
            "x-rapidapi-key": "c2dbb5a7fdmsha6ee8767c5acd11p1dee2ejsne2cc8e8d8536",
            "x-rapidapi-host": "bing-news-search1.p.rapidapi.com"
        }
    })
    .then(response => {
        return response.json();
    })
    .then (data => {
        console.log(data);
        // finding the article name
        console.log(data.value[0].name);
        // finding the article image url
        console.log(data.value[0].image.contentUrl);
    })
    .catch(err => {
        console.error(err);
    });
}
getApi();

