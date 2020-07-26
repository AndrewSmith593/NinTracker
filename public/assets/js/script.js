
$( document ).ready(function() {
  // Handler for .ready() called.


// replace with RAWG API call
var queryURL = "https://api.rawg.io/api/games?search=metroid";
// where to display information
var gameInfo = $("#gameInfo")
// event listenter for button press
var imageToDisplay = $("#gameImage")
$("#searchButton").click(function () {
    console.log(`search button was clicked!`)
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    JSON.stringify(response)
      console.log(response)
    // clears current search info
    // gameInfo.empty();    

    // This filter takes in the original RAWG response and returns an array of games that are only on Nintendo systems as the var filteredGames
    var filteredGames =  response.results.filter(function(results) {

      gameInfo.append(results.name);
      gameInfo.append(results.platforms[0].platform.name)
      imageToDisplay.attr("src", results.background_image);
      console.log("results:")
      console.log(results)


      var platformArray = results.platforms.filter(function(data){

        return data.platform.id == 7 || data.platform.id == 8 || data.platform.id == 10 || data.platform.id == 11 || data.platform.id == 24 || data.platform.id == 43 || data.platform.id == 79 || data.platform.id == 49 || data.platform.id == 26 || data.platform.id == 105 || data.platform.id == 83;

      }) 

      console.log(`here is the platform:`)
      console.log(platformArray)





  });
  console.log(filteredGames)




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