$(document).ready(function(){

	var games = ["Overwatch", "Battlefield", "Counter Strike", "Fallout", "Dishonored", "Madden", "The Witcher"];


	function renderButtons() {
		$("#buttons").empty();
		for (i = 0; i < games.length; i++){
			var a = $("<button>");
			a.addClass("gButton");
			a.attr("data-name", games[i]);
			a.text(games[i]);
			$("#buttons").append(a);
		}


	}

	$("#add-game").on("click", function(event){
		event.preventDefault();
		var gInput = $(".input").val().trim();
		games.push(gInput);
		renderButtons();
	});

	$("body").on("click", ".gButton", function(){
		$(".gifs").empty();
		console.log("hello");
		event.preventDefault();
		var gButton = $(this).data("name");
		var qURL = "http://api.giphy.com/v1/gifs/search?q=" + gButton + "&api_key=dc6zaTOxFJmzC";
		$.ajax({url: qURL, method: "GET"}).done(function(response) {
			var results = response.data;
			for (var i = 0; i < results.length; i++){
			var gDiv = $("<div>");
			var rating = results[i].rating;
			var p = $("<p>").text("Rating: " + rating);
			var gif = $("<img>");
			gif.attr("src", results[i].images.fixed_height_still.url);

			$(".gifs").append(gDiv);
			gif.addClass("gif");
			gif.attr("data-state", "still");
			gif.attr("data-animate", results[i].images.fixed_height.url);
			gif.attr("data-still", results[i].images.fixed_height_still.url);
			gDiv.prepend(p);
			gDiv.prepend(gif);
			}
		});
	});

	$("body").on("click", ".gif", function(){
		var state = $(this).attr("data-state");

		if (state === "still"){
			$(this).attr("src", $(this).data("animate"));
			$(this).attr("data-state", "animate");
		}
		else {
			$(this).attr("src", $(this).data("still"));
			$(this).attr("data-state", "still");
		}
	});


	renderButtons();

});