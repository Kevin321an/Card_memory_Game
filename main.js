var BoxOpened = ""; // save the previous element's ID
var ImgOpened = ""; //save the previous card has been opened 


var Source = "#container";

var ImgSource = [
  "1.png",
  "2.png",
  "3.png",
  "4.png",  
  "5.png"
];

$(document).ready(function() {
	$("#card").flip();
//polulate the pics
for (var i = 0; i < 2; i++) {
	//append each pic into a row
	$.each(ImgSource, function(key, val) { 
		var str = "<div id=card" + i + key + "><img src=" + val + " />"; 
		$(Source).append(str);
	});
}

	//when player click a div under # container: space ahead of div is needed
	$(Source + " div").click(FlipCard);
	//random the pics 
	ShuffleImages();
});

function FlipCard() {
	// return the element's ID
	var id = $(this).attr("id");

	if ($("#" + id + " img").is(":hidden")) { //currently without  the card opened 
		$(Source + " div").unbind("click", FlipCard);
		//animation
		$("#" + id + " img").slideDown('fast');

		//without a card has been opened 
		if (ImgOpened == "") {
			BoxOpened = id;

			ImgOpened = $("#" + id + " img").attr("src");
			setTimeout(function() {
				$(Source + " div").bind("click", FlipCard)
			}, 300);
		} else { 

			//with card opened 
			CurrentOpened = $("#" + id + " img").attr("src");
			// cards no pair
			if (ImgOpened != CurrentOpened) {
				setTimeout(function() {
					$("#" + id + " img").slideUp('fast');
					$("#" + BoxOpened + " img").slideUp('fast');
					BoxOpened = "";
					ImgOpened = "";
				}, 400);
				//cards pair
			} else {
				$("#" + id + " img").parent().css("visibility", "hidden");
				$("#" + BoxOpened + " img").parent().css("visibility", "hidden");				
				BoxOpened = "";
				ImgOpened = "";
			}
			setTimeout(function() {
				$(Source + " div").bind("click", FlipCard)
			}, 400);
		}		
	}
}

//shuffle the pics in random palces 
function ShuffleImages() {
	var ImgAll = $(Source).children();
	var ImgThis = $(Source + " div:first-child");
	var ImgArr = new Array();

	for (var i = 0; i < ImgAll.length; i++) {
		ImgArr[i] = $("#" + ImgThis.attr("id") + " img").attr("src");
		ImgThis = ImgThis.next();
	}	
		ImgThis = $(Source + " div:first-child");
	
	for (var z = 0; z < ImgAll.length; z++) {
	var RandomNumber = RandomFunction(0, ImgArr.length - 1);

		$("#" + ImgThis.attr("id") + " img").attr("src", ImgArr[RandomNumber]);
		ImgArr.splice(RandomNumber, 1);
		ImgThis = ImgThis.next();
	}
}
function RandomFunction(MaxValue, MinValue) {
		return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
	}

