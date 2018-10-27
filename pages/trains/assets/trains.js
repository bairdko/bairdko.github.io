// Initialize Firebase
var config = {
  apiKey: "AIzaSyAkvoORBmzagEAOK_ALY0SLLMJ2zbjtqNU",
  authDomain: "train-scheduler-a8238.firebaseapp.com",
  databaseURL: "https://train-scheduler-a8238.firebaseio.com",
  projectId: "train-scheduler-a8238",
  storageBucket: "",
  messagingSenderId: "755127765097"
};
firebase.initializeApp(config);

var database = firebase.database();

//add values to firebase on click

$('#add-train').on('click',function(event){
  event.preventDefault();

  //capture values
  var trainName = $("#name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var startTime = $("#start-input").val();
  var frequency = $("#frequency-input").val();

  //store in Firebase
  database.ref().push({
    trainName: trainName,
    destination: destination,
    startTime: startTime,
    frequency: frequency
  });

});
//create tables 

  
database.ref().on("child_added", function (snapshot) {
  var tableItem = $("<tr>");
  var row = $("<td>");

  var sTime = snapshot.val().startTime;
  var freq = snapshot.val().frequency;

  //convert to hh:mm A
  var sTime = moment(sTime,'HH:mm').format('hh:mm A');

  //create Next Arrvival 

  var nextArrival = moment(sTime, 'hh:mm A').add(parseInt(freq),'minutes');
  var now = moment();

  // if positive, first arrive is before current time
  // if negative, first arrive is next train

  var timeDiff = now.diff(nextArrival,'minutes');

  do {
    nextArrival = moment(nextArrival, 'hh:mm A').add(parseInt(freq),'minutes');
    timeDiff = now.diff(nextArrival,'minutes');

    console.log(nextArrival);
    console.log(freq);
  } while (timeDiff > 0);

  //create minutes away
  var minutesAway = moment().diff(nextArrival,'minutes');
  console.log(minutesAway);

  //create rows

  row = $("<td>" + snapshot.val().trainName + "</td>");
  tableItem.append(row);

  row = $("<td>" + snapshot.val().destination + "</td>");
  tableItem.append(row);

  row = $("<td>" + snapshot.val().frequency + " min"+ "</td>");
  tableItem.append(row);

  row = $("<td>" + nextArrival.format('hh:mm A') + "</td>");
  tableItem.append(row);

  row = $("<td>" + Math.abs(minutesAway) + "min" + "</td>");
  tableItem.append(row);

  $('#dataRow').append(tableItem);

},  function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});