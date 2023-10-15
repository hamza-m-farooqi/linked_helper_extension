var user_settings = null;
var linkedin_helper_settings_form = "#linkedin_helper_settings_form";
var linkedin_helper_settings_form_gpt_model_selectbox = "#linkedin_helper_settings_form_gpt_model_selectbox";
var linkedin_helper_settings_form_instruction_field = "#linkedin_helper_settings_form_instruction_field";
var linkedin_helper_settings_form_post_button_click_status_checkbox = "#linkedin_helper_settings_form_post_button_click_status_checkbox";

$(document).ready(function () {
    ReadUserSettings();
    RegisterFormEvents();
})
function UserSettingsPresenceStatus(settings) {
    if (settings != null && settings != undefined && settings != "null" && settings != "undefined") return true
    else return false
}
function ReadUserSettings() {
    chrome.storage.sync.get(['userSettings'], function (result) {
        var user_settings_stringified = result.userSettings;
        if (UserSettingsPresenceStatus(user_settings_stringified)) {
            this.user_settings = JSON.parse(user_settings_stringified)
            $(linkedin_helper_settings_form_gpt_model_selectbox).val(this.user_settings["model"])
            $(linkedin_helper_settings_form_instruction_field).val(this.user_settings["instruction"])
            $(linkedin_helper_settings_form_post_button_click_status_checkbox).val(this.user_settings["post_button"])
        } else {
            console.log('User setting not found.');
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
    $(linkedin_helper_settings_form).submit(function (event) {
        event.preventDefault();
        var model = $(linkedin_helper_settings_form_gpt_model_selectbox).val();
        var instruction = $(linkedin_helper_settings_form_instruction_field).val();
        var post_button = $(linkedin_helper_settings_form_post_button_click_status_checkbox).val();
        user_settings = { "model": model, "instruction": instruction, "post_button": post_button }
        chrome.storage.sync.set({ userSettings: JSON.stringify(user_settings) }, function () {
            console.log("Form Submitted!")
        });
    });
}