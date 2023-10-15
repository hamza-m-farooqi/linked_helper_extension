var user_account_info = null;
var user_settings = null;
$(document).ready(function () {
  var pageTitle = $('title').text();
  console.log('Page Title: ' + pageTitle);
  RegisterCommentButtonClickEvent();
  ReadUserAccountInfo();
  ReadUserSettings();
  setInterval(function () {
    this.RegisterCommentButtonClickEvent();
  }, 3000)
  // ReadAvailableModelsFromOpenAI();
});

function UserAccountInfoPresenceStatus(settings) {
  if (settings != null && settings != undefined && settings != "null" && settings != "undefined") return true
  else return false
}
function UserSettingsPresenceStatus(settings) {
  if (settings != null && settings != undefined && settings != "null" && settings != "undefined") return true
  else return false
}

function ReadUserAccountInfo() {
  chrome.storage.sync.get(['userAccountInfo'], function (result) {
    var user_account_info_stringified = result.userAccountInfo;
    if (UserAccountInfoPresenceStatus(user_account_info_stringified)) {
      this.user_account_info = JSON.parse(user_account_info_stringified);
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
      console.log('User setting not found.');
    }
  });
}

function RegisterCommentButtonClickEvent() {
  $(".comment-button").on("click", function () {
    var social_actions_div = $(this).closest(".social-details-social-activity").first();
    var social_post_div = social_actions_div.closest("div[data-id^='urn:li:activity:']").first().find(".full-height").first();
    var social_post_content = social_post_div.find(".feed-shared-update-v2__description-wrapper").first()
    social_actions_div.find(".comments-comment-texteditor").click();
    var comment_box = social_actions_div.find(".ql-editor").first().find("p");
    $(".linkedin_helper_loader").show();
    FetchCommentFromGPT(social_post_content.text(), comment_box);
    // social_actions_div.find(".ql-editor").first().find("p").text("Hahaha")
    // setTimeout(() => {
    //   $(".comments-comment-box__submit-button").click()
    // }, 500);
  });
}

function FetchCommentFromGPT(post_content, comment_box) {
  $.ajax({
    url: 'https://api.openai.com/v1/chat/completions',
    type: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.user_account_info["key"]
    },
    data: JSON.stringify({
      model: this.user_settings["model"],
      messages: [
        { role: 'system', content: this.user_settings["instruction"] },
        { role: 'user', content: post_content }
      ],
      temperature: 0.7
    }),
    success: function (data) {
      // Handle the response data here
      $(".linkedin_helper_loader").hide();
      var response = data["choices"][0]["message"]["content"];
      comment_box.text(response);
    },
    error: function (error) {
      // Handle any errors here
      $(".linkedin_helper_loader").hide();
      console.error(error);
    }
  });
}
function ReadAvailableModelsFromOpenAI() {
  $.ajax({
    url: 'https://api.openai.com/v1/models',
    type: 'GET',
    headers: {
      'Authorization': 'Bearer ' + "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",
      'OpenAI-Organization': "org-zmgpFWondPFkXQsoogVNeOIU"
    },
    success: function (data) {
      // Handle the response data here
      console.log("Available Models : ")
      console.log(data);
    },
    error: function (error) {
      // Handle any errors here
      console.error(error);
    }
  });
}