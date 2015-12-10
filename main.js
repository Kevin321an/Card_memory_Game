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
	//$("#card").flip();
//polulate the pics
for (var i = 0; i < 2; i++) {
	//append each pic into a row seuentially
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
		$("#" + id + " img").slideDown('slow');

		//without a card has been opened 
		if (ImgOpened == "") {
			BoxOpened = id;

			ImgOpened = $("#" + id + " img").attr("src");			
				$(Source + " div").bind("click", FlipCard);			
		} else { 
			//with card opened 
			CurrentOpened = $("#" + id + " img").attr("src");
			// cards no pair
			if (ImgOpened != CurrentOpened) {				
					$("#" + id + " img").slideUp('slow');
					$("#" + BoxOpened + " img").slideUp('slow');
					BoxOpened = "";
					ImgOpened = "";				
				//cards pair
			} else {							
				BoxOpened = "";
				ImgOpened = "";
			}			
				$(Source + " div").bind("click", FlipCard);
			
		}		
	}
}
//shuffle the pics in random palces 
function ShuffleImages() {
	var ImgAll = $(Source).children();
	//[div#card00, prevObject: n.fn.init[1], context: document, selector: "#container div:first-child"]
	var ImgThis = $(Source + " div:first-child");
	var ImgArr = new Array();

	for (var i = 0; i < ImgAll.length; i++) {
		ImgArr[i] = $("#" + ImgThis.attr("id") + " img").attr("src");
		ImgThis = ImgThis.next();
	}	
		ImgThis = $(Source + " div:first-child");	
	for (var z = 0; z < ImgAll.length; z++) {
	//var RandomNumber = RandomFunction(0, ImgArr.length - 1);//0 to 10-1
	var RandomNumber = Math.floor(Math.random()*ImgArr.length);

		$("#" + ImgThis.attr("id") + " img").attr("src", ImgArr[RandomNumber]);
		ImgArr.splice(RandomNumber, 1);
		ImgThis = ImgThis.next();
	}
}
