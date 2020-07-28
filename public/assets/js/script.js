$(document).ready(function () {
  // RAWG API call
  var queryURL = "https://api.rawg.io/api/games/";
  // title
  var gameTitle = $("#gameTitle");
  // most recent console
  var recentCon = $("#recentCon");
  // release console
  var originalCon = $("#originalCon");
  // background image
  var gameImage = $("#gameImage");
  // genres
  var genres = $("#genres");
  // release date
  var releaseDate = $("#releaseDate");
  // metacritic score
  var score = $("#score");
  
  var userIDNumber = getUserID()
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  
  function getUserID() {
    $.get("/api/user_data").then(function (data) {
      var userNum = data.id;
      console.log(userNum)
      return userNum;
    });
  }

  // SAVE BUTTON
  // --when the save button is clicked--
  $("#gameSave").click(function () {
    // 1. grab the ID of the currently loaded game
    // var gameIdNum = gameID
    // 2. grab the ID of the current user
    // var userIdNum = apiRoutes.getUserId()
    // 3. post the ID of the game and the ID of the user into a new row of the reference table
    // apiRoutes.saveGame(gameID, userID);
    console.log(getuserID());
    // create an object to send to api/reference that holds the info we want to add
    newGame = { "gameID": 22707, "userID": userNum }
    console.log(newGame);

    $.ajax({
      type: "POST",
      url: "/api/reference",
      data: newGame,
      success: function () {
        console.log(`Game added to reference table`)
      }
    });
  });

  // searchedCharacter = searchedCharacter.replace(/\s+/g, "+").toLowerCase();
  // event listenter for button press
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
      var gameID = firstResult.id
      // console.log(gameID);
      gameTitle.text(firstResult.name);
      originalCon.text(`Original console: ${firstResult.platforms[conIndex].platform.name}`)
      recentCon.text(`Most recent console: ${firstResult.platforms[0].platform.name}`);
      releaseDate.text("Released on: " + firstResult.released)
      gameImage.attr("src", firstResult.background_image);
      // genres.text(`Consoles: ${genreList}`)

      return gameID;

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

  // console.log(games.results[0].platforms[0].platform.id)

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

});