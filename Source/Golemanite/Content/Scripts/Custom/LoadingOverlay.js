// Golemanite (https://github.com/raste/Golemanite)(http://golemanite.gear.host/)
// Copyright (c) 2015 Georgi Kolev. 
// Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0).

var Golemanite = Golemanite || {};

Golemanite.LoadingOverlay = (function () {

    var self = {},
        loadingGifUrl = '/Content/Images/preloader.gif',
        loadingElementID = 'loadingOverlay',
        inRemoval = false,
        image;

    self.Init = function () {
        PreLoadGif();
    };

    function PreLoadGif() {
        image = new Image();
        image.src = loadingGifUrl;
    };

    self.Show = function () {
        var overlay = $('#' + loadingElementID),
            body = $('body');

        if (overlay.length > 0) { //overlay already shown
            return;
        }

        overlay = $('<div />',
            {
                id: loadingElementID
            });
        overlay.css('position', 'fixed');
        overlay.css('left', '0');
        overlay.css('right', '0');
        overlay.css('top', '0');
        overlay.css('bottom', '0');
        overlay.css('z-index', '10000');
        overlay.css('opacity', '0');
        overlay.css('background-image', 'url(\'' + image.src + '\')');
        overlay.css('background-repeat', 'no-repeat');
        overlay.css('background-position', '50% 50%');

        overlay.appendTo(body);
        overlay.animate({ opacity: 1 }, 200);
    };

    self.Hide = function () {
        var overlay = $('#' + loadingElementID);

        if (overlay.length < 1) { //overlay already hidden
            return;
        }

        if (inRemoval === true) {
            return;
        }
        inRemoval = true;

        overlay.animate({ opacity: 0 }
            , 200
            , function () {
                overlay.remove();
                inRemoval = false;
            });
    };

    return self;
}());
