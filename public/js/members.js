$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text("hey " + data.email + ". You are user # " + data.id);
  });
  // render all saved games to the user
  // showSavedGames();
});
