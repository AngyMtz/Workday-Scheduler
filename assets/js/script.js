var currentDate = moment();                                     //Variable to hold the current day
$("#currentDay").text(currentDate.format("dddd, MMMM Do"));     //Display the current day in the proper format


function TimeOfDay() {
    var currentTime = moment().hour();                          //Variable to hold the current time.  Used to compare the description area time with the current time
    
    //Function that goes through each time-blocks
    $(".time-block").each(function() {
        
        //Splits the hour# ID into the just number and takes that string number and turns it into an integer
        var blockTime = parseInt($(this).attr("id").split("hour")[1]);

        //Check to see if we are in a past, present or future Time Block and color it accordingly
        if (blockTime < currentTime) {
            $(this).addClass("past");
        }
        else if (blockTime === currentTime) {
            $(this).addClass("present");
        }
        else {
            $(this).addClass("future");
        }
    })
}

TimeOfDay();                                                    //Run the function

setInterval(TimeOfDay, 5000);                                   //Test for time of day every 5 seconds

//Save whatever text is in the TextArea/Description Box
$(".saveBtn").on("click", function () {
    
    var text = $(this).siblings(".description").val();          //Variable to hold what's in the Text Area/Description Box
    var time = $(this).parent().attr("id");                     //Variable to hold which Time ID has the information from the Text Area/Description Box

    localStorage.setItem(time, text);                           //Put the Time ID and text into local storage.
})

//Iterate through each Description Box in local storage.  If the page is refreshed after saving, the info is still there
$(".description").each(function() {
    var getTime = $(this).parent().attr("id");                  //Variable to hold the Time ID
    $(this).val(localStorage.getItem(getTime));                 //Use the Time ID to display whatever information is in that time slot
})