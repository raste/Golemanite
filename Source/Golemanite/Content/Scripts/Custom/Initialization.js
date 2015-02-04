// Golemanite (https://github.com/raste/Golemanite)(http://golemanite.gear.host/)
// Copyright (c) 2015 Georgi Kolev. 
// Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0).

//Application JS code INIT
//The initial setup must happen here!
$(document).ready(function () {

    setTimeout(function () {
        $('body').animate({ opacity: 1 }, 400);
    }, 100);

    Golemanite.Localization.Init();
    Golemanite.PageChange.Init();
    Golemanite.BgrRotator.Init();
    Golemanite.LoadingOverlay.Init();
    Golemanite.Email.Init();
    Golemanite.Dialog.Init();
    Golemanite.Placeholders.Init();
    Golemanite.Maps.Init();
});
