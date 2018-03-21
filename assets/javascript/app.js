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

    //information to push to database
    database.ref().push({
        name: name,
        destination: destination,
        first: first,
        frequency: frequency,
        dataAdded: firebase.database.ServerValue.TIMESTAMP
    });
});
// main function
database.ref().on("child_added", function (childSnapshot) {
        var trainFrequncy = (childSnapshot).val().frequency;
        //first time
        var first = childSnapshot.val().first;
        var firstTime = moment(first, "hh:mm");
        console.log(firstTime);
        //current time
        var currentTime = moment();
        console.log("Current Time: " + moment(currentTime).format("hh:mm"));
        //time difference
        var timeDifference = moment().diff(moment(firstTime), "minutes");
        console.log("Time Difference: " + timeDifference);
        //time apart
        var timeApart = timeDifference % trainFrequency;
        console.log(timeApart);
        //minutes until next train
        var minutesLeft = trainFrequency - timeApart;
        console.log("Minutes Until Train: " + minutesLeft, "minutes");
        //next train
        var nextTrain = moment().add(minutesLeft, "minutes");
        console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));
var snapshot=childSnapshot.key
        //appending items
        $("#train-table").append("<tr><th>" + childSnapshot.val().name +
            " </th><th> " + childSnapshot.val().destination +
            " </th><th> " + childSnapshot.val().frequency +
            " </th><th> " + moment(nextTrain).format("hh:mm") +
            " </th><th> " + minutesLeft + "</th>" +
            " </th><th> " + '<button type="button" class="btn btn-danger btn-sm delete"></button>' + "</th></tr>");


            $(".delete").on("click", function () {

                database.ref().child(snapshot).remove();
          
              });
              $(".delete").on("click", function () {
          
                $(this).parent().prevAll().parent().remove();
          
              });
    },


    //fix errors
    function (errorObject) {
        console.log("Errors Fixed: " + errorObject.code);
    });

var trainFrequency = 12;
//the time
var firstT = "03:00";
//first time
var firstTime = moment(firstT, currentTime).format("hh:mm");
console.log(firstT);
//current time
var currentTime = moment();
console.log("Current Time: " + moment(currentTime).format("hh:mm"));
//difference between times
var timeDifference = moment().diff(moment(firstT), "minutes");
console.log("Difference in Time: " + timeDifference);
//time remainder
var timeApart = timeDifference % trainFrequency;
console.log(timeApart);
//minutes until next train
var minutesLeft = trainFrequency - timeApart;
console.log("Minutes Until Train: " + minutesLeft);
//arrival time
var nextTrain = moment().add(minutesLeft, "minutes");
console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));