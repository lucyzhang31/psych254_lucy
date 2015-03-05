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
      {anagram: "praised"},
      {anagram: "tacker"},
      {anagram: "repartee"}, 
      {anagram: "flirting"}, 
      {anagram: "dispel"}, 
      {anagram: "treason"}, 
      {anagram: "imprints"}, 
      {anagram: "relatives"},
      {anagram: "present"}, 
      {anagram: "hustling"}, 
      {anagram: "articles"},
      {anagram: "tablet"}  ],

myAnagramOrder = shuffledArray(allAnagrams.length);

trialNumber = 0;
totalTrialNumber = allAnagrams.length;

//Creates the variable all anagram from which to draw anagrams for the second set
var allAnagrams2 = [
      {anagram: "trail"},
      {anagram: "strain"},
      {anagram: "verse"}, 
      {anagram: "backward"}, 
      {anagram: "refining"}, 
      {anagram: "covert"}, 
      {anagram: "silting"}, 
      {anagram: "relay"}, 
      {anagram: "wreathes"},
      {anagram: "proteins"},
      {anagram: "kitchen"},
      {anagram: "vowels"}]
      
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

// ## The main event to collect data then submit it to Mturk after pause
var experiment = {
  data: [],
  end: function() {
    showSlide("finished");
    setTimeout(function() { turk.submit(experiment) }, 1500);
  },

//Show instructions slide after click
  eligibility: function() {
    showSlide("eligibility");   
  },

//Show instructions slide after click
  instructions: function() {
    // select the checked ethnicity radio button and see if it's value is 3
    // (which corresponds to East Asian)

    var ethnicity = $("[name='Ethnicity']:checked").val();
    var age = $("[name='Age']:checked").val();
    var gender = $("[name='Gender']:checked").val();
    var education = $("[name='Education']:checked").val();
    var employment = $("[name='Employment']:checked").val();

    var properEthnicity = (ethnicity == "EastAsian");
    var properAge = (age == "18to25");

    if(properEthnicity && properAge) {
      showSlide("instructions");      
     } else {
       showSlide("ineligible");      
     };
    experiment.data.push({
      "conditionSelf": conditionSelf, 
      "Ethnicity": ethnicity, 
      "Age": age,
      "Gender": gender,
      "Education": education,
      "Employment": employment
  }); 
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
          "anagramAnswer": $('#anagramAnswer').val(),
          "reactionTime": endTime - startTime
        });
        $('#anagramAnswer').val('');
    }
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

//Shows self condition if random number is 1, mother condition if zero
  condition: function() {
    if(conditionSelf==1) {
      showSlide("self");      
    } else {
      showSlide("mother");      
    }
        var perform1 = $("[name='Perform1']:checked").val();
        var feel1 = $("[name='Feel1']:checked").val();
        var guessanagram1 = $('#guessanagram1').val();

        experiment.data.push({
          "Perform1": perform1,
          "Feel1": feel1,
          "guessanagram1": guessanagram1});

  },

//Show demographics slide on click
   demographics: function() {
        var perform2 = $("[name='Perform2']:checked").val();
        var feel2 = $("[name='Feel2']:checked").val();
        var guessanagram2 = $('#guessanagram2').val();

    showSlide("demographics");   
    experiment.data.push({
          "Perform2": perform2,
          "Feel2": feel2,
          "guessanagram2": guessanagram2}); 
  },  
  
//show instructions on click
instructions2: function() {
    var motherinitials = $('#motherinitials').val();
    var motherconditionresponse = $('#motherconditionresponse').val();
    var selfintials = $('#selfintials').val();
    var selfconditionresponse = $('#selfconditionresponse').val();

  experiment.data.push({
          "motherinitials": motherinitials,
          "motherconditionresponse": motherconditionresponse,
          "selfintials": selfintials,
          "selfconditionresponse": selfconditionresponse
        });
    showSlide("instructions2");
  },  

//Call finished function to record data on MTurk
finished: function() {
          var guessanagram1 = $('#guessanagram1').val();

   var CityBorn = $('#CityBorn').val();
   var StateBorn = $('#StateBorn').val();
   var CountryBorn = $('#CountryBorn').val();
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

   experiment.data.push({
          "CityBorn": CityBorn,
          "StateBorn": StateBorn,
          "CountryBorn": CountryBorn,
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
          "Difficult": Difficult
        }); 

    experiment.end();
  },  

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
          "anagramText2": n.anagram,
          "anagramAnswer2": $('#anagramAnswer2').val(),
          "reactionTime2": endTime2 - startTime2
        });
        $('#anagramAnswer2').val('');
    }
    if(trialNumber2 == totalTrialNumber2 ) {
    experiment.callTimeout2 ();
    } else {
    n = allAnagrams2[myAnagramOrder2[trialNumber2]];
    showSlide("stage2");
    $("#anagrams2").text(n.anagram);
    startTime2 = (new Date()).getTime();
    trialNumber2 = trialNumber2+1;
    } 
  },


//Show the check 2 slide after the second trial, push data, create variables

  check2: function() {
    showSlide("check2");    
  },

// //Craete a variable to check if the participant is actively participating
// var isActive = true;

// //Create a function to populate the "isactive" variable
// function checkIt(){
//   nCheck = 1
//   var myTimer = setInterval(function(){ 
//         if(instructionPart != "questions") { // if you're not at questions yet...
//           experiment.recordWindow("windowCheck_" + nCheck);

//           window.onfocus = function () { 
//             isActive = true; 
//           }; 

//           window.onblur = function () { 
//             isActive = false; 
//           }; 

//         } else {
//           clearInterval(myTimer);
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

