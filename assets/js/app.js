// Initial array of Gifs
var gifsArray = ["One Punch Man", "My Hero Academia", "Black Clover", "Hunter X Hunter", "Archer", "Pokemon", "Dragon Ball Z"];
const inputField = document.querySelector("#gif-input");
var apikey = "&api_key=Hsdutux0jTW6ks8DiqK1TeacMKaXNcxk&limit=10";
var url = "https://api.giphy.com/v1/gifs/search?q=";
// function for displaying all the gifs in the chosen div
function displayGif() {
  $("#gifs-view").empty();
  $("#gifs-viewPG").empty();
  $("#gifs-viewPG-13").empty();

  $("#gifs-view").append("G:");
  $("#gifs-viewPG").append("PG:");
  $("#gifs-viewPG-13").append("PG-13:");

  var gif = $(this).attr("data-name");
  console.log(gif);
  var queryURL = url + gif + apikey;
  console.log(queryURL);
  // Creates AJAX call for the specific gif button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var gifDivG = $("<div class='gif'>");
    var gifDivPG = $("<div class='gif'>");
    var gifDivPG13 = $("<div class='gif'>");

    result = response.data;
    console.log(result);

    for (var i = 0; i < result.length; i++) {
      const gifStillUrl = result[i].images.original_still.url;
      const gifUrl = result[i].images.original.url;
      console.log(result[i].rating);
      var image = $("<img class= 'still-image'>");

      image.attr("src", gifStillUrl);
      image.attr("data-still", gifStillUrl);
      image.attr("alt", "Still frame of anime gif");
      image.attr("data-gif", gifUrl);
      image.attr("class", "animeGif");
      image.attr("data-index", i);

      if (result[i].rating === "g") {
        gifDivG.append(image);
      } else if (result[i].rating === "pg") {
        gifDivPG.append(image);
      } else {
        gifDivPG13.append(image);
      }

      $("#gifs-view").append(gifDivG);
      $("#gifs-viewPG").append(gifDivPG);
      $("#gifs-viewPG-13").append(gifDivPG13);
    }
  });
}

// Function for displaying gif buttons
function renderButtons() {
  // Deleting the gif buttons prior to adding new gif buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < gifsArray.length; i++) {
    // Then dynamicaly generating buttons for each gif in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
    a.addClass("gif-btn");
    // Adding a data-attribute with a value of the gif at index i

    a.attr("data-name", gifsArray[i]);
    // Providing the button's text with a value of the gif at index i
    a.text(gifsArray[i]);
    // Adding the button to the HTML
    $("#buttons-view").append(a);
  }
}

// This function handles events where one button is clicked
$("#add-gif").on("click", function(event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box
  var gif = $("#gif-input")
    .val()
    .trim();
  gifsArray.push(gif);

  // calling renderButtons
  renderButtons();
});

$(document).on("click", ".gif-btn", displayGif);

renderButtons();

$(document).on("click", ".animeGif", function(event) {
  //This code changes the src from a moving gif to a still of the gif
  // making it look like play/pause functionality.
  var currentIn = $(this).attr("data-index");
  var moving = $(this).attr("data-gif");
  var still = $(this).attr("data-still");
  console.log("before");
  if ($(this).attr("src") === moving) {
    // assigning the current gif's 'src' attribute to the still image
    $(this).attr("src", still);
    console.log("still");
  } else {
    // assigning the current gif's 'src' attribute to the moving gif
    $(this).attr("src", moving);
    console.log("moving");
  }
  console.log("after");
});