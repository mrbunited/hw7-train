$(document).ready(function () {

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



    $("#run-submit").on("click", function (event) {

        event.preventDefault();

        // Get inputs
        nameVar = $("#submit-name").val().trim();
        destVar = $("#submit-dest").val().trim();
        startVar = $("#submit-first").val().trim();
        freqVar = $("#submit-freq").val().trim();
        var freqInt = parseInt(freqVar);

        var valid = (startVar.search(/^\d{2}\d{2}$/) != -1) &&
            (startVar.substr(0, 2) >= 0 && startVar.substr(0, 2) <= 24) &&
            (startVar.substr(3, 2) >= 0 && startVar.substr(3, 2) <= 59);
        console.log(valid);
        console.log(freqInt);
        if (valid == false || freqInt < 0 || freqVar.length <= 0) {
            alert("Wrong input");
        }
        else {
            // Change what is saved in firebase, pattern - same names for data path in database and 
            database.ref().push({
                nameVar: nameVar,
                destVar: destVar,
                freqVar: freqVar,
                startVar: startVar,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });
        }
    });

    database.ref().on("child_added", function (snapshot) {

        // moment.js calcualtions 
        var newFreqVar = (snapshot.val().freqVar);
        var firstTime = (snapshot.val().startVar);

        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
        var tRemainder = diffTime % newFreqVar;
        console.log(tRemainder);
        var awayVar = newFreqVar - tRemainder;
        console.log("MINUTES TILL TRAIN: " + awayVar);
        var nextVar = moment().add(awayVar, "minutes").format("HH:mm");
        console.log("ARRIVAL TIME: " + moment(nextVar));
        //   display in new row
        var nextRow = "<tr><td>" + (snapshot.val().nameVar) + "</td><td>" + (snapshot.val().destVar) + "</td><td>" + (snapshot.val().freqVar) + "</td><td>" + nextVar + "</td><td>" + awayVar + "</td></tr>";

        $("table tbody").prepend(nextRow);


        // add user input restriction on time format and strings
    });


    $('#clock').fitText(1.3);

    function update() {
        $('#clock').html(moment().format('MMMM Do YYYY, HH:mm:ss'));
    }

    setInterval(update, 1000);

});
