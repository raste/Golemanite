// Golemanite (https://github.com/raste/Golemanite)(http://golemanite.gear.host/)
// Copyright (c) 2015 Georgi Kolev. 
// Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0).

var Golemanite = Golemanite || {};

Golemanite.Dialog = (function () {

    var self = {},
        dialogLinkAttribute = 'data-dialog',
        dialogTitleAttribute = 'data-dialog-title',
        dialogBodyAttribute = 'data-dialog-body',
        dialogContainerClass = 'dialog',
        dialogOverlaySelector = '.ui-widget-overlay',
        dialogMaxWidth = 650;

    self.Init = function () {
        var dialogLinks = $('[' + dialogLinkAttribute + ']');
        if (dialogLinks.length < 1) {
            return;
        }

        BindToDialogLinksClick(dialogLinks);
    };

    function BindToDialogLinksClick(links) {
        links.off('click', OnLinkClick);
        links.click(OnLinkClick);
    };

    function OnLinkClick(event) {
        var link = $(event.currentTarget),
            dialogTitle = link.attr(dialogTitleAttribute),
            dialogBodyHolder = $('[' + dialogBodyAttribute + '=\"' + dialogTitle + '\"]');

        event.preventDefault();

        if (dialogBodyHolder.length < 1) {
            return;
        }

        CreateDialogContainerIfNeeded();

        ShowDialog(dialogTitle, dialogBodyHolder.html());
    };

    function CreateDialogContainerIfNeeded() {
        var dialogContainer = $('.' + dialogContainerClass),
            body = $('body');

        if (dialogContainer.length > 0) {
            return;
        }

        dialogContainer = $('<div />', {
            class: dialogContainerClass
        });
        dialogContainer.appendTo(body);
    };

    function ShowDialog(title, body) {
        var dialogContainer = $('.' + dialogContainerClass),
            bodyHtml = $('<textarea/>').html(body).text();

        dialogContainer.html(bodyHtml);

        dialogContainer.dialog({
            modal: true,
            title: title,
            closeOnEscape: true,
            autoOpen: true,
            position: { my: "center", at: "center", of: window },
            width: GetDialogWidth()
        });

        var overlaySelector = $(dialogOverlaySelector);
        overlaySelector.off('click', OnOverlayClick);
        overlaySelector.click(OnOverlayClick);
    };

    function GetDialogWidth() {
        var windowWidth = $(window).width(),
            mobileWidthBelow = 600;

        if (windowWidth < mobileWidthBelow) {
            return (windowWidth / 100) * 90;
        }

        var dialogWidth = (windowWidth / 100) * 60;
        if (dialogWidth <= dialogMaxWidth) {
            return dialogWidth;
        }

        return dialogMaxWidth;
    };

    function OnOverlayClick() {
        var dialogContainer = $('.' + dialogContainerClass);
        dialogContainer.dialog('close');
    };

    return self;
}());
