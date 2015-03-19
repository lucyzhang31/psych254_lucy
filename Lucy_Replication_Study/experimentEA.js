// Show the introduction slide -- this is what we want subjects to see first.
showSlide("introduction");

//Slide show to hide all slides and show the ones we want
function showSlide(id) {
	$(".slide").hide();
	$("#"+id).show();
}

//Desmond sent this syntax to shuffle the array and present a random anagram
function shuffledArray(arrLength)
{
 var j, tmp;
 var arr = new Array(arrLength);
 for (i = 0; i < arrLength; i++)
 {
   arr[i] = i;
 }
 for (i = 0; i < arrLength-1; i++)
 {
   j = Math.floor((Math.random() * (arrLength - 1 - i)) + 0.99) + i;
   tmp = arr[i];
   arr[i] = arr[j];
   arr[j] = tmp;
 }
 return arr;
}

//Creates the variable all anagram from which to draw anagrams for the first set
var allAnagrams = [
      {anagram: "praised", solution: "diapers", difficulty: "easy"},
      {anagram: "tacker", solution: "racket", difficulty: "easy"},
      {anagram: "repartee", solution: "repeater", difficulty: "easy"}, 
      {anagram: "flirting", solution: "trifling", difficulty: "hard"}, 
      {anagram: "dispel", solution: "lisped", difficulty: "hard"}, 
      {anagram: "treason", solution: "senator", difficulty: "hard"}, 
      {anagram: "imprints", solution: "misprint", difficulty: "easy"}, 
      {anagram: "relatives", solution: "versatile", difficulty: "easy"},
      {anagram: "present", solution: "serpent", difficulty: "hard"}, 
      {anagram: "hustling", solution: "sunlight", difficulty: "hard"}, 
      {anagram: "articles", solution: "recitals", difficulty: "hard"},
      {anagram: "tablet", solution: "battle", difficulty: "easy"}  ],

myAnagramOrder = shuffledArray(allAnagrams.length);

trialNumber = 0;
totalTrialNumber = allAnagrams.length;

//Creates the variable all anagram from which to draw anagrams for the second set
var allAnagrams2 = [
      {anagram2: "trail", solution2: "trial", difficulty2: "easy"},
      {anagram2: "strain", solution2: "trains", difficulty2: "easy"},
      {anagram2: "verse", solution2: "serve", difficulty2: "easy"}, 
      {anagram2: "backward", solution2: "drawback", difficulty2: "hard"}, 
      {anagram2: "refining", solution2: "infringe", difficulty2: "hard"}, 
      {anagram2: "covert", solution2: "vector", difficulty2: "easy"}, 
      {anagram2: "silting", solution2: "listing", difficulty2: "easy"}, 
      {anagram2: "relay", solution2: "early", difficulty2: "easy"}, 
      {anagram2: "wreathes", solution2: "weathers", difficulty2: "easy"},
      {anagram2: "proteins", solution2: "pointers", difficulty2: "hard"},
      {anagram2: "kitchen", solution2: "thicken", difficulty2: "hard"},
      {anagram2: "vowels", solution2: "wolves", difficulty2: "hard"}]
      
myAnagramOrder2 = shuffledArray(allAnagrams2.length);

trialNumber2 = 0;
totalTrialNumber2 = allAnagrams2.length;

//Select a random number between 0 and 1 (1=self, 0=mother)
conditionSelf = Math.round(Math.random());

var n;
var timeLeft, myInterval;
var timeLeft2, myInterval2;
var startTime, endTime;
var startTime2, endTime2;
var myCounter, myCounter2
var counter1, counter2;

var prescreenHandler = function() {
  var ethnicity  = $("[name='ethnicity']:checked").val();
  var age        = $("[name='age']:checked").val();
  var gender     = $("[name='gender']:checked").val();
  var education  = $("[name='education']:checked").val();
  var employment = $("[name='employment']:checked").val();
  
  var properEthnicity = (ethnicity == "White");
  var properAge = (age == "18to25");
  
  if(properEthnicity && properAge) {
    showSlide("eligible");      
  } else {
    showSlide("ineligible");      
  };
  
  experiment.data.push({
    "conditionSelf": conditionSelf, 
    "ethnicity": ethnicity, 
    "age": age,
    "gender": gender,
    "education": education,
    "employment": employment
  });
}

// set up form validation for prescreen survey
$("#prescreendemoForm").validate({
  submitHandler: prescreenHandler,
  rules: {
    age: "required",
    ethnicity: "required",
    gender: "required",
    employment: "required",
    education: "required"
  },
  messages: {
    age: "Required",
    ethnicity: "Required",
    gender: "Required",
    education: "Required",
    employment: "Required"
  }
});

var demoHandler = function() {
   var born = $('#born').val();
   var AgeLiveUS = $('#AgeLiveUS').val();
   var OtherLanguageSpoken = $('#OtherLanguageSpoken').val();
   var MotherBorn = $('#MotherBorn').val();
   var FatherBorn = $('#FatherBorn').val();
   var MotherEthnicity = $("[name='MotherEthnicity']:checked").val();
   var FatherEthnicity = $("[name='FatherEthnicity']:checked").val();
   var MotherEducation = $("[name='MotherEducation']:checked").val();
   var FatherEducation = $("[name='FatherEducation']:checked").val();
   var MotherLive = $("[name='MotherLive']:checked").val();
   var FatherLive = $("[name='FatherLive']:checked").val();
   var SES = $("[name='SES']:checked").val();
   var Income = $("[name='Income']:checked").val();
   var StudyAbout = $('#StudyAbout').val();
   var Suspicious = $('#Suspicious').val();
   var Difficult = $('#Difficult').val();
   var readinstructions = $("[name='readinstructions']:checked").val();
   var outsidesources = $("[name='outsidesources']:checked").val();
 
 experiment.end();

   experiment.data.push({
          "born": born,
          "AgeLiveUS": AgeLiveUS,
          "OtherLanguageSpoken": OtherLanguageSpoken,
          "MotherBorn": MotherBorn,
          "FatherBorn": FatherBorn,
          "MotherEthnicity": MotherEthnicity,
          "FatherEthnicity": FatherEthnicity,
          "MotherEducation": MotherEducation,
          "FatherEducation": FatherEducation,
          "MotherLive": MotherLive,
          "FatherLive": FatherLive,
          "SES": SES,
          "Income": Income,
          "StudyAbout": StudyAbout,
          "Suspicious": Suspicious,
          "Difficult": Difficult,
          "readinstructions": readinstructions,
          "outsidesources": outsidesources,
});
}

// set up form validation for prescreen survey
$("#demos").validate({
  submitHandler: demoHandler,
  rules: {
    born: "required",
    MotherBorn: "required",
    FatherBorn: "required",
    MotherEthnicity: "required",
    FatherEthnicity: "required",
    MotherEducation: "required",
    FatherEducation: "required",
    MotherLive: "required",
    FatherLive: "required",
    SES: "required",
    Income: "required",
  },
  messages: {
    born: "Required",
    MotherBorn: "Required",
    FatherBorn: "Required",
    MotherEthnicity: "Required",
    FatherEthnicity: "Required",
    MotherEducation: "Required",
    FatherEducation: "Required",
    MotherLive: "Required",
    FatherLive: "Required",
    SES: "Required",
    Income: "Required"
  }
});

var check1 = function() {
  var Perform1     = $("[name='Perform1']:checked").val();
  var Feel1  = $("[name='Feel1']:checked").val();
  var guessanagram1 = $('#guessanagram1').val();

    if(conditionSelf==1) {
      showSlide("self");      
    } else {
      showSlide("mother");      
    };
        experiment.data.push({
          "Perform1": Perform1,
          "Feel1": Feel1,
          "guessanagram1": guessanagram1
    });
}
// set up form validation for check1

$("#check1").validate({
  submitHandler: check1,
  rules: {
    Perform1: "required",
    Feel1: "required",
    guessanagram1: "required"
  },
  messages: {
    Perform1: "Required",
    Feel1: "Required",
    guessanagram1: "Required"
  },
});

var check2 = function() {
  var Perform2     = $("[name='Perform2']:checked").val();
  var Feel2  = $("[name='Feel2']:checked").val();
  var guessanagram2 = $('#guessanagram2').val();

    if(conditionSelf==1) {
      showSlide("demographics");      
    } else {
      showSlide("demographics");      
    };
        experiment.data.push({
          "Perform2": Perform2,
          "Feel2": Feel2,
          "guessanagram2": guessanagram2
    });
}
// set up form validation for check2

$("#check2form").validate({
  submitHandler: check2,
  rules: {
    Perform2: "required",
    Feel2: "required",
    Guessanagram2: "required"
  },
  messages: {
    Perform2: "Required",
    Feel2: "Required",
    Guessanagram2: "Required"
  }
});


var self = function() {
  var SelfInitials     = $('#SelfInitials').val();
  var SelfDescription  = $('#SelfDescription').val();

    if(conditionSelf==1) {
      showSlide("instructions2");      
    } else {
      showSlide("instructions2");      
    };
        experiment.data.push({
          "SelfInitials": SelfInitials,
          "SelfDescription": SelfDescription,
    });
}
// set up form validation for check1

$("#selfform").validate({
  submitHandler: self,
  rules: {
    SelfInitials: "required",
    SelfDescription: "required",
  },
  messages: {
    SelfInitials: "Required",
    SelfDescription: "Please write at least 2 sentences.",
  },
});


var mother = function() {
  var MotherInitials     = $('#MotherInitials').val();
  var MotherDescription  = $('#MotherDescription').val();

    if(conditionSelf==1) {
      showSlide("instructions2");      
    } else {
      showSlide("instructions2");      
    };
        experiment.data.push({
          "MotherInitials": MotherInitials,
          "MotherDescription": MotherDescription,
    });
}
// set up form validation for check1

$("#motherform").validate({
  submitHandler: mother,
  rules: {
    MotherInitials: "required",
    MotherDescription: "required",
  },
  messages: {
    MotherInitials: "Required",
    MotherDescription: "Please write at least 2 sentences.",
  },
});

// ## The main event to collect data then submit it to Mturk after pause
var experiment = {
  data: [],
  end: function() {
  var ethnicity  = $("[name='ethnicity']:checked").val();
  var age        = $("[name='age']:checked").val();
  
  var properEthnicity = (ethnicity == "White");
  var properAge = (age == "18to25");
  

  if(properEthnicity && properAge) {
    showSlide("finished");      
  } else {
    showSlide("finishedineligible");      
  };
    setTimeout(function() { turk.submit(experiment) }, 1500);
  },

//Show instructions slide after click
  eligible: function() {
    showSlide("instructions");   
  },

//Show instructions slide after click
  prescreen: function() {
    showSlide("prescreen");   
  },

//Show pause slide after click then failure feedback 
  callTimeout: function() {
    experiment.data.push({"timeLeft": timeLeft})
    showSlide("pause");
    setTimeout(function(){showSlide("failurefeedback")}, 5000);
    clearInterval(myInterval);
  },

//Have timer for the first set of anagrams
  startTimer: function() {
    timeLeft = 300
    myCounter = setInterval(function() {
      $('#counter1').html(trialNumber-1);
    }, 10);    
    myInterval = setInterval(function() {
      $('#logout-timer').html(timeLeft);
      timeLeft = timeLeft-1;
      if(timeLeft<0) {
        experiment.callTimeout();
      }
    }, 1000);
  },
  
  // Anagrams part 1: what to do on every trial.
  next: function() {
    if(trialNumber>0) {
        endTime = (new Date()).getTime();
        experiment.data.push({
          "trialNumber": trialNumber,
          "anagramText": n.anagram,
          "anagramsolution": n.solution,
          "anagramdifficulty": n.difficulty,
          "anagramAnswer": $('#anagramAnswer').val(),
          "correct": ($('#anagramAnswer').val().trim() == n.solution),
          "notes": $('#notes').val(),
          "reactionTime": endTime - startTime
        });
    }
    $('#anagramAnswer').val('');
    $('#notes').val('');
    if(trialNumber == totalTrialNumber ) {
      experiment.callTimeout();
    } else {
    n = allAnagrams[myAnagramOrder[trialNumber]];
    showSlide("stage");
    $("#anagrams").text(n.anagram);
    startTime = (new Date()).getTime();
    trialNumber = trialNumber+1;
    } 
  },

//Show the check slide after the failure feedback slide, push data, create variables

  afterFeedback: function() {
    showSlide("check");   

  },


  //  demographics: function() {
  //       var perform2 = $("[name='Perform2']:checked").val();
  //       var feel2 = $("[name='Feel2']:checked").val();
  //       var guessanagram2 = $('#guessanagram2').val();

  //   showSlide("demographics");   
  //   experiment.data.push({
  //         "Perform2": perform2,
  //         "Feel2": feel2,
  //         "guessanagram2": guessanagram2}); 
  // },  
  
//show instructions on click
// instructions2: function() {
//     var MotherInitials = $('#MotherInitials').val();
//     var MotherDescription = $('#MotherDescription').val();
//     var SelfInitials = $('#SelfInitials').val();
//     var SelfDescription = $('#SelfDescription').val();

//   experiment.data.push({
//           "MotherInitials": MotherInitials,
//           "MotherDescription": MotherDescription,
//           "SelfInitials": SelfInitials,
//           "SelfDescription": SelfDescription
//         });
//     showSlide("instructions2");
//   },  

//This is the timeout after the second set
callTimeout2: function() {
    experiment.data.push({"timeLeft2": timeLeft2})
    showSlide("check2");
    clearInterval(myInterval2)
  },

//SEcond part timer 
  startTimer2: function() {
    timeLeft2 = 300
    myCounter2 = setInterval(function() {
      $('#counter2').html(trialNumber2-1);
    }, 10);   
    myInterval2 = setInterval(function() {
      $('#logout-timer2').html(timeLeft2);
      timeLeft2 = timeLeft2-1;
      if(timeLeft2<0) {
        experiment.callTimeout2();
      }
    }, 1000);
  },

//For the second set, function for anagrams
  next2: function() {

    if(trialNumber2>0) {
        endTime2 = (new Date()).getTime();
        experiment.data.push({
          "trialNumber2": trialNumber2,
          "anagramText2": n.anagram2,
          "anagramsolution2": n.solution2,
          "anagramdifficulty2": n.difficulty2,
          "anagramAnswer2": $('#anagramAnswer2').val(),
          "correct": ($('#anagramAnswer2').val().trim() == n.solution2),          
          "notes2": $('#notes2').val(),
          "reactionTime2": endTime2 - startTime2
        });
    }
    $('#anagramAnswer2').val('');
    $('#notes2').val('');
    if(trialNumber2 == totalTrialNumber2 ) {
    experiment.callTimeout2 ();
    } else {
    n = allAnagrams2[myAnagramOrder2[trialNumber2]];
    showSlide("stage2");
    $("#anagrams2").text(n.anagram2);
    startTime2 = (new Date()).getTime();
    trialNumber2 = trialNumber2+1;
    } 
  },

// //Show the check 2 slide after the second trial

  check2: function() {
    showSlide("check2");    
  },

//Check answers from anagrams
// checkanagrams: function () {
//     var part1numbercorrect 

//     = parseInt((document.getElementById("num1")), 10);
//     var num2 = parseInt((document.getElementById("num2")), 10);
//     ans = document.forms.problem.answer;
//     ans.value = num1 + num2;
//     if (ans == correct) {
//         alert("woot");
//     } else {
//         alert("nope");
//     }
// }

// //Craete a variable to check if the participant is actively participating
// 
// var isActive1 = true;
    
// //Create a function to populate the "isactive" variable
// function checkIt(){
//   nCheck = 1
//   var myTimercheck = setInterval(function(){ 
//         if(showSlide != "demographics") { // if you're not at questions yet...
//           experiment.recordWindow("windowCheck_" + nCheck);

//           window.onfocus = function () { 
//             isActive = true; 
//           }; 

//           window.onblur = function () { 
//             isActive = false; 
//           }; 

//         } else {
//           clearInterval(myTimercheck);
//         }
//         console.log(isActive);
//         nCheck ++;
//   }, 10000);
// },

// //Reccord the data from the attentio
// recordWindow: function(name) {
//     var windowHeight = $(window).height();
//     var windowWidth = $(window).width();
//     data = {
//       question: name,
//       answer: windowHeight + " by " + windowWidth + "; active=" + isActive
//     };
//     experiment.allData.push(data);
//   },

}

