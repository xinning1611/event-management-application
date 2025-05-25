/**
 * Schema for Event. 
 * @author De Zheng Chang 32939965 <dcha0082@student.monash.edu>
 */

/**
 * mongoose module 
 * @const 
 */
const mongoose = require('mongoose');

/**
 * Event schema 
 * @const 
 * @type {mongoose.Schema}
 */
const eventSchema = mongoose.Schema({
    eventId:{
        type: String,
        default: function(){
            return generateEventId()
        },
        required: false,
    },
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        default: function(){
            return ("")
        }
    },
    startDateTime:{
        type: Date,
        required: true,
    },
    durationInMinutes:{
        type: Number,
        required: true,
    },
    endDateTime:{
        type: Date,
        default: function(){
            return calculateEndTime(this.startDateTime, this.durationInMinutes)
        },
    },
    active:{
        type: Boolean,
        default: function(){
            return true
        }
    },
    image:{
        type: String,
        default: "private-event.png",
    },
    capacity:{
        type: Number,
        default: 1000,
        validate: {
            validator: function(value){
                return value >= 10 && value <=2000;
            }
        },
    },
    ticketsAvailable:{
        type: Number,
        default: function(){
            return this.capacity;
        },
    },
    categoryList: 
    [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required: true,
    }],
}); 

/**
 * Function to generate random Event ID. 
 * @function 
 * @returns Random Event ID. 
 */
function generateEventId(){
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    let length = 2;
    for (let i = 0; i < length; i++){
        result += chars.charAt(Math.floor(Math.random() * chars.length)); 
    }
    let eventId = "E" + result + "-" + Math.round((Math.random() * (9999 - 1000) + 1000));
    return eventId;
}

/**
 * Function to calculate the end time of the event. 
 * @function 
 * @returns The end time string format. 
 */
function calculateEndTime(startDateTime, durationInMinutes){
    const startTime = new Date(startDateTime);
    // Convert duration to milliseconds to add to time
    const endTime = new Date(startTime.getTime() + durationInMinutes * 60000);
    return endTime;
}

/**
 * Export Event schema 
 * @const 
 */
module.exports = mongoose.model("Event", eventSchema); 