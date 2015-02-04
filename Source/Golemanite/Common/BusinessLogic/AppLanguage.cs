﻿﻿// Golemanite (https://github.com/raste/Golemanite)(http://golemanite.gear.host/)
// Copyright (c) 2015 Georgi Kolev. 
// Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0).

using System;
using System.Web;
using System.Web.SessionState;

namespace Golemanite
{
    /// <summary>
    /// Handles setting and getting the selected language by using Cookies or Session (if cookies are disabled)
    /// </summary>
    public static class AppLanguage
    {
        public const string BULGARIAN_CODE = "bg";
        public const string ENGLISH_CODE = "en";

        private static string LANGUAGE_COOKIE_NAME = "Language";
        private static string TEST_COOKIE_SUPPORT_NAME = "Support";

        private static string SESSION_COOKIES_DISABLED_SETTING_NAME = "CookiesDisabled";
        private static string SESSION_SELECTED_LANGUAGE_SETTING_NAME = "Language";

        private static string QUERY_PARAM_AND_VALUE_COOKIE_CHECK = "cookieCheck=true";

        private static HttpRequest Request
        {
            get
            {
                return HttpContext.Current.Request;
            }
        }

        private static HttpResponse Response
        {
            get
            {
                return HttpContext.Current.Response;
            }
        }

        private static HttpSessionState Session
        {
            get
            {
                return HttpContext.Current.Session;
            }
        }

        public static Language GetLanguageFromUrl()
        {
            if (Request.Url.AbsolutePath.ToLowerInvariant().StartsWith("/" + BULGARIAN_CODE) == true)
            {
                return Language.Bulgarian;
            }

            return Language.English;
        }

        /// <summary>
        /// Returns the selected language. If none is selected it will return one of the valid languages as default.
        /// </summary>
        /// <param name="checkForCookiesSupportIfNeeded"> Checks if cookies are supported (if not already done) 
        /// by redirecting to current url with added cookie. If the cookie is returned then they are supported 
        /// and will be used to save the chosen language.
        /// NOTE: This flag should not be set to TRUE for operations doing some logic (best to use from GET AJAX requests)</param>
        /// <returns></returns>
        [Obsolete(@"Initial setup: language was saved in cookie or as fallback to session.
Not used, because the language is determined from URL.")]
        public static Language GetLanguageFromCookieOrSession(bool checkForCookiesSupportIfNeeded)
        {
            var language = GetLanguageFromCookie(checkForCookiesSupportIfNeeded);
            if (language == Language.Unknown)
            {
                language = GetLanguageFromSession();
            }

            if (language == Language.Unknown)
            {
                language = Language.English;
            }

            return language;
        }

        private static Language GetLanguageFromCookie(bool checkForCookiesSupportIfNeeded)
        {
            if (AreCookiesEnabled(checkForCookiesSupportIfNeeded) == false)
            {
                return Language.Unknown;
            }

            var cookie = Request.Cookies[LANGUAGE_COOKIE_NAME];
            if (cookie == null)
            {
                return Language.Unknown;
            }

            string strLang = cookie.Value;

            var language = StrAsLanguage(strLang);
            return language;
        }

        /// <summary>
        /// NOTE: Uses responce redirecting in order to check if cookies are enabled (if needed).
        /// Use only from GET AJAX actions (which do not perform any crucial operations).
        /// </summary>
        private static bool AreCookiesEnabled(bool checkForCookiesSupportIfNeeded)
        {
            if (Request.Browser.Cookies == false)
            {
                return false;
            }

            var cookiesDisabled = Session[SESSION_COOKIES_DISABLED_SETTING_NAME];
            if (cookiesDisabled != null)
            {   ///Cookies check has been done already -> and it indicates that they are not allowed
                return false;
            }

            if (Request.Cookies[TEST_COOKIE_SUPPORT_NAME] != null
                || Request.Cookies[LANGUAGE_COOKIE_NAME] != null)
            {   ///Test cookie found -> cookies enabled
                return true;
            }

            if (Request.QueryString[QUERY_PARAM_AND_VALUE_COOKIE_CHECK] != null)
            {   ///We are at test cookie URl and there is no cookie -> cookies disabled
                Session[SESSION_COOKIES_DISABLED_SETTING_NAME] = true;
                return false;
            }

            if (checkForCookiesSupportIfNeeded == false)
            {
                return true;
            }

            ///We don't know if cookies are enabled -> testing with adding cookie and redirecting to same url,
            ///but with query parameter for cookie, which wil be used to determine if cookie is disabled
            ///if the added cookie is not found
            HttpCookie supportCookie = new HttpCookie(TEST_COOKIE_SUPPORT_NAME, "true");
            Response.Cookies.Add(supportCookie);

            var currentUrl = Request.RawUrl;
            if (currentUrl.IndexOf("?") > 0)
            {
                currentUrl = currentUrl + "&" + QUERY_PARAM_AND_VALUE_COOKIE_CHECK;
            }
            else
            {
                currentUrl = currentUrl + "?" + QUERY_PARAM_AND_VALUE_COOKIE_CHECK;
            }

            Response.Redirect(currentUrl);

            return true;
        }

        private static Language GetLanguageFromSession()
        {
            var objLang = Session[SESSION_SELECTED_LANGUAGE_SETTING_NAME];
            if (objLang == null)
            {
                return Language.Unknown;
            }

            var language = StrAsLanguage(objLang.ToString());
            return language;
        }

        [Obsolete(@"Initial setup: language was saved in cookie or as fallback to session.
Not used, because the language is determined from URL.")]
        public static bool SetLanguage(string lang)
        {
            var language = StrAsLanguage(lang);
            if (language == Language.Unknown)
            {
                return false;
            }

            SaveLanguage(language);
            return true;
        }

        private static void SaveLanguage(Language lang)
        {
            SaveLanguageInCookie(lang);
            SaveLanguageInSession(lang);
        }

        private static void SaveLanguageInCookie(Language lang)
        {
            var langStr = LanguageAsStr(lang);

            var cookie = Request.Cookies[LANGUAGE_COOKIE_NAME];
            if (cookie == null)
            {
                cookie = new HttpCookie(LANGUAGE_COOKIE_NAME, langStr);
            }
            else
            {
                cookie.Value = langStr;
            }

            cookie.Expires = DateTime.MaxValue;
            Response.Cookies.Set(cookie);
        }

        private static void SaveLanguageInSession(Language lang)
        {
            Session[SESSION_SELECTED_LANGUAGE_SETTING_NAME] = LanguageAsStr(lang);
        }

        public static Language StrAsLanguage(string strLang)
        {
            if (strLang.IsEmpty() == true)
            {
                return Language.Unknown;
            }

            switch (strLang.ToLowerInvariant())
            {
                case BULGARIAN_CODE:
                    return Language.Bulgarian;
                case ENGLISH_CODE:
                    return Language.English;
                default:
                    return Language.Unknown;
            }
        }

        public static string LanguageAsStr(Language lang)
        {
            switch (lang)
            {
                case Language.English:
                    return ENGLISH_CODE;
                case Language.Bulgarian:
                    return BULGARIAN_CODE;
                default:
                    return string.Empty;
            }
        }
    }
}