// creating variables for DOM elements
let goBtn = document.getElementById("go-btn");
let userInput = document.getElementById("user-date");
let eventBox = document.getElementById("event-box");
let birthBox = document.getElementById("birth-box");
let deathBox = document.getElementById("death-box");
let musicBox = document.getElementById("music-box");
let iframeEl = document.getElementById("iframe");
let videoBox = document.getElementById("video-box");

// fetches death data from the wiki API based on the month/day/year user input. API returns a list of deaths in an array by year, so this loops through the years and looks for the first instance that matches the user's input year. the "description" (name) of that matching instance is printedif no match is found, an error message is displayed in the box. 
function getWikiDeaths (month, day, userYear) {
        fetch(`https://byabbe.se/on-this-day/${month}/${day}/deaths.json`)
        .then(response => {
            return response.json();
        })
        .then (data => {
            for (i = 0; i < data.deaths.length; i++) {
                if (data.deaths[i].year == userYear) {
                    deathBox.innerHTML = data.deaths[i].description + " died on this day.";
                    break;
                } else {
                    deathBox.innerHTML = "Sorry, there's no death data for this day. Try a different date."
                }
            }
        })
        .catch(err => {
            console.error(err);
        });
}

// works the same as the death data above
function getWikiBirths (month, day, userYear) {
    fetch(`https://byabbe.se/on-this-day/${month}/${day}/births.json`)
    .then(response => {
        return response.json();
    })
    .then (data => {
        for (i = 0; i < data.births.length; i++) {
            if (data.births[i].year == userYear) {
                birthBox.innerHTML = data.births[i].description + " was born on this day.";
                break;
            } else {
                birthBox.innerHTML = "Sorry, there's no birth data for this day. Try a different date."
            }
        }
    })
    .catch(err => {
        console.error(err);
    });
}

// works the same as the previous wiki API calls above
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
                    eventBox.innerHTML = "Sorry, there's no event data for this day. Try a different date."
                }
            }
        })
        .catch(err => {
            console.error(err);
        });
}

// takes artist and song info generated by the Billboard API and returns data containing a youtube link. 
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
        // checks to make sure the track value is not null - some wording from Billboard is not compatible with AudioDB and will return a null track
        if (data.track !== null) {
            let youtubeLink = data.track[0].strMusicVid;
            // not all AudioDB tracks include music videos - this ensures the youtube link variable is not null before continuing
            if (youtubeLink !== null) {
                // converts the link returned by the API into an embed-friendly format
                let embedLink = youtubeLink.replace("watch?v=", "embed/");
                // adds attributes to the iframe including the video source, width, and height
                iframeEl.setAttribute("src", `${embedLink}`);
                iframeEl.setAttribute("width", "420");
                iframeEl.setAttribute("height", "315");
            } else {
                videoBox.innerHTML = "Sorry, we can't find a music video for this song. Try a different date."
            }
        } else {
            videoBox.innerHTML = "Sorry, we can't find a music video for this song. Try a different date."
        }

    })
    .catch(err => {
        console.error(err);
    });
}

// returns Billboard Top 100 for the user input year/month/day and prints that information to the music box. artist name and track info is then passed into the getMusicVideo function to generate the music video if applicable
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
            let title = data[0].title;
            let artistName = data[0].artist_name;

            musicBox.innerHTML = `The #1 song was ${title} by ${artistName}.`

            // this accounts for artist names returned from Billboard that contain the term "featuring" - AudioDB can't find artists that way
            // breaks the artist name into an array and searches the array for the term "Featuring". if true, the index of the word "featuring" is located, the array is sliced to exclude "featuring", then rejoined and passed as the value for getMusicVideo, allowing AudioDB to complete its search
            let artistArray = artistName.split(' ');
            if (artistArray.includes("Featuring") === true) {
                let indexOfFeaturing = artistArray.indexOf("Featuring");
                let newArtistName = artistArray.slice(0, indexOfFeaturing);
                let joinedArtistName = newArtistName.join(' ');
                artistName = joinedArtistName;
            } 

            getMusicVideo(artistName, title);
        })
}

// interprets user's date input and calls all API functions
function generateResults () {
    // grabbing date value from date selector
    let input = userInput.value;
    // splitting the date into an array to access month-day-year
    let dateArrray = input.split('-');
    // creating variables for each date element
    let userYear = dateArrray[0];
    let month = dateArrray[1];
    // splitting the month into single digit month for the wiki API (does not work if the month is double digit for single digit months, ie 02, 01, etc.)
    let singleDigitMonth = month.split('');
    let day = dateArrray[2];
    let singleDigitDay = day.split('');
    // accounts for double digit months
    
    // calls billboard API with the default user inputs (double digit month and day format)
    getBillboard(month, day, userYear)

    // sets the value of month and day to the single digit month if the first value of the month begins with 0 - this keeps months 10,11,12 from getting chopped to 1 digit
    if (singleDigitMonth[0] == 0) {
        month = singleDigitMonth[1];
    } 
    if (singleDigitDay[0] == 0) {
        day = singleDigitDay[1];
    }

    // calls the wiki API with single digit month and day
    getWikiEvents(month, day, userYear);
    getWikiBirths(month, day, userYear);
    getWikiDeaths(month, day, userYear);
}

goBtn.addEventListener("click", generateResults);