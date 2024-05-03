(function(){
    'use strict';

    let globalData;
    let numDataPoints;

    async function getData(){
        const myMoods = await fetch('data/activity.json');
        const data = await myMoods.json();
        const dataPoints = Object.keys(data);
        globalData = Object.values(data);
        numDataPoints = dataPoints.length;
    }

    function moodInfo(point, data) {
        const ke$haMoods = [
            '<img src="images/chonk-1.png">',  // Mood 1
            '<img src="images/chonk-2.png">',  // Mood 2
            '<img src="images/chonk-3.png">'   // Mood 3
        ];
    
        // Adjust to match mood to array
        const moodIndex = data[point].mood - 1;
    
        document.querySelector('#activity').innerHTML = data[point].activity;
        document.querySelector('#moods').innerHTML = ke$haMoods[moodIndex];
        document.querySelector('#time').innerHTML = data[point].time;
    }    

    document.addEventListener('mousemove', reportPos);

    let prevLoc = 0;

    function reportPos(event) {
        const windowSize = window.innerWidth;
        const timeSection = windowSize / numDataPoints;
        const xPos = event.clientX;
        const changeTime = Math.floor(xPos / timeSection);
        if (changeTime !== prevLoc) {
            moodInfo(changeTime, globalData);
            prevLoc = changeTime;
        }
    }

    getData();

})(); // end IIFE