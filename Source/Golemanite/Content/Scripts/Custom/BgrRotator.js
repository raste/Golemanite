// Golemanite (https://github.com/raste/Golemanite)(http://golemanite.gear.host/)
// Copyright (c) 2015 Georgi Kolev. 
// Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0).

var Golemanite = Golemanite || {};

Golemanite.BgrRotator = (function () {

    var self = {},
        currBgrElementSelector = '.pageBgr .shownBgr',
        newBgrElementSelector = '.pageBgr .newBgr',
        introPageBodyClass = 'intro',
        shownImageIndex = 0,
        rotationDelay = 10000,
        darkenedImagesURLs =
        [
            '/Content/Images/BGR/bgr1.jpg',
            '/Content/Images/BGR/bgr2.jpg',
            '/Content/Images/BGR/bgr3.jpg',
        ],
        darkenedImages = new Array(darkenedImagesURLs.length),
        blurredImagesURLs =
        [
            '/Content/Images/BGR/bgr1_blur.jpg',
            '/Content/Images/BGR/bgr2_blur.jpg',
            '/Content/Images/BGR/bgr3_blur.jpg',
        ],
        blurredImages = new Array(blurredImagesURLs.length),
        scheduledRotation = null;

    self.Init = function () {
        PreLoadImages();
        ScheduleRotation();
    };

    function PreLoadImages() {
        for (i = 0; i < darkenedImagesURLs.length; i++) {
            darkenedImages[i] = new Image();
            darkenedImages[i].src = darkenedImagesURLs[i];
        };

        for (i = 0; i < blurredImagesURLs.length; i++) {
            blurredImages[i] = new Image();
            blurredImages[i].src = blurredImagesURLs[i];
        };
    };

    function ScheduleRotation() {
        self.StopScheduledRotation();
        scheduledRotation = setTimeout(Rotate, rotationDelay);
    };

    function Rotate() {
        ScheduleRotation();
        UpdateBackground(true);
    };

    function UpdateBackground(withAnimation) {
        var currBgrEl = $(currBgrElementSelector),
            newBgrEl = $(newBgrElementSelector),
            newImgSrc = GetNewImageUrl();

        if (currBgrEl.length < 1 || newBgrEl.length < 1) {
            return;
        }

        if (!withAnimation || withAnimation === false) {
            currBgrEl.css('background-image', 'url(\'' + newImgSrc + '\')');
            return;
        }

        newBgrEl.css('background-image', 'url(\'' + newImgSrc + '\')');
        newBgrEl.animate({ opacity: 1 }
            , 700
            , function () {
                currBgrEl.css('background-image', 'url(\'' + newImgSrc + '\')');
                newBgrEl.css('opacity', '0');
                newBgrEl.css('background-image', '');
            });
    };

    function GetNewImageUrl() {
        var isIntroPage = IsIntroPage(),
            imgSrc = '',
            imagesArray = [];

        if (isIntroPage === true) {
            imagesArray = darkenedImages;
        } else {
            imagesArray = blurredImages;
        }

        shownImageIndex++;
        if (shownImageIndex >= imagesArray.length) {
            shownImageIndex = 0;
        }

        imgSrc = imagesArray[shownImageIndex].src;

        return imgSrc;
    };

    function IsIntroPage() {
        var body = $('body');
        return body.hasClass(introPageBodyClass);
    };

    self.StopScheduledRotation = function () {
        if (scheduledRotation == null) {
            return;
        }

        clearTimeout(scheduledRotation);
    };

    self.SwitchBGRAndStartRotation = function () {
        ScheduleRotation();
        UpdateBackground(false);
    };

    return self;
}());
