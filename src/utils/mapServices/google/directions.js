import React from 'react';

const googleMapsAPI = require('google-maps-api')('AIzaSyA-97-nJq7i1hy46cjHJSeOwkKgBdv08aI',
      ['directions']);

const directions = (from, to, havePathCallBack, noHavePathCallBack) => {
  googleMapsAPI().then(maps => {
    const directionsService = new maps.DirectionsService();
    directionsService.route(
      {
        origin: { lat: from[0], lng: from[1] },
        destination: { lat: to[0], lng: to[1] },
        waypoints: [],
        provideRouteAlternatives: false,
        travelMode: 'DRIVING',
        drivingOptions: {
          departureTime: new Date(/* now, or future date */),
          trafficModel: 'pessimistic',
        },
        unitSystem: maps.UnitSystem.METRIC
      },
        (dirResult, dirStatus) => {
          if (dirStatus !== 'OK') {
            noHavePathCallBack();
            return;
          }
          // convert google points to mapbox (is it needed?)
          const latLngArray = [];
          dirResult.routes[0].overview_path.forEach(aPoint => {latLngArray.push({ lat: aPoint.lat(), lng: aPoint.lng() });});

          havePathCallBack(latLngArray,
            dirResult.routes[0].legs[0].duration.value * 1000,  // this is seconds, we need MS
            dirResult.routes[0].legs[0].distance.value);
        }
      );
  });
};

export default directions;
