// Golemanite (https://github.com/raste/Golemanite)(http://golemanite.gear.host/)
// Copyright (c) 2015 Georgi Kolev. 
// Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0).

(function (window, undefined) {

    if (typeof String.prototype.startsWith != 'function') {
        String.prototype.startsWith = function (str) {
            var sliced = this.slice(0, str.length);
            return sliced == str;
        };
    }

    if (typeof String.prototype.endsWith != 'function') {
        String.prototype.endsWith = function (str) {
            var sliced = this.slice(this.length - str.length);
            return sliced == str;
        };
    }

    if (typeof String.prototype.trimEnd != 'function') {
        String.prototype.trimEnd = function (str) {
            var self = this;
            while (self.endsWith(str) === true) {
                self = self.slice(0, this.length - str.length);
            };
            return self;
        };
    }

})(window);