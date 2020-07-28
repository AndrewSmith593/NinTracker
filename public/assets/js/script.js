$(document).ready(function () {

  // ==================== Global Variables ==================== //

  var gameTitle = $("#gameTitle"); // var for where the game title will be displayed
  var recentCon = $("#recentCon"); // var for where the most recent console will be displayed
  var originalCon = $("#originalCon"); // var for where the release console will be displayed
  var gameImage = $("#gameImage"); // var for where the game image will be displayed
  var genres = $("#genres"); // var for where the genre will be displayed
  var releaseDate = $("#releaseDate"); // var for where the release date will be displayed
  var score = $("#score"); // var for where the game score will be displayed
  var gameList = $("#savedGames") // var for where the saved games list will be displayed
  var userIDNumber; // var to hold the current users id number
  var currentGameID; // var to hold currently searched game id number
  // var gameTitle;

  // ==================== Buttons ==================== //

  $("#gameSave").click(function () {  // when the SAVE BUTTON is clicked
    // create an object to send to api/games that holds the game data we want to add
    newGame = { "gameName": gameName, "gameID": currentGameID, "completion": false, "userId": userIDNumber }
    gameList.empty(); // clear the saved game list
    $.ajax({ // add the new game data to the saved game list
      type: "POST",
      url: "/api/games",
      data: newGame,
      success: function () { // once the game is saved to the table, rerender the updated saved games list
        console.log(`Game added to reference table`);
        showSavedGames();
      }
    });
  });

  $("#searchButton").click(function () { // when the SEARCH BUTTON is clicked
    var gameSearch = $("#gameSearch").val().trim().replace(/\s+/g, "+"); // trim the values from the search box and replace spaces betwen words with "+"
    var queryURL = "https://api.rawg.io/api/games?search=" + gameSearch; // set up the URL for the RAWG API request
    $.ajax({ // RAWG GET request
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      JSON.stringify(response);
      console.log(response);
      $('#gameSearch').val(''); // clear the search bar
      var firstResult = response.results[0] // get the data from the first response from the API call
      var conIndex = firstResult.platforms.length - 1 // get the index for the original console
      currentGameID = firstResult.id // set the currentGameID global variable to the most recently searched gameID
      gameName = firstResult.name // set the gameName global variable to the most recently searched game title
      gameTitle.text(firstResult.name); // displays the title of the first response to the user
      originalCon.text(`Original console: ${firstResult.platforms[conIndex].platform.name}`); // displays the original console of the first response to the user
      recentCon.text(`Most recent console: ${firstResult.platforms[0].platform.name}`); // displays the most recent console of the first response to the user
      releaseDate.text("Released on: " + firstResult.released); // displays the release date of the first response to the user
      gameImage.attr("src", firstResult.background_image); // sets the image for the first response to the user

      function returnGenres() { // gets the list of genres from the results object and displays them to the user
        var genreList = [];
        var genreArray = firstResult.genres
        for (let i = 0; i < genreArray.length; i++) {
          var currentGenre = (` ${genreArray[i].name}`);
          genreList.push(currentGenre)
        }
        genres.text(`Genres: ${genreList}`)
        return genreList;

      }
      returnGenres();

      if (firstResult.metacritic == null) { // displays the average rating if there is not metacritic score
        score.text(`Average Rating: ${firstResult.rating}/5`)
      } else {
        score.text(`Metacritic Score: ${firstResult.metacritic}/100`);
      }


      // This filter will take in the original RAWG response and returns an array of games that are only on Nintendo systems as the var filteredGames
      var filteredGames = response.results.filter(function (results) {
        var platformArray = results.platforms.filter(function (data) {
          return data.platform.id == 7 || data.platform.id == 8 || data.platform.id == 10 || data.platform.id == 11 || data.platform.id == 24 || data.platform.id == 43 || data.platform.id == 79 || data.platform.id == 49 || data.platform.id == 26 || data.platform.id == 105 || data.platform.id == 83;
        })
      });
    });
  });

  // ==================== Functions ==================== //
  function getCurrentUser() { // GET request to figure out which user is logged in and grabs the ID of the current user
    $.get("/api/user_data").then(function (data) {
      userIDNumber = data.id;
    });
  }

  function showSavedGames() { // this function displays the users saved games to the page
    $.get("/api/games").then(function (data) { // gets a list of all saved games
      for (let i = 0; i < data.length; i++) { // for each game in the saved games table
        var savedGame = data[i]; // var for the current data object
        if (savedGame.userId == userIDNumber) { // if the userID for the current object is the same as the current user
          var newGame = $("<li>").text(data[i].gameName); // set the text for a new list item
          gameList.append(newGame); // append the game to the page
        }
      }
    });
  }
  

  // ==================== Functions to Run on Page Load ==================== //
  
  getCurrentUser(); // get the ID of the current user on page load
  showSavedGames(); // render the user's saved games list on page load
});