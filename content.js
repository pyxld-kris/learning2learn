function getElementByXpath(path) {
	return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}


// https://gist.github.com/kaizhu256/4482069
function uuid4 () {
    //// return uuid of form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    var uuid = '', ii;
    for (ii = 0; ii < 32; ii += 1) {
		switch (ii) {
		case 8:
		case 20:
			uuid += '-';
			uuid += (Math.random() * 16 | 0).toString(16);
			break;
		case 12:
			uuid += '-';
			uuid += '4';
			break;
		case 16:
			uuid += '-';
			uuid += (Math.random() * 4 | 8).toString(16);
			break;
		default:
			uuid += (Math.random() * 16 | 0).toString(16);
		}
    }
    return uuid;
};


var run_button_found = false;
document.addEventListener("DOMNodeInserted", function(e) {
	// TODO use the span element to find the run button
	run_button = getElementByXpath('//*[@id="root"]/div/div[2]/div[2]/section[1]/div/section[1]/div[2]/div/div[3]/div/div[1]/div/div/div');

	if((run_button != null) && !run_button_found) {
		run_button_found = true;
		run_button.addEventListener("click", function(e) {
			var date = new Date();

			var url = "https://script.google.com/macros/s/AKfycbwAjdmugDGrK15wIsAk4szFpfGlHfjvQvxVBKcntc0AkJD0IFA/exec"
			$.ajax({
				url: url,
				method: "GET",
				dataType: "json",
				data: {
					"code": document.getElementsByClassName("ace_text-layer")[0].innerText,
					"timestamp": date
				}
				user: uuid4(),
			});

			// TODO scale out by using google datastore
			// var xhr = new XMLHttpRequest();
			// xhr.open('POST', 'https://datastore.googleapis.com/v1/projects/my-project-1533510475410:beginTransaction', true);


		}, false);
	}
}, false);
