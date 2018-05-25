var slider = [];
	
for (i = 0; i < 10; i++) {
	slider.push(document.getElementById("slider" + i));

	noUiSlider.create(slider[i], {
		start: [3],
		range: {
			'min': 1,
			'max': 5
		},
		step: 1,
		pips: {
			mode: 'positions',
			values: [0, 25, 50, 75, 100],
			density: 25
		}
	});
}

$(".noUi-value[data-value='1']").text("Strongly Disagree");
$(".noUi-value[data-value='2']").text("Disagree");
$(".noUi-value[data-value='3']").text("Neutral");
$(".noUi-value[data-value='4']").text("Agree");
$(".noUi-value[data-value='5']").text("Strongly Agree");


window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
		form.classList.add('was-validated');
        if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
			window.scrollTo(0, 0);
        } else {
			event.preventDefault();
			var newUser = {
				name: $("#userNameForm").val().trim(),
				img: $("#userImgForm").val().trim(),
				scores: []
			};
			
			for  (i = 0; i < 10; i++) {
				newUser.scores.push(parseInt(slider[i].noUiSlider.get()));
			}
			console.log(newUser.scores);
			

			$.post("/api/friends", newUser)
				.then(function(data) {
					console.log(data);
					runCompatibility(newUser);
				});
		}
      }, false);
    });
  }, false);
  

function runCompatibility(newUser) {

	// Here we get the location of the root page.
	// We use this instead of explicitly saying the URL is localhost:3001 because the url will change when we deploy.
	var currentURL = window.location.origin;

	// The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
	$.ajax({ url: currentURL + "/api/friends", method: "GET" })
		.then(function(friends) {

		// Here we are logging the URL so we have access to it for troubleshooting
		console.log("------------------------------------");
		console.log("URL: " + currentURL + "/api/friends");
		console.log("------------------------------------");

		// Here we then log the NYTData to console, where it will show up as an object.
		console.log(friends);
		console.log("------------------------------------");

		var lowest = 100;
		var mostComp;
		// Loop through current database of users
		for (var i = 0; i < friends.length; i++) {
			var sumDiff = 0;
			// Exclude user's own info
			if (newUser.name != friends[i].name) {
				console.log("Checking: " + friends[i].name);
				// Loop through user score for each question
				for (var j = 0; j < 10; j++) {
					// Add up total difference in scores
					sumDiff += Math.abs(newUser.scores[j] - friends[i].scores[j]);
				}
				console.log("sumDiff: " + sumDiff);
				// If current user being checked is lower than previous, store as new most compatible friend
				if (sumDiff < lowest) {
					lowest = sumDiff;
					console.log("new lowest: " + lowest);
					mostComp = friends[i];
				}
			}
		}
		console.log("Most compatible: " + mostComp.name);
		$('#exampleModal').modal({
			backdrop: "static",
			keyboard: false
		});
		$("#resultName").text(mostComp.name);
		$("#resultImg").attr("src", mostComp.img);
	});
}

