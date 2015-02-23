
// Shows slides. We're using jQuery here - the **$** is the jQuery selector function, which takes as input either a DOM element or a CSS selector string.
function showSlide(id) {
  // Hide all slides
	$(".slide").hide();
	// Show just the slide we want to show
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

// Get a random integer less than n.
// function randomInteger(n) {
//   return Math.floor(Math.random()*n);
// }

// // Get a random element from an array (e.g., <code>random_element([4,8,7])</code> could return 4, 8, or 7). This is useful for condition randomization.
// function random_anagram(array) {
//   return array[randomInteger(array.length)];
// }

// ## Configuration settings
// var allKeyBindings = [
//       {"p": "odd", "q": "even"},
//       {"p": "even", "q": "odd"} ],
//     allTrialOrders = [
//       [1,3,2,5,4,9,8,7,6],
//       [8,4,3,7,5,6,2,1,9] ],
//     myKeyBindings = randomElement(allKeyBindings),
//     myTrialOrder = randomElement(allTrialOrders),
//     pOdd = (myKeyBindings["p"] == "odd");

//Creates the variable all anagram from which to draw anagrams
var allAnagrams = [
      {anagram: "Near Giant"},
      {anagram: "Admirer"},
      {anagram: "Dormitory"}, 
      {anagram: "Strange Kiwi"}, 
      {anagram: "Roam China"}, 
      {anagram: "Sumo Iris"}, 
      {anagram: "Cop Outs"}, 
      {anagram: "One Tunic"},
      {anagram: "Order Pig"}, 
      {anagram: "Swear Oft"} ],

myAnagramOrder = shuffledArray(allAnagrams.length);

trialNumber = 0;
totalTrialNumber = allAnagrams.length;

//Creates the variable all anagram from which to draw anagrams
var allAnagrams2 = [
      {anagram: "Balk Tables"},
      {anagram: "A Tropic"},
      {anagram: "Venus Ire"}, 
      {anagram: "Grab Wind Soon"}, 
      {anagram: "Emanate"}, 
      {anagram: "Radio Set"}, 
      {anagram: "Remote"}, 
      {anagram: "A Motto"}, 
      {anagram: "Dictionary"},
      {anagram: "Rich Eat OK"},
      {anagram: "Is Alone"},
      {anagram: "Latest Lie"},
      {anagram: "Bagel Deal"},
      {anagram: "War Pros"},
      {anagram: "Paroled"}, 
      {anagram: "In Nets"},
      {anagram: "Roman Hat"},
      {anagram: "Regal"},
      {anagram: "Car Dust"},
      {anagram: "Awful Recoil"},          
      {anagram: "Ring Late"} ],

myAnagramOrder2 = shuffledArray(allAnagrams2.length);

trialNumber2 = 0;
totalTrialNumber2 = allAnagrams2.length;

// Show the introduction slide -- this is what we want subjects to see first.
showSlide("introduction");




var timeLeft, myInterval;

// ## The main event
// I implement the sequence as an object with properties and methods. The benefit of encapsulating everything in an object is that it's conceptually coherent (i.e. the <code>data</code> variable belongs to this particular sequence and not any other) and allows you to **compose** sequences to build more complicated experiments. For instance, if you wanted an experiment with, say, a survey, a reaction time test, and a memory test presented in a number of different orders, you could easily do so by creating three separate sequences and dynamically setting the <code>end()</code> function for each sequence so that it points to the next. **More practically, you should stick everything in an object and submit that whole object so that you don't lose data (e.g. randomization parameters, what condition the subject is in, etc). Don't worry about the fact that some of the object properties are functions -- mmturkey (the Turk submission library) will strip these out.**

var experiment = {
  // Parameters for this sequence.
  //trials: myTrialOrder,
  // fix this
  // Experiment-specific parameters - which keys map to odd/even
  //keyBindings: myKeyBindings,
  // An array to store the data that we're collecting.
  data: [],
  // The function that gets called when the sequence is finished.
  end: function() {
    // Show the finish slide.
    showSlide("finished");
    // // Wait 1.5 seconds and then submit the whole experiment object to Mechanical Turk (mmturkey filters out the functions so we know we're just submitting properties [i.e. data])
    setTimeout(function() { turk.submit(experiment) }, 1500);
  },

  instructions: function() {
    showSlide("instructions");    
  },

  startTimer: function() {
    timeLeft = 300
    myInterval = setInterval(function() {
      $('#logout-timer').html(timeLeft);
      timeLeft = timeLeft-1;
    }, 1000);

    
    setTimeout(function(){
      if(timeLeft<0) {
        showSlide("pause");
        setTimeout(function(){showSlide("failurefeedback")}, 5000);
      }
      clearInterval(myInterval);
    }, 300000);
    //setTimeout(function(){showSlide("failurefeedback")}, X+5000);
  },
  
  // The work horse of the sequence - what to do on every trial.
  next: function() {
    // If the number of remaining trials is 0, we're done, so call the end function.
    //if (experiment.trials.length == 0) {
    if(trialNumber == totalTrialNumber ) {
      clearInterval(myInterval);
      showSlide("pause")
      setTimeout(function(){showSlide("failurefeedback")}, 5000);
    } else {
    
    // Get the current trial - <code>shift()</code> removes the first element of the array and returns it.
    //var n = myAnagramOrder.shift();
    var n = allAnagrams[myAnagramOrder[trialNumber]];
    
    showSlide("stage");
    // Display the number stimulus.
    $("#anagrams").text(n.anagram);

    
    // Get the current time so we can compute reaction time later.
    var startTime = (new Date()).getTime();
    
    trialNumber = trialNumber+1;
    } 
  },

//condition: function() {
  //condition = Math.round(Math.random()) 
  //if (condition == 0) { your mother } else { yourself }
    //  },

  afterFeedback: function() {
    showSlide("check");    
  },

    condition: function() {
    showSlide("condition");    
  },

   demographics: function() {
    showSlide("demographics");    
  },  
  
instructions2: function() {
    showSlide("instructions2");    
  },  

finished: function() {
    showSlide("finished");    
  },  

// //Timer--NEED HELP MAKING THIS TIMER WORK
//   var timer = document.getElementById("logout-timer")
//     , now = new Date()
//     , deadline = new Date(now.getFullYear, now.getMonth, now.getDate, now.getHours, now.getMinutes + 5);
 
//   timer.innerHTML = countdown(deadline).toString();
//   setInterval(function(){
//     timer.innerHTML = countdown(deadline ).toString();
//   }, 1000);

  next2: function() {
    // If the number of remaining trials is 0, we're done, so call the end function.
    //if (experiment.trials.length == 0) {
    if(trialNumber2 == totalTrialNumber2 ) {
      experiment.end();
    } else {
    
    // Get the current trial - <code>shift()</code> removes the first element of the array and returns it.
    //var n = myAnagramOrder.shift();
    var n = allAnagrams2[myAnagramOrder2[trialNumber2]];
    
    showSlide("stage2");
    // Display the number stimulus.
    $("#anagrams2").text(n.anagram);
    
    // Get the current time so we can compute reaction time later.
    var startTime2 = (new Date()).getTime();
    
    trialNumber2 = trialNumber2+1;
    }
  }

}

