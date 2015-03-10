var experimentData = {
	foo: "bar",
	blah: "blah"
}

function finishQuestionnaire() {
	// extract all questionnaire data into 

	var questionnaireData = {};

	// select the textareas, text inputs, and *checked* radio buttons
	// then add them to the questionnaireData
	$("#form textarea, #form input[type='text'], #form input[type='radio']:checked").each(function(i, x) { 
		questionnaireData[x.name] = $(x).val();
	})

	experimentData.questionnaire = questionnaireData

	turk.submit(experimentData)
}


//$("#form").validate({submitHandler: finishQuestionnaire});	

$("#form").validate({
	submitHandler: finishQuestionnaire,
	rules: {
		common: "required",
		age: "required",
		gender: "required",
		education: "required"
	},
	messages: {
		common: "Please tell us whether you thought the two parts had anything in common.",
		age: "Please enter your age.",
		gender: "Please enter your gender.",
		education: "Please enter your education."
	}
});