/**
 * Controller for Stats
 * @author Chew Xin Ning 32693974 <xche0235@student.monash.edu>
 * @author De Zheng Chang 32939965 <dcha0082@student.monash.edu>
 */

/**
 * Event schema
 * @const 
 */
const Event = require("../models/event");
/**
 * Category schema
 * @const 
 */
const Category = require("../models/category");
/**
 * Operation schema
 * @const 
 */
const Operation = require("../models/operations");

/**
 * Stats controller
 */
module.exports = {
    /**
     * Counts the number of events in the database and saves the count in the database
     *
     * @function
     * @async
     */
    eventCount: async function(){
        const eventCount = await Event.countDocuments();
        const operation = await Operation.findOne();
        operation.eventsCount = eventCount;
        await operation.save();
    },
    /**
     * Counts the number of categories in the database and saves the count in the database
     *
     * @function
     * @async
     */
    categoryCount: async function(){
        const categoryCount = await Category.countDocuments();
        const operation = await Operation.findOne();
        operation.categoriesCount = categoryCount;
        await operation.save();
    },
    /**
     * Counts the number of records created and saves it in the database
     *
     * @function
     * @async
     */
    recordsCreated: async function(){
        const operation = await Operation.findOne();
        operation.createdCount += 1;
        await operation.save();
    },
    /**
     * Counts the number of delete actions and saves it in the database
     *
     * @function
     * @async
     */
    recordsDeleted: async function(){
        const operation = await Operation.findOne();
        operation.deletedCount += 1;
        await operation.save();
    },
    /**
     * Counts the number of update actions and saves it in the database
     *
     * @function
     * @async
     */
    recordsUpdated: async function(){
        const operation = await Operation.findOne();
        operation.updatedCount += 1;
        await operation.save();
    },
    /**
     * Retrieves the data stored in the database
     *
     * @function
     * @async
     */
    getStatistics: async function(req,res){
        try{
            let stats = await Operation.find();
            res.status(200).json(stats);
        } catch(err){
            res.status(404).json({"error": err.message});
        }
    }
}