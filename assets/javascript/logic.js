$(document).ready(function(){
	var topics = ["dog", "cat", "fish", "bird", "lizard",
	"lion", "tiger", "hippo", "octopus", "monkey", "turtle",
	 "frog", "spider", "jellyfish", "shark", "starfish"];
	 var btnColor;
	 var colorNumber = 0; 
	 function buttonColorChange(){
	 	if(colorNumber % 2 === 0){
			btnColor = "danger";
		}
		else{
			btnColor = "primary";
		}
	 }
	//creates a button for each item in topics
	for(var i = 0; i < topics.length; i++){
		colorNumber = i;
		buttonColorChange();
		var currentBtn = topics[i];
		var button = $("<button class='btn btn-" + btnColor + " animal-btn'>");
		button.text(topics[i]);
		$("#topic-list").append(button);
	}
	//Displays the gifs for the topic that was clicked
	$(document).on("click", ".animal-btn", function(){
		var currentAnimal = $(this).text();
		var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + currentAnimal + "&limit=10&rating=pg&api_key=dc6zaTOxFJmzC";
		$("#gif-collection").html("");
		$.ajax({
			url: queryUrl,
			method: "GET"
		}).done(function(response){
			var result = response.data;
			for(var x = 0; x < result.length; x++){
				var gifDiv = $("<div class='gif'>");
				gifDiv.append("<h3>" + result[x].rating + "</h3");
				var gifImg = $("<img>");
				gifImg.attr("src", result[x].images.fixed_height_still.url);
				gifImg.attr("data-state", "still");
				gifImg.attr("data-still", result[x].images.fixed_height_still.url);
				gifImg.attr("data-animate", result[x].images.fixed_height.url);
				gifDiv.append(gifImg);
				$("#gif-collection").append(gifDiv);
			}

		})

	})
	//Aniamtes/pauses when a gif is clicked
	$(document).on("click", "img", function(){
		if($(this).attr("data-state") === "still"){
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		}
		else{
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}

	})
	//add a new button through the input and submit button
	$(document).on("click", "#submit-btn", function(){
		newAnimal = $("#animal-input").val().trim();
		colorNumber++;
		buttonColorChange();
		var addButton = $("<button class='btn btn-" + btnColor + " animal-btn'>");
		addButton.text(newAnimal);
		$("#animal-input").val("");
		$("#topic-list").append(addButton);
	})

})