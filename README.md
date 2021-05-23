# On This Day...

## Overview
The goal of this project was to integrate data from multiple server-side APIs in order to create an interactive website. 

## User Story
```
AS a user
I WANT to select a date
SO THAT I can see interesting facts about that date
```

## Usage
The user can select a date from the date input field by either typing a date into the input or selecting one from the date picker. Upon pressing 'GO!', the user is presented with historical birth, death, and event data for that day, as well as the #1 song on the Billboard Hot 100 and that song's music video, if applicable. The user is able to watch the video in an embedded format on the deployed site.

## APIs Used
* Wikipedia, On This Day https://byabbe.se/on-this-day/#/default/get__month___day__events_json
    - Used to retrieve birth, death, and event data from any day of the year. 

* Billboard-API https://rapidapi.com/LDVIN/api/billboard-api
    - Returns artist and song information for the Billboard Hot 100 for any date.

* AudioDB https://www.theaudiodb.com/api_guide.php
    - Allows you to search by artist and song to retrieve additional information, like lyrics and music videos.


![Visit the deployed website] https://something-new-from-group-2.github.io/FloridaMan/

![A screenshot of the deployed website](assets/images/OnThisDay.png).