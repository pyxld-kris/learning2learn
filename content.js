// content.js
function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

var run_button_found = false;
document.addEventListener("DOMNodeInserted", function(e) {
	// TODO use the span element to find the run button
	run_button = getElementByXpath('//*[@id="root"]/div/div[2]/div[2]/section[1]/div/section[1]/div[2]/div/div[3]/div/div[1]/div/div/div');

	if((run_button != null) && !run_button_found) {
		run_button_found = true;
		run_button.addEventListener("click", function(e) {
			var date = new Date();
			// var xhr = new XMLHttpRequest();
			// xhr.open("GET", url, true);
			// xmlHttp.send( null );
			// return xmlHttp.responseText;

			var url = "https://script.google.com/macros/s/AKfycbwAjdmugDGrK15wIsAk4szFpfGlHfjvQvxVBKcntc0AkJD0IFA/exec"
			var jqxhr = $.ajax({
				url: url,
				method: "GET",
				dataType: "json",
				data: {
					"code": document.getElementsByClassName("ace_text-layer")[0].innerText,
					"timestamp": date
				}.serializeObject()
			}).success(
				console.log("Sent data")
			);

			// TODO scale out by using google datastore
			// var xhr = new XMLHttpRequest();
			// xhr.open('POST', 'https://datastore.googleapis.com/v1/projects/my-project-1533510475410:beginTransaction', true);


		}, false);
	}
}, false);
