﻿﻿// Golemanite (https://github.com/raste/Golemanite)(http://golemanite.gear.host/)
// Copyright (c) 2015 Georgi Kolev. 
// Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0).

using System.Net;
using System.Web.Mvc;

using Golemanite.Models;
using Golemanite.Content.Resources;

namespace Golemanite.Controllers
{
    public class HomeController : BaseController
    {
        //NOTE: do not forget to add new pages to /Content/sitemap.xml!

        public ActionResult Start()
        {
            return View();
        }

        public ActionResult StartPartial()
        {
            return PartialView("Start");
        }

        public ActionResult Location()
        {
            return View();
        }

        public PartialViewResult LocationPartial()
        {
            return PartialView("Location");
        }

        public ActionResult TheHouse()
        {
            return View();
        }

        public ActionResult TheHousePartial()
        {
            return PartialView("TheHouse");
        }

        public ActionResult Gallery()
        {
            return View();
        }

        public ActionResult GalleryPartial()
        {
            return PartialView("Gallery");
        }

        public ActionResult Hunting()
        {
            return View();
        }

        public ActionResult HuntingPartial()
        {
            return PartialView("Hunting");
        }

        public ActionResult Contacts()
        {
            return View();
        }

        public ActionResult ContactsPartial()
        {
            return PartialView("Contacts");
        }

        [HttpPost]
        public ActionResult SendMail(EmailRequest request)
        {
            if (ModelState.IsValid == false)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(Resources.ErrEmailInvalidRequestData);
            }

            var result = Mail.Send(request);
            if (result.IsEmpty() == true)
            {
                return Json("success");
            }

            ///returning HttpStatusCodeResult with description containing cyrillic characters 
            ///results in incorrect rendering (of those characters) in Firefox and Chrome
            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(result);
        }

    }


}
