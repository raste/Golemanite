﻿﻿// Golemanite (https://github.com/raste/Golemanite)(http://golemanite.gear.host/)
// Copyright (c) 2015 Georgi Kolev. 
// Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0).

using System.Globalization;
using System.Threading;
using System.Web.Mvc;

namespace Golemanite.Controllers
{
    public class BaseController : Controller
    {
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);

            InitCulture();
        }

        /// <summary>
        /// Setting current culture so the correct resources are used when building the views.
        /// </summary>
        private void InitCulture()
        {
            var language = AppLanguage.GetLanguageFromUrl();

            ViewBag.Language = language;
            ViewBag.LangCode = AppLanguage.LanguageAsStr(language);

            var culture = new CultureInfo(AppLanguage.LanguageAsStr(language));
            Thread.CurrentThread.CurrentUICulture = culture;
            Thread.CurrentThread.CurrentCulture = culture;
        }
    }
}
