// Golemanite (https://github.com/raste/Golemanite)(http://golemanite.gear.host/)
// Copyright (c) 2015 Georgi Kolev. 
// Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0).

var Golemanite = Golemanite || {};

Golemanite.PageChange = (function () {

    var self = {},
        state_change_event_name = 'statechange',
        loadingHTMLClass = 'loading',
        introPageBodyClass = 'intro',
        intro_pages_action_urls = ['/', '/home/start', '/bg', '/bg/home/start', '/en', '/en/home/start'],
        change_page_attr_name = 'data-push-action',
        change_page_partial_action_url_attr_name = 'data-push-partial-action',
        change_page_title_attr_name = 'data-title',
        updated_container_selector = '.pageContent',
        footer_selector = '.footer',
        main_menu_holder_class_name = 'main-menu',
        selected_link_class = 'selected',
        selectable_link_has_class = 'mainLink',
        get_selected_menus_selector = 'a.' + selected_link_class,
        inStateChange = false,
        isStateChangedViaLink = false, //Indicates if the supported links were clicked (true), or if browser navigation buttons (back/forwad) were used (false)
        isLoadingPage = false,
        skipLeftRightAnimation = false,
        minViewPortWidthForLeftRightAnimation = 550, //The same width is used to indicate that the menu will be styles for tablets. Keep same on both places.
        isOldPageRemoved = true,
        newPageHtml = "",
        animationsDuration = 500;

    self.Init = function () {
        if (SupportsHistoryApi() === false) {
            return;
        }

        History.Adapter.bind(window, state_change_event_name, OnStateChange);

        BindToStateChangeControls();
    };

    function SupportsHistoryApi() {
        return !!(window.history && history.pushState);
    };

    function BindToStateChangeControls() {
        var menus = $('[' + change_page_attr_name + ']');
        if (menus.length < 1) {
            return;
        }

        menus.click(OnMenuItemClick);
    };

    function OnMenuItemClick(event) {
        var element = $(event.currentTarget)
               , action = element.attr(change_page_attr_name)
               , partial = element.attr(change_page_partial_action_url_attr_name)
               , title = element.attr(change_page_title_attr_name) || action
               , state = History.getState();


        if (!action) {   //no action link specified stop execution
            return false;
        }

        if (!partial) {   //no partial specified -> full load of page
            return true;
        }

        if (state.url.toLowerCase().endsWith(action.toLowerCase()) === true) { //already on this page
            return false;
        }

        if (inStateChange === true) {   //double click for page change
            return false;
        }

        inStateChange = isStateChangedViaLink = true;
        skipLeftRightAnimation = ($(window).width() < minViewPortWidthForLeftRightAnimation);

        event.preventDefault();

        History.pushState({
            partialUrl: partial,
            previousUrl: state.cleanUrl
        }, title, action);

        SetMenuItemAsSelected(element);
    };

    function SetMenuItemAsSelected(item) {
        var menuHolder = $('.' + main_menu_holder_class_name),
            selectedItem = menuHolder.find(get_selected_menus_selector),
            item = $(item),
            canBeSelected = item.hasClass(selectable_link_has_class);

        if (selectedItem.length > 0) {
            selectedItem.removeClass(selected_link_class);
        }

        if (canBeSelected === false) {
            return;
        }

        item.addClass(selected_link_class);
    };

    function OnStateChange() {
        var State = History.getState()
            , action = State.url
            , partial = State.data.partialUrl
            , previousUrl = State.data.previousUrl;

        if (isStateChangedViaLink === false) { //browser navigation button clicked
            window.location = action;
            return;
        }
        isStateChangedViaLink = false;

        if (IsChangingFromInternalToIntroState(action, previousUrl) === true) {
            AnimateStateLayoutChange(partial, true);
            return;
        }

        if (IsChangingFromIntroToInternalState(action, previousUrl) === true) {
            AnimateStateLayoutChange(partial, false);
            return;
        }

        if (IsNewPageInternal(action) === false) { //changing between two possible variants of intro page
            inStateChange = false;
            return;
        }

        InternalAnimateNewPageLoad(partial);
    };

    function IsChangingFromInternalToIntroState(newUrl, previousUrl) {
        var isPrevIntro = IsIntroURL(previousUrl),
            isNewIntro = IsIntroURL(newUrl);

        return (isNewIntro === true
                && isPrevIntro === false);
    };

    function IsChangingFromIntroToInternalState(newUrl, previousUrl) {
        var isPrevIntro = IsIntroURL(previousUrl),
            isNewIntro = IsIntroURL(newUrl);

        return (isPrevIntro === true
                && isNewIntro === false);
    };

    function IsNewPageInternal(newUrl) {
        return (IsIntroURL(newUrl) === false);
    }

    function IsIntroURL(url) {
        var introUrl = "";
        url = url.trim().toLowerCase();
        url = url.trimEnd('/');

        for (i = 0; i < intro_pages_action_urls.length; i++) {
            introUrl = window.location.host + intro_pages_action_urls[i];
            introUrl = introUrl.trim().toLowerCase();
            introUrl = introUrl.trimEnd('/');

            if (url.endsWith(introUrl) === true) {
                return true;
            }
        }

        return false;
    };

    //#region Intro to Internal Layout change or the reverse
    function AnimateStateLayoutChange(partialUrl, toIntroState) {
        var body = $('body');

        isOldPageRemoved = false;

        Golemanite.BgrRotator.StopScheduledRotation();

        body.fadeOut(animationsDuration
          , function () {
              isOldPageRemoved = true;

              if (toIntroState === true) {
                  body.addClass(introPageBodyClass);
              } else {
                  body.removeClass(introPageBodyClass);
              }

              Golemanite.BgrRotator.SwitchBGRAndStartRotation();

              ShowLoadedPageForStateLayoutChange(true);
          });

        ///Html loading
        isLoadingPage = true;

        $.get(partialUrl, function (html, status, jqXHR) {
            isLoadingPage = false;
            newPageHtml = html;

            ShowLoadedPageForStateLayoutChange(false);
        });
    };

    function ShowLoadedPageForStateLayoutChange(showOverlayIfNotReady) {
        var body = $('body'),
            html = $('html'),
            containerEl = $(updated_container_selector);

        if (isLoadingPage === true
            || isOldPageRemoved === false
            || newPageHtml.length == 0) {
            ///New content is shown only after the old page is removed
            ///and the new page is loaded

            if (showOverlayIfNotReady === true) {
                html.addClass(loadingHTMLClass);
            }

            return;
        }

        html.removeClass(loadingHTMLClass);

        containerEl.html(newPageHtml);

        body.fadeIn(animationsDuration
              , function () {
                  newPageHtml = "";
                  inStateChange = false;

                  ReTriggerOnLoad();
              });
    };
    //#end region

    //#region Internal pages change
    function InternalAnimateNewPageLoad(partialUrl) {
        var containerEl = $(updated_container_selector),
            transitionToLeftProperties = GetOldPageTransitionToLeftAnimationProperties();

        ShowHideFooter(false);

        isOldPageRemoved = false;
        containerEl.animate(transitionToLeftProperties
           , animationsDuration
           , function () {
               isOldPageRemoved = true;

               TryAnimateInNewPage(true);
           });

        ///Html loading
        isLoadingPage = true;

        $.get(partialUrl, function (html, status, jqXHR) {
            isLoadingPage = false;
            newPageHtml = html;

            TryAnimateInNewPage(false);
        });
    };

    function TryAnimateInNewPage(showOverlayIfNotReady) {
        var containerEl = $(updated_container_selector),
            preparationForRitghTransition = GetPreparationForTransitionFromRightAnimationProperties(),
            rightToLeftTransition = GetRightToLeftTransitionAnimationProperties();

        if (isLoadingPage === true
            || isOldPageRemoved === false
            || newPageHtml.length == 0) {
            ///New content is shown only after the old page is removed
            ///and the new page is loaded

            if (showOverlayIfNotReady === true) {
                Golemanite.LoadingOverlay.Show();
            }

            return;
        }

        Golemanite.LoadingOverlay.Hide();

        //in order to hide horizontal scrollbars during the page animation
        ShowHideOverflow(true);

        containerEl.html(newPageHtml);

        containerEl.animate(preparationForRitghTransition, 1)
              .animate(rightToLeftTransition
              , animationsDuration
              , function () {
                  newPageHtml = "";
                  inStateChange = false;

                  ReTriggerOnLoad();
                  ShowHideFooter(true);
                  ShowHideOverflow(false);
              });
    };

    function GetOldPageTransitionToLeftAnimationProperties() {
        var obj = {
            opacity: 0
        };

        if (skipLeftRightAnimation === false) {
            obj.left = '-=600px';
        }

        return obj;
    };

    function GetPreparationForTransitionFromRightAnimationProperties() {
        var obj = {};

        if (skipLeftRightAnimation === false) {
            obj.left = '+=1800px';
        }

        return obj;
    };

    function GetRightToLeftTransitionAnimationProperties() {
        var obj = {
            opacity: 1
        };

        if (skipLeftRightAnimation === false) {
            obj.left = '-=1200px';
        }

        return obj;
    };

    //#end region

    /*JS functions, which need to be called after page change -> for example when there is specific JS functions for the pages*/
    function ReTriggerOnLoad() {
        Golemanite.Email.Init();
        Golemanite.Dialog.Init();
        Golemanite.Placeholders.Init();
        Golemanite.Maps.Init();
    };

    function ShowHideFooter(show) {
        var footerEl = $(footer_selector);

        if (footerEl.length < 1) {
            return;
        }

        if (show === true) {
            footerEl.animate({ opacity: 1 }, animationsDuration);
        } else {
            footerEl.animate({ opacity: 0 }, animationsDuration);
        }
    };

    function ShowHideOverflow(trueHide_falseShow) {
        var body = $('body');

        if (trueHide_falseShow === true) {
            body.css('overflow-x', 'hidden');
        } else {
            body.css('overflow-x', '');
        }
    };

    return self;
}());