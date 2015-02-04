﻿﻿// Golemanite (https://github.com/raste/Golemanite)(http://golemanite.gear.host/)
// Copyright (c) 2015 Georgi Kolev. 
// Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0).

using System.Web.Optimization;

namespace Golemanite
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/Scripts/MainJs").Include(
                "~/Content/Scripts/Libraries/jquery-{version}.js"
                , "~/Content/Scripts/Libraries/jquery.validate.js"
                , "~/Content/Scripts/Libraries/jqueryui/jquery-ui.js"
                , "~/Content/Scripts/Libraries/jquery.placeholder.js"
                , "~/Content/Scripts/Libraries/native.history.js"
                , "~/Content/Scripts/Libraries/lightbox/lightbox.js"
                , "~/Content/Scripts/Libraries/i18n.js"
                , "~/Content/Scripts/Libraries/bingMapsAjaxV7Control.js"
                , "~/Content/Scripts/Custom/Tools.js"
                , "~/Content/Scripts/Custom/Localization.js"
                , "~/Content/Scripts/Custom/PageChange.js"
                , "~/Content/Scripts/Custom/BgrRotator.js"
                , "~/Content/Scripts/Custom/LoadingOverlay.js"
                , "~/Content/Scripts/Custom/Email.js"
                , "~/Content/Scripts/Custom/Dialog.js"
                , "~/Content/Scripts/Custom/Placeholders.js"
                , "~/Content/Scripts/Custom/Maps.js"
                , "~/Content/Scripts/Custom/Initialization.js"));

            bundles.Add(new StyleBundle("~/Content/MainCss").Include(
                 "~/Content/Styles/Imported/normalize.css"
                , "~/Content/Styles/Imported/skeleton.css"
                , "~/Content/Scripts/Libraries/lightbox/lightbox.css"
                , "~/Content/Scripts/Libraries/jqueryui/jquery-ui.css"
                , "~/Content/Scripts/Libraries/jqueryui/jquery-ui.structure.css"
                , "~/Content/Scripts/Libraries/jqueryui/jquery-ui.theme.css"
                , "~/Content/Styles/Custom/Fonts.css"
                , "~/Content/Styles/Custom/Utilities.css"
                , "~/Content/Styles/Custom/SkeletonOverrides.css"
                , "~/Content/Styles/Custom/jQueryUIOverrides.css"
                , "~/Content/Styles/Custom/lightboxOverrides.css"
                , "~/Content/Styles/Custom/Global.css"
                , "~/Content/Styles/Custom/Header.css"
                , "~/Content/Styles/Custom/Footer.css"
                , "~/Content/Styles/Custom/HomePage.css"
                , "~/Content/Styles/Custom/TheHousePage.css"
                , "~/Content/Styles/Custom/GalleryPage.css"
                , "~/Content/Styles/Custom/HuntingPage.css"
                , "~/Content/Styles/Custom/ContactsPage.css"
                ));
        }
    }
}