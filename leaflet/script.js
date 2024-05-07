(function(){
    'use strict';

    // add your script here
    var map = L.map('map').setView([14.599512, 120.984222], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var marker = L.marker([14.5, 121]).addTo(map);

    var circle = L.circle([14.5995128, 120.984222], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 800
    }).addTo(map);

    var polygon = L.polygon([
        [14.7, 120],
        [14.6, 121],
        [14.7, 121]
    ]).addTo(map);

    marker.bindPopup("heyyy").openPopup();
    circle.bindPopup("hiya");
    polygon.bindPopup("hello");
    
}());