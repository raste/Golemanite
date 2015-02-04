// Golemanite (https://github.com/raste/Golemanite)(http://golemanite.gear.host/)
// Copyright (c) 2015 Georgi Kolev. 
// Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0).

var Golemanite = Golemanite || {};

Golemanite.Localization = (function () {

    var self = {},
        switch_lang_attribute_name = 'data-switch-lang',
        current_language_holder_selector = 'html',
        get_languate_attribute_name = 'lang',
        currLanguage = '';

    self.Init = function () {
        LoadLanguage();
        InitI18n();
        BindForLanguageChange();
    };

    function LoadLanguage() {
        var langHolder = $(current_language_holder_selector);

        currLanguage = langHolder.attr(get_languate_attribute_name);
    };

    function InitI18n() {
        options = {
            language: currLanguage,
            supportLocale: false
        };
        i18n.init(options);
    };

    function BindForLanguageChange() {
        var links = $('[' + switch_lang_attribute_name + ']');
        if (links.length < 1) {
            return;
        }

        links.click(OnSwitchLanguageClick);
    };

    function OnSwitchLanguageClick(event) {
        var element = $(event.currentTarget)
              , langCode = element.attr(switch_lang_attribute_name);

        event.preventDefault();

        i18n.userSelected(langCode, function () {
            ReloadWithSelectedLanguage(langCode);
        });
    };

    function ReloadWithSelectedLanguage(lang) {
        var absolutePath = (window.location.pathname + window.location.search),
            currentLangUrl = ('/' + currLanguage).toLowerCase(),
            selectedLangUrl = '/' + lang,
            loadUrl = '';

        if (absolutePath.toLowerCase().startsWith(currentLangUrl) == true) {
            loadUrl = selectedLangUrl + absolutePath.slice(currentLangUrl.length);
        }
        else {
            loadUrl = selectedLangUrl + absolutePath;
        }

        window.location = window.location.protocol + '//' + window.location.host + loadUrl;

    };

    self.Msg = function (key) {
        return i18n.msgStore[key];
    };

    return self;
}());
