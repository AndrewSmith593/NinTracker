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


  // GET request to figure out which user is logged in and grabs the ID of the current user
  $.get("/api/user_data").then(function (data) {
    userIDNumber = data.id;
  });

  // ==================== Buttons ==================== //

 
  $("#gameSave").click(function () {  // when the SAVE BUTTON is clicked
    // create an object to send to api/games that holds the game data we want to add
    newGame = { "gameName": gameName, "gameID": currentGameID, "completion": false, "userId": userIDNumber }
    gameList.empty(); // clear the game list
    $.ajax({
      type: "POST",
      url: "/api/games",
      data: newGame,
      success: function () {
        console.log(`Game added to reference table`);
        showSavedGames(); 
      }
    });
  });


  // --when the search button is clicked
  $("#searchButton").click(function () {
    var gameSearch = $("#gameSearch").val().trim().replace(/\s+/g, "+");
    var queryURL = "https://api.rawg.io/api/games?search=" + gameSearch;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      JSON.stringify(response);
      console.log(response);
      $('#gameSearch').val('');
      var firstResult = response.results[0]
      var conIndex = firstResult.platforms.length - 1
      currentGameID = firstResult.id
      gameName = firstResult.name
      // console.log("Current gameID is " + currentGameID);
      gameTitle.text(firstResult.name);
      originalCon.text(`Original console: ${firstResult.platforms[conIndex].platform.name}`)
      recentCon.text(`Most recent console: ${firstResult.platforms[0].platform.name}`);
      releaseDate.text("Released on: " + firstResult.released)
      gameImage.attr("src", firstResult.background_image);


      function returnGenres() {
        var genreList = [];
        var genreArray = firstResult.genres
        for (let i = 0; i < genreArray.length; i++) {

          var currentGenre = (` ${genreArray[i].name}`);

          genreList.push(currentGenre)

        }
        console.log(genreList)
        genres.text(`Genres: ${genreList}`)
        return genreList;

      }
      returnGenres()

      if (firstResult.metacritic == null) {
        score.text(`Average Rating: ${firstResult.rating}/5`)
      } else {
        score.text(`Metacritic Score: ${firstResult.metacritic}/100`)
      }


      // This filter takes in the original RAWG response and returns an array of games that are only on Nintendo systems as the var filteredGames
      var filteredGames = response.results.filter(function (results) {
        // console.log(results)
        var platformArray = results.platforms.filter(function (data) {
          return data.platform.id == 7 || data.platform.id == 8 || data.platform.id == 10 || data.platform.id == 11 || data.platform.id == 24 || data.platform.id == 43 || data.platform.id == 79 || data.platform.id == 49 || data.platform.id == 26 || data.platform.id == 105 || data.platform.id == 83;

        })
        // console.log(`here is the platform:`)
        // console.log(platformArray)
      });
      // console.log(filteredGames)
    });
    // info to append to page

    // FILTER RESPONSE INTO NEW ARRAY CALLED GAMES
  });


  // const responsefromAPI = {
  //   item1: { key: 'sdfd', value:'sdfd' },
  //   item2: { key: 'sdfd', value:'sdfd' },
  //   item3: { key: 'sdfd', value:'sdfd' }
  // };
  // these are the api platform ID's in const allowed: 7, 8, 10, 11, 24, 43, 79, 49, 26, 105, 83
  // const allowed = [''];

  // const filtered = Object.values(raw)
  //   .filter(key => allowed.includes(key))
  //   .reduce((obj, key) => {
  //     obj[key] = raw[key];
  //     return obj;
  //   }, {});

  // console.log(filtered);

  // Get request to get all saved games and filter by the current user
  function showSavedGames() {
    $.get("/api/games").then(function (data) {
      // userIDNumber
      // data is an object
      for (let i = 0; i < data.length; i++) {
        var savedGame = data[i];
        if (savedGame.userId == userIDNumber) {
          // render to the page
          var newGame = $("<li>").text(data[i].gameName);
          console.log(data[i].gameName);
          gameList.append(newGame)
          console.log("games displayed")
        }
      }
    
    });
  }

showSavedGames();
});