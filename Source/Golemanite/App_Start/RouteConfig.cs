using System.Web.Mvc;
using System.Web.Routing;

namespace Golemanite
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            ///NOTE: do not forget to add new pages to /Content/sitemap.xml!
            AddLangRoute(routes, "Location");
            AddLangRoute(routes, "TheHouse");
            AddLangRoute(routes, "Gallery");
            AddLangRoute(routes, "Hunting");
            AddLangRoute(routes, "Contacts");
            AddLangRoute(routes, "", "Start");

            routes.MapRoute(
                name: "DefaultWithLanguage",
                url: "{lang}/{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Start", id = UrlParameter.Optional },
                constraints: new { lang = "(bg)|(en)" }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Start", id = UrlParameter.Optional }
            );
        }

        private static void AddLangRoute(RouteCollection routes, string action)
        {
            AddLangRoute(routes, action, action);
        }

        private static void AddLangRoute(RouteCollection routes, string actionUrlName, string action)
        {
            routes.MapRoute(
                name: actionUrlName,
                url: "{lang}/" + actionUrlName,
                defaults: new { controller = "Home", action = action },
                constraints: new { lang = "(bg)|(en)" }
            );
        }
    }
}