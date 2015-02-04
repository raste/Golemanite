(function (window, undefined) {
    //https://blog.mozilla.org/webdev/2011/10/06/i18njs-internationalize-your-javascript-with-a-little-help-from-json-and-the-server/
    var i18n = {
        /* The loaded JSON message store will be set on this object */
        msgStore: {},
        persistMsgStore: function (data) {
            if (window.localStorage) {
                localStorage.setItem("msgStore", JSON.stringify(data));
                this.msgStore = data;
            } else {
                this.msgStore = data;
            }
        },
        setLanguage: function (lang, callback) {
            if (typeof callback !== "function") {
                callback = function () { };
            }

            $.ajax({
                url: "/Content/Scripts/Custom/Localization/" + lang + ".json",
                dataType: "json",
                success: function (data) {
                    i18n.persistMsgStore(data);
                    callback();
                },
                error: function (error) {
                    $.getJSON("/Content/Scripts/Custom/Localization/en-US.json", function (data) {
                        i18n.persistMsgStore(data);
                        callback();
                    })
                }
            });
        },
        initMsgStore: function (options) {

            var lang = "en-US";

            if (!options.dataUrl
                && !options.language) {
                alert('neither language data url or language code is specified');
                return;
            }

            if (!options.language) {
                lang = options.supportLocale ? options.language : options.language.substring(0, 2);
                i18n.setLanguage(lang);

                return;
            }

            $.ajax({
                url: options.dataUrl,
                success: function (data) {
                    lang = options.supportLocale ? data : data.substring(0, 2);
                    i18n.setLanguage(lang);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    lang = options.supportLocale ? lang : lang.substring(0, 2);
                    i18n.setLanguage(lang);
                }
            });
        },
        userSelected: function (lang, callback) {
            this.setLanguage(lang, callback);
        },
        init: function (options) {

            var localMsgStore = "";

            if (!!window.localStorage) {

                localMsgStore = localStorage.getItem("msgStore");

                if (localMsgStore !== null) {
                    this.msgStore = JSON.parse(localMsgStore);
                } else {
                    this.initMsgStore(options);
                }
            } else {
                this.initMsgStore(options);
            }
        }
    };

    /* Expose i18n to the global object */
    window.i18n = i18n;

})(window);
