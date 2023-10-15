var user_account_info = null;
var user_settings = null;
var linkedin_helper_settings_button = "#linkedin_helper_settings_button";
var linkedin_helper_main_container = "#linkedin_helper_main_container";
var linkedin_helper_form_container = "#linkedin_helper_form_container";
var linkedin_helper_change_account_info_button = "#linkedin_helper_change_account_info_button";
var linkedin_helper_form_email_field = "#linkedin_helper_form_email_field";
var linkedin_helper_form_secret_key_field = "#linkedin_helper_form_secret_key_field";
$(document).ready(function () {
    ExecuteDocumentLoadLogic();
});
// sk-9hdH0x9cu75mPPAiDHfcT3BlbkFJgffjvamfhrRqWSzhDxFh0099jiijkkhNbh
function UserAccountInfoPresenceStatus(settings) {
    if (settings != null && settings != undefined && settings != "null" && settings != "undefined") return true
    else return false
}
function UserSettingsPresenceStatus(settings) {
    if (settings != null && settings != undefined && settings != "null" && settings != "undefined") return true
    else return false
}
function ShowMainContainer() {
    $(linkedin_helper_form_container).addClass("d-none");
    $(linkedin_helper_main_container).removeClass("d-none");
}
function ShowFormContainer() {
    $(linkedin_helper_main_container).addClass("d-none");
    $(linkedin_helper_form_container).removeClass("d-none");
}
function ExecuteDocumentLoadLogic() {
    ReadUserAccountInfo();
    ReadUserSettings();
    RegisterFormEvents();
    $(linkedin_helper_settings_button).on("click", function () {
        chrome.runtime.openOptionsPage();
    })
    $(linkedin_helper_change_account_info_button).on("click", function () {
        ShowFormContainer();
    })
    if (UserAccountInfoPresenceStatus(user_account_info)) {
        ShowMainContainer();
    }
    else {
        ShowFormContainer();
    }
}
function ReadUserAccountInfo() {
    chrome.storage.sync.get(['userAccountInfo'], function (result) {
        var user_account_info_stringified = result.userAccountInfo;
        if (UserAccountInfoPresenceStatus(user_account_info_stringified)) {
            this.user_account_info = JSON.parse(user_account_info_stringified)
            $(linkedin_helper_form_email_field).val(this.user_account_info["email"])
            $(linkedin_helper_form_secret_key_field).val(this.user_account_info["key"])
            ShowMainContainer();
        } else {
            console.log('User Account Info not found.');
        }
    });

}
function ReadUserSettings() {
    chrome.storage.sync.get(['userSettings'], function (result) {
        var user_settings_stringified = result.userSettings;
        if (UserAccountInfoPresenceStatus(user_settings_stringified)) {
            this.user_settings = JSON.parse(user_settings_stringified)
        } else {
            this.SaveDefaultUserSettings();
        }
    });
}
function SaveDefaultUserSettings() {
    user_settings = {
        "model": "gpt-3.5-turbo",
        "instruction": "You are a language model designed to assist in crafting engaging and insightful comments for LinkedIn posts. Your role is to generate comments that are professional, positive, and tailored to the context of the post.\nPlease create comments that are informative, engaging, and reflective of the user's authentic voice. The goal is to encourage meaningful discussion and provide value to the LinkedIn community.\nYou'll receive the content of the post in the next user message, and your response should be based on that content. Thank you for your assistance!",
        "post_button": false
    }
    chrome.storage.sync.set({ userSettings: JSON.stringify(user_settings) }, function () {
        console.log("Defualt User Settings Saved Successfully!");
    });
}
function RegisterFormEvents() {
    $("#linkedin_helper_form").submit(function (event) {
        event.preventDefault();
        var email_value = $(linkedin_helper_form_email_field).val();
        var secret_key_value = $(linkedin_helper_form_secret_key_field).val();
        user_account_info = { "email": email_value, "key": secret_key_value }
        chrome.storage.sync.set({ userAccountInfo: JSON.stringify(user_account_info) }, function () {
            console.log("Form Submitted!")
            this.ShowMainContainer();
        });
    });
}