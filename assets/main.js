let goBtn = document.getElementById("go-btn");
let userInput = document.getElementById("user-date");
let eventBox = document.getElementById("event-box");
let birthBox = document.getElementById("birth-box");
let deathBox = document.getElementById("death-box");
let musicBox = document.getElementById("music-box");
let videoBox = document.getElementById("video-box");
let iframeEl = document.getElementById("iframe");

function getNews () {
// bing news search - limited to 1000 requests per month, includes links to article images if needed
    fetch("https://bing-news-search1.p.rapidapi.com/news/search?q=florida%20man&safeSearch=Strict&textFormat=Raw&freshness=Day", {
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
    })
    .catch(err => {
        console.error(err);
    });
}

function getWikiEvents (month, day, userYear) {
        fetch(`https://byabbe.se/on-this-day/${month}/${day}/events.json`)
        .then(response => {
            return response.json();
        })
        .then (data => {
            for (i = 0; i < data.events.length; i++) {
                if (data.events[i].year == userYear) {
                    eventBox.innerHTML = data.events[i].description;
                    break;
                } else {
                    eventBox.innerHTML = "No data for this day. Pick a different date."
                }
            }
        })
        .catch(err => {
            console.error(err);
        });
}

function getMusicVideo (artist, song) {
    let encodeArtist = encodeURIComponent(artist.trim());
    let encodeSong = encodeURIComponent(song.trim());

    fetch(`https://theaudiodb.p.rapidapi.com/searchtrack.php?s=${encodeArtist}&t=${encodeSong}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "c2dbb5a7fdmsha6ee8767c5acd11p1dee2ejsne2cc8e8d8536",
            "x-rapidapi-host": "theaudiodb.p.rapidapi.com"
        }
    })
    .then(response => {
        return response.json();
    })
    .then (data => {
        let youtubeLink = data.track[0].strMusicVid;
        console.log(youtubeLink);
        let embedLink = youtubeLink.replace("watch?v=", "embed/");
        console.log(embedLink);
        iframeEl.setAttribute("src", `${embedLink}`);
    })
    .catch(err => {
        console.error(err);
    });
}

function getBillboard (month, day, userYear) {
        musicBox.innerHTML = 'Loading...';
        fetch(`https://billboard2.p.rapidapi.com/hot_100?date=${userYear}-${month}-${day}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "c2dbb5a7fdmsha6ee8767c5acd11p1dee2ejsne2cc8e8d8536",
            "x-rapidapi-host": "billboard2.p.rapidapi.com"
        }
        })
        .then(response => {
            return response.json();
        })
        .then (data => {
            musicBox.innerHTML = `The top song was ${data[0].title} by ${data[0].artist_name}.`
            getMusicVideo(data[0].artist_name, data[0].title);
        })
        .catch(err => {
            console.error(err);
        });
    }

function generateResults () {
    // grabbing date value from date selector
    let input = userInput.value;
    // splitting the date into an array to access month/day/year
    let dateArrray = input.split('-');
    // creating variables for each date element
    let userYear = dateArrray[0];
    let month = dateArrray[1];
    // splitting the month into single digit month for the wiki API
    let singleDigitMonth = month.split('');
    let day = dateArrray[2];
    let singleDigitDay = day.split('');
    // accounts for double digit months
    
    getBillboard(month, day, userYear)

    if (singleDigitMonth[0] == 0) {
        month = singleDigitMonth[1];
    } 
    if (singleDigitDay[0] == 0) {
        day = singleDigitDay[1];
    }

    getWikiEvents(month, day, userYear);
    getWikiBirths(month, day, userYear);
    getWikiDeaths(month, day, userYear);
}

goBtn.addEventListener("click", generateResults);
