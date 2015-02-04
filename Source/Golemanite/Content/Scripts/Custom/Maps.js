// Golemanite (https://github.com/raste/Golemanite)(http://golemanite.gear.host/)
// Copyright (c) 2015 Georgi Kolev. 
// Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0).

var Golemanite = Golemanite || {};

Golemanite.Maps = (function () {

    var self = {},
        mapContainerID = 'mapDiv',
        map;

    //Must be called on every page transition
    self.Init = function () {
        var mapContainer = document.getElementById(mapContainerID),
            pushpin;

        if (mapContainer == null) {
            return;
        }

        map = new Microsoft.Maps.Map(mapContainer,
                                                {
                                                    credentials: "YOUR MAPS ID",
                                                    center: new Microsoft.Maps.Location(30 , 30),
                                                    mapTypeId: Microsoft.Maps.MapTypeId.enhancedBirdseye,
                                                    zoom: 18,
                                                    showMapTypeSelector: false,
                                                    enableSearchLogo: false
                                                });

        pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), null);
        pushpin.setLocation(new Microsoft.Maps.Location(30, 30)); 
        map.entities.push(pushpin);
    };

    return self;
}());