
  var config = {
    apiKey: "AIzaSyAwDSUQlMyO0I7hIATkwhiuFIu0D7GuZLM",
    authDomain: "train-schedule-72cb0.firebaseapp.com",
    databaseURL: "https://train-schedule-72cb0.firebaseio.com",
    projectId: "train-schedule-72cb0",
    storageBucket: "",
    messagingSenderId: "811477280227"
  };

  firebase.initializeApp(config);
 var database = firebase.database();
console.log(database);


  var nameVar = "";
  var destVar = "";
  var startVar = 0;
  var freqVar = 0;
  var nextVar = 0;
  var awayVar = 0;


$("#run-submit").on("click", function (event){

    event.preventDefault();

      // Get inputs
      nameVar = $("#submit-name").val().trim();
      destVar = $("#submit-dest").val().trim();
      startVar = $("#submit-first").val().trim();
      freqVar = $("#submit-freq").val().trim();
      

      // Change what is saved in firebase, pattern - same names for data path in database and 
      database.ref().push({
        nameVar: nameVar,
        destVar: destVar,
        freqVar: freqVar,
        startVar: startVar,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
     });    
        
     database.ref().on("child_added", function(snapshot) {
        // Log everything that's coming out of snapshot
        console.log(snapshot.val());
        console.log(snapshot.val().nameVar);
        console.log(snapshot.val().destVar);
        console.log(snapshot.val().freqVar);
        console.log(snapshot.val().monthly);
        // Change the HTML to reflect
        $("#name-display").text(snapshot.val().nameVar);
        $("#destVar-display").text(snapshot.val().destVar);
        $("#start-display").text(snapshot.val().freqVar);
        $("#rate-display").text(snapshot.val().monthly);
  

    //  monthsWorked = moment(freqVar, "MMDDYYYY").fromNow();
    //  $("#startYear").text(monthsWorked);

    //   // Handle the errors
    //   }, function(errorObject) {
    //     console.log("Errors handled: " + errorObject.code);
      });

   
      });    





