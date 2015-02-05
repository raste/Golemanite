# Golemanite

### About

Web business card for guests house in central Bulgaria.  

Dev url [http://golemanite.gear.host/](http://golemanite.gear.host)

The site was made in 2 and a half weeks. Features: 
* Transition animation between intro page and the internal pages
* Slide out/in animation of the internal pages 
* Background images rotation
* Fully responsive
* Simulates single page application (for browsers supporting html5 history api)(page change without full refresh)
* Multilanguage support (2 languages used), pages in different languages are accessible via urls (SEO friendly)  
 
**NOTE: the interface feel and look, images, colors and font styles were copied from [this template](http://www.motocms.com/html-templates/moto-cms-html-templates-type/51932.html), my appreciations to the designers.**
(The animations, javascript logic and the responsiveness were made from scratch)

### Technologies

.NET, C#, MVC  
JS libraries/plugins: [lightbox](http://lokeshdhakar.com/projects/lightbox2/), [bingMapsAjaxV7Control](https://www.bingmapsportal.com/isdk/ajaxv7), [i18njs](https://github.com/schalkneethling/i18njs), [History.js](https://github.com/browserstate/history.js/), [jQuery](http://jquery.com/), [jQuery.placeholder](https://github.com/mathiasbynens/jquery-placeholder), [jQuery.validate](http://jqueryvalidation.org/), [jQuery UI](http://jqueryui.com/)  
CSS: [skeleton](http://www.getskeleton.com/), [normalize](http://necolas.github.io/normalize.css/)

### Poke/Edit

The source is stripped from the texts and images used in the hosted variant.  

In order to modify the code and build the application you will need Visual Studio 2013 or greater.  

In [web.config](https://github.com/raste/Golemanite/blob/master/Source/Golemanite/Web.config) locate this line:  

  ```
  <mailSettings>
      <smtp from="domain@mail.com" deliveryMethod="Network">
        <network host="smtp.gmail.com" port="587" userName="domain@mail.com" password="pass" defaultCredentials="false" />
      </smtp>
    </mailSettings>
  ```  
  Substitute `smtp.gmail.com` with the mail subdomain which will be used for email sending. Replace `domain@mail.com` in both places with the email address, FROM which the emails will be sent. Substitute `pass` in `password="pass"` with the password of the chosen email address.  
  
  *NOTE: SMTP must be enabled for the email address, in order to send emails from it.*  
  
  Locate ```<add key="Email:To:Address" value="domain@mail.com" />``` and replace `domain@mail.com` with the address TO which the emails from contact form will be sent.  
  
Build the solution. Some of the needed packages should be automatically downloaded from NUGET. If that doesn't happen, go to `TOOLS > NuGet package Manager > Package Manager Settings > check Allow NuGet to download missing packages`. If that doesn't help or some of the packages cannot be downloaded, get [packages.zip](https://github.com/raste/Golemanite/blob/master/Packages/packages.zip) and extract it in the directory of the solution (this is archive of the used packages).

### Images

![alt text](https://github.com/raste/Golemanite/blob/master/screenshots/Intro.png "Intro")

![alt text](https://github.com/raste/Golemanite/blob/master/screenshots/Location.png "Location")

![alt text](https://github.com/raste/Golemanite/blob/master/screenshots/Fishing.png "Fishing")

![alt text](https://github.com/raste/Golemanite/blob/master/screenshots/Gallery.png "Gallery")

![alt text](https://github.com/raste/Golemanite/blob/master/screenshots/Contacts.png "Contacts")

![alt text](https://github.com/raste/Golemanite/blob/master/screenshots/Responsive.png "Responsive")
