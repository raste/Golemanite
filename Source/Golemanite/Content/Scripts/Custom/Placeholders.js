// Golemanite (https://github.com/raste/Golemanite)(http://golemanite.gear.host/)
// Copyright (c) 2015 Georgi Kolev. 
// Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0).

var Golemanite = Golemanite || {};

Golemanite.Placeholders = (function () {

    var self = {};

    self.Init = function () {
        $('input, textarea').placeholder();
    };

    return self;
}());