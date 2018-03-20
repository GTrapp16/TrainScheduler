// Initialize Firebase
var config = {
    apiKey: "AIzaSyAyPnGgnw_SyQkOYS4bBMKaucPNpSINs44",
    authDomain: "trainscheduler-c77fc.firebaseapp.com",
    databaseURL: "https://trainscheduler-c77fc.firebaseio.com",
    projectId: "trainscheduler-c77fc",
    storageBucket: "trainscheduler-c77fc.appspot.com",
    messagingSenderId: "126260373072"
};
firebase.initializeApp(config);


var database = firebase.database();

var name = "";
// setting up the input button 
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();
    var name = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var first = $("#first-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    //push to database
    database.ref().push({
        name: name,
        destination: destination,
        first: first,
        frequency: frequency,
        dataAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

database.ref().on("child_added", function(childSnapshot){
    var trainFrequncy=parseInt(childSnapshot).val().frequency;
    //first time
    var first=childSnapShot.val().first;
    var firstTime=moment(first, "hh:mm");
    console.log(firstTime);
    //current time
    var currentTime=moment();
    console.log("Current Time: " + moment(currentTime).format("hh:mm"));
    //time difference
    var timeDifference=moment().diff(moment(firstTime), "minutes");
    console.log("Time Difference: " + timeDifference); 
    //time apart
    var timeApart=timeDifference%trainFrequency;
    console.log(timeRemainder);
    //minutes until next train
    var minutesLeft=trainFrequency-timeApart;
    console.log("Minutes Until Train: " + minutesLeft, "minutes");
    //next train
    var nextTrain=moment().add(minutesLeft, "minutes");
    console.log("Arrival Time: "+ moment(nextTrain).format("hh:mm"));

    //appending items
    $("#train-table").append("<tr><th>" + childSnapshot.val().name +
    " </th><th> " + childSnapshot.val().destination +
    " </th><th> " + childSnapshot.val().frequency +
    " </th><th> " + moment(nextTrain).format("hh:mm") +
    " </th><th> " + minutesLeft + " </th><tr>");
    //fix errors
}, function(errorObject) {
    console.log("Errors Fixed: "+ errorObject.code);
});

 var trainFrequency= 3;
 //the time
 var firstT="03:00";
 //first time
 var firstTime=moment(firstT, currenTime).format("hh:mm");
 console.log(firstT);
 //current time
 var currentTime=moment();
 console.log("Current Time: " +moment(currentTime).format("hh:mm"));
//difference between times
var timeDifference=moment().diff(moment(firstT), "minutes");
console.log("Difference in Time: " + timeDifference);
//time remainder
var timeApart=timeDifference%trainFrequency;
console.log(timeApart);
//minutes until next train
var minutesLeft=trainFrequency-timeApart;
console.log("Minutes Until Train: "+minutesLeft);
//arrival time
var nextTrain=moment().add(minutesLeft, "minutes");
console.log("Arrival Time: "+ moment(nextTrain).format("hh:mm"));