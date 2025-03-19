const Schedule = require("../models/schedule");
const asyncHandler = require("express-async-handler")


exports.schedule_list = asyncHandler(async (req, res, next) => {

  // '_id' to sort as data already inserted sequentially (found this fact through testing!),
  // and _id shows this, so don't need to use 'super sorting' algorithms, just use _id
  let fullSchedule = await Schedule.find({}, "week dow topic").sort({"_id": 1}).exec();

  // Preprocess data before sending to pug file
  let final_schedule = [];
  let intermediate_object = {};
  let count = 0;
  for (let day of fullSchedule) {
    count++;
    day.dow = day.dow.charAt(0).toUpperCase() + day.dow.slice(1);
    if (count === 1){
      intermediate_object.day1 = day;
    }
    if (count === 2){
      intermediate_object.day2 = day;
    }
    if (count === 3){
      count = 0;
      intermediate_object.day3 = day;
      final_schedule.push(intermediate_object);
      intermediate_object = {};
    }
  }

  res.render("schedule", {"schedule": final_schedule});
});