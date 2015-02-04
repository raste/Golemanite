﻿﻿// Golemanite (https://github.com/raste/Golemanite)(http://golemanite.gear.host/)
// Copyright (c) 2015 Georgi Kolev. 
// Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0).

using System;
using System.Text;
using System.Net.Mail;

using System.Web.Configuration;

using Golemanite.Models;
using Golemanite.Content.Resources;

namespace Golemanite
{
    public static class Mail
    {
        private static string ToAddress;
        
        static Mail()
        {
            ToAddress = WebConfigurationManager.AppSettings["Email:To:Address"];
            if(ToAddress.IsEmpty() == true)
            {
                throw new ArgumentException("Email:To:Address web.config setting value not set");
            }
        }

        public static string Send(EmailRequest request)
        {
            var message = new MailMessage();

            message.To.Add(ToAddress);
            message.IsBodyHtml = true;
            message.Body = GetBody(request);
            message.Subject = "Ново Съобщение от формата за контакт";

            var smtpServer = new SmtpClient();
            smtpServer.EnableSsl = true;

            try
            {
                smtpServer.Send(message);
            }
            catch (Exception ex)
            {
                return string.Format(Resources.ErrEmailSendFormat, ex.Message);
            }

            return string.Empty;
        }

        private static string GetBody(EmailRequest request)
        {
            var name = request.ContactName.Trim();
            var email = request.ContactEmail.Trim();
            var message = request.ContactMessage.Trim().Replace(Environment.NewLine, "<br/>");

            var messageBody = new StringBuilder();

            messageBody.Append(string.Format("От : {0}, {1}{2}", name, email, "<br/>"));
            messageBody.Append(string.Format("{0}{1}"
                , "<hr/>"
                , message
                ));

            messageBody.Append(string.Format("{0}Това съобщение е изпратено чрез формата за връзка в страницата за контакти."
                , "<hr/>"
                ));

            return messageBody.ToString();
        }
    }
}