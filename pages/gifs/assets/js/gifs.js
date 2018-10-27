var apikey = "iahLnjJYxHRtijMRov2GFqFCTLa6ykxR";
var queryURL = "https://api.giphy.com/v1/gifs/search?q="+gifSearch+"&api_key="+apikey;
var gifSearch = "funny+cats";

var gifCategories= ["Happy", "Sad","Cats", "Dogs", "Confetti", "Sunglasses", "Hugs", ];

// Function for displaying movie data
function renderButtons() {

  //cache movies view div
  var gifBtns = $(".gifButtons");
  //clear div
  gifBtns.empty();

  //loop through array
  for(var i = 0; i < gifCategories.length; i++){

    //create movies button
    console.log(gifCategories[i]);
    gifBtns.append('<button type = "button" class = "btn btn-secondary gifTypes" id = "' + gifCategories[i] 
    + '">' + gifCategories[i] + '</button>');
  }

}



// This function handles events where one button is clicked
$("#addGif").on("click", function() {

    // YOUR CODE GOES HERE
    event.preventDefault();

    //Reset them with input values
    gifType = $("#gifInput").val();
    queryURL = "https://api.giphy.com/v1/gifs/search?q="+gifType+"&api_key="+apikey;


    // Write code between the dashes below to hit the queryURL with $ajax, then take the response data
    // and display it in the div with an id of movie-view

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      for(var i = 0; i < gifCategories.length; i++){

        var inArray = false;

        if(gifType === gifCategories[i]){
          inArray = true;
        }

      }

      if(!inArray){
        gifCategories.push(gifType);
        renderButtons();
      }

    });

});

function displayGifs(){

  gifType = $(this).attr("id");
  queryURL = "https://api.giphy.com/v1/gifs/search?q="+gifType+"&api_key="+apikey;

  $.ajax({url: queryURL,method:"GET"}).then(function(response){

    // Obtain a reference to the gifDisplay column in the DOM
    var columnRef = $(".gifDisplay");

    columnRef.empty();

    //create 10 gifs
    for (var i = 0; i < 10; i++){

      //Create and save a reference to new empty table row
      var cardDiv = $('<div>');
      cardDiv.attr('class','image-holder');
      
      var imgElement = $('<img src = "' + response.data[i].images.fixed_height_still.url + 
      '" class = "img-fluid gifs" id = "' + i + '"/>');
      imgElement.attr('data-name',gifType);
      imgElement.attr('width',response.data[i].images.fixed_height_still.width);
      imgElement.attr('height',response.data[i].images.fixed_height_still.height);

      var rating = $('<p>');
      rating.text("Rating: " + response.data[i].rating);
      

      //attach all the elements
      cardDiv.append(rating);
      cardDiv.prepend(imgElement);
      columnRef.append(cardDiv);

    
    }


  });

}

function gifsClick(){

  var imgClicked = $(this);

  gifType = imgClicked.attr("data-name");
  queryURL = "https://api.giphy.com/v1/gifs/search?q="+gifType+"&api_key="+apikey;

  

  var imgSrc = imgClicked.attr('src');
  var imgNum = imgClicked.attr('id');

  $.ajax({url: queryURL,method:"GET"}).then(function(response){

    if(imgSrc === response.data[imgNum].images.fixed_height_still.url){
      imgClicked.attr('src',response.data[imgNum].images.fixed_height.url)
    }
    else if(imgSrc === response.data[imgNum].images.fixed_height.url){
      imgClicked.attr('src',response.data[imgNum].images.fixed_height_still.url)
    }

  });

}

//ON DOCUMENT LOAD

renderButtons();

$(document).on("click",".gifTypes",displayGifs);

$(document).on("click",".gifs",gifsClick);