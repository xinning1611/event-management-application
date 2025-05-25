/**
 * API Controller for Event (Assignment 2)
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
 * Operation Controller 
 * @const 
 */
const OperationCont = require("./stats");

/**
 * Operations of the Event schema 
 */
module.exports = {
    /**
     * Insert a new event into collection. Endpoint respond with the event ID of the newly added event in JSON object. 
     * @function
     * @async
     * @param {Object} req - The HTTP request object.
     * @param {Object} res - The HTTP response object.
     * @throws {Error} Throws an error if the event details validation fails.
     */
    insertEvent: async function (req, res){
        try{
            const eventData = {
                name: req.body.name, 
                description: req.body.description, 
                startDateTime: req.body.startDateTime, 
                durationInMinutes: req.body.durationInMinutes, 
                capacity: req.body.capacity, 
                image: req.body.image, 
                active: req.body.active, 
                ticketsAvailable: req.body.ticketsAvailable
            };
            let categoryIds = req.body.categoryList.split(',');
            const categoryObjects = [];
            let validCategoryId = false;
            for(const categoryId of categoryIds){
                const category = await Category.findOne({categoryId: categoryId});
                if (category){
                    categoryObjects.push(category);
                    validCategoryId = true;
                }
            }
            eventData.categoryList = categoryObjects;
            if (validCategoryId){
                let anEvent = new Event(eventData);
                await anEvent.save();
                for (const category of categoryObjects){
                    category.eventsList.push(anEvent);
                    await category.save();
                }
                OperationCont.recordsCreated();
                OperationCont.eventCount();
                res.status(200).json(anEvent.eventId);
            }else{
                res.status(400).json({status: "Invalid categoryId found"});
            }
        } catch (err){
            res.status(400).json({error: err.message});
        }
    },
    /**
     * List all events and the details for their categories in JSON format.
     * @function
     * @async
     * @param {Object} req - The HTTP request object.
     * @param {Object} res - The HTTP response object.
     * @throws {Error} Throws an error if it fails to retrieve events.
     */
    listEvent: async function (req, res){
        try{
            let events = await Event.find().populate("categoryList");
            res.status(200).json(events);
        } catch(err){
            res.status(400).json({"error": err.message});
        }
    },
    /**
     * Delete an event by its ID and removes it from the categories's eventsList.
     * @function
     * @async
     * @param {Object} req - The HTTP request object.
     * @param {Object} res - The HTTP response object.
     * @throws {Error} Throws an error if the event deletion fails or if the event ID is not found.
     */
    deleteById: async function (req, res){
        try {
            const eventId = req.body.eventId;
            // Find the event to be deleted
            const event = await Event.findOne({ eventId });
            if (!event) {
                return res.status(400).json({ status: "Event not found" });
            }
            // Retrieve the list of categories associated with the event
            const categoryIds = event.categoryList.map(category => category._id);
            // Remove the eventId from each category's eventsList
            for (const categoryId of categoryIds) {
                const category = await Category.findById(categoryId);
                if (category) {
                    const eventIndex = category.eventsList.indexOf(event._id);
                    if (eventIndex !== -1) {
                        category.eventsList.splice(eventIndex, 1);
                        await category.save();
                    }
                }
            }
            // Delete the event
            let result = await Event.deleteOne({eventId: eventId});
            await OperationCont.recordsDeleted();
            await OperationCont.eventCount();
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({error: err.message });
        }
    },
    /**
     * Update an event name and capacity by ID.
     * @function
     * @async
     * @param {Object} req - The HTTP request object.
     * @param {Object} res - The HTTP response object.
     * @throws {Error} Throws an error if the event update fails or if the event ID is not found.
     */
    updateById: async function (req, res){ 
        try{
            let eventId = req.body.eventId;
            let newName = req.body.name;
            let newCapacity = req.body.capacity;
    
            let event = await Event.findOne({ "eventId": eventId });
            
            if (!event) {
                return res.status(400).json({status: "Event not found"});
            }
    
            event.name = newName;
            event.capacity = newCapacity;
    
            await event.save();
    
            await OperationCont.recordsUpdated();
            res.status(200).json({status: "updated successfully"});
            
        } catch (err){
            res.status(400).json({error: err.message });
        }
    },
}