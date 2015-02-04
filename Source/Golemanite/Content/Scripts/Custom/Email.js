// Golemanite (https://github.com/raste/Golemanite)(http://golemanite.gear.host/)
// Copyright (c) 2015 Georgi Kolev. 
// Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0).

var Golemanite = Golemanite || {};

Golemanite.Email = (function () {

    var self = {},
        emailFormSelector = '.contacts form',
        clearBtnSelector = '.contacts form .clearBtn',
        submitBtnSelector = '.contacts form .submitBtn',
        inputFieldsSelector = '.contacts form input[type=text], .contacts form input[type=email], .contacts form textarea',
        resultHolderSelector = '.contacts form .emailResult',
        resultHolderSuccessClass = 'success',
        resultHolderErrorClass = 'error',
        errorLabelsSelector = '.contacts form label.error';

    self.Init = function () {
        var form = $(emailFormSelector);
        if (form.length < 1) {
            return;
        }

        SetValidationRules();
        BindForSubmit();
        BindToButtonsEvents();
    };

    function SetValidationRules() {
        var form = $(emailFormSelector);

        form.validate({
            rules: {
                ContactName: 'required',
                ContactEmail: 'required email',
                ContactMessage: 'required'
            },
            messages: {
                ContactName: {
                    required: Golemanite.Localization.Msg('ErrNameRequired')
                },
                ContactEmail: {
                    required: Golemanite.Localization.Msg('ErrEmailRequired'),
                    email: Golemanite.Localization.Msg('ErrEmailInvalid')
                },
                ContactMessage: {
                    required: Golemanite.Localization.Msg('ErrMsgRequired')
                }
            }
        });
    };

    function BindToButtonsEvents() {
        var submitBtn = $(submitBtnSelector),
            clearBtn = $(clearBtnSelector);

        submitBtn.off('click', SendEmail);
        submitBtn.click(SendEmail);

        clearBtn.off('click', ClearFields);
        clearBtn.click(ClearFields);
    };

    function BindForSubmit() {
        var form = $(emailFormSelector);

        UnBindForSubmit();
        form.submit(OnFormSubmit);
    };

    function UnBindForSubmit() {
        var form = $(emailFormSelector);

        form.off('submit', OnFormSubmit);
    };

    function SendEmail(event) {
        var element = $(event.currentTarget),
            form = $(emailFormSelector);

        HideSendResult();

        event.preventDefault();

        if (form.length < 1) {
            return;
        }

        if (form.valid() === false) {
            return;
        }

        form.submit();
    };

    function OnFormSubmit(event) {
        var form = $(event.currentTarget),
            url = form.attr('action'),
            postData = form.serialize();

        event.preventDefault();
        UnBindForSubmit();

        Golemanite.LoadingOverlay.Show();

        $.ajax(
        {
            url: url,
            type: "POST",
            data: postData,
            success: function (data, textStatus, jqXHR) {
                ClearFields();
                ShowSendResult(true, Golemanite.Localization.Msg('EmailSuccess'));
            },
            error: function (jqXHR, textStatus, errorThrown) {
                ShowSendResult(false, jqXHR.responseJSON || errorThrown);
            },
            complete: function (jqXHR, textStatus) {
                BindForSubmit();
                Golemanite.LoadingOverlay.Hide();
            }
        });
    }

    function HideSendResult() {
        var resultHolder = $(resultHolderSelector);
        if (resultHolder.length < 1) {
            return;
        }

        resultHolder.removeClass(resultHolderSuccessClass);
        resultHolder.removeClass(resultHolderErrorClass);
    };

    function ShowSendResult(isSuccess, message) {
        var resultHolder = $(resultHolderSelector);
        if (resultHolder.length < 1) {
            return;
        }

        HideSendResult();

        resultHolder.html(message);

        if (isSuccess === true) {
            resultHolder.addClass(resultHolderSuccessClass);
        } else {
            resultHolder.addClass(resultHolderErrorClass);
        }
    };

    function ClearFields(event) {
        var inputFields = $(inputFieldsSelector),
            form = $(emailFormSelector),
            errorLabels = $(errorLabelsSelector);

        if (event) {
            event.preventDefault();
        }

        if (inputFields.length > 0) {
            inputFields.val('');
        }

        if (errorLabels.length > 0) {
            errorLabels.css('display', 'none');
        }

        HideSendResult();
    };

    return self;
}());
