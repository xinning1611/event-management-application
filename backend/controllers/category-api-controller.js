/**
 * API Controller for Category (Assignment 2)
 * @author Chew Xin Ning 32693974 <xche0235@student.monash.edu>
 */

/**
 * Category schema 
 * @const 
 */
const Category = require("../models/category");

/**
 * Event schema 
 * @const 
 */
const Event = require("../models/event");

/**
 * Operation controller
 * @const 
 */
const OperationCont = require("./stats");

/**
 * Operations of the Category schema 
 */
module.exports = {

    /**
     * Insert a new category into collection. Endpoint respond with the category ID of the newly added category in JSON object. 
     * @function
     * @async
     * @param {Object} req - The HTTP request object.
     * @param {Object} res - The HTTP response object.
     * @throws {Error} Throws an error if the category details validation fails.
     */
    insertCategory: async function (req, res) {
        try {
            let aCategory = new Category({
                name: req.body.name, 
                description: req.body.description, 
                image: req.body.image
            });
            await aCategory.save();
            await OperationCont.recordsCreated();
            await OperationCont.categoryCount();
            res.status(200).json({"id": aCategory.categoryId}); 
        }
        catch (err){
            res.status(400).json({"error": err.message});
        }
    }, 

    /**
     * List all categories and the details for their events in JSON format.
     * @function
     * @async
     * @param {Object} req - The HTTP request object.
     * @param {Object} res - The HTTP response object.
     * @throws {Error} Throws an error if listing categories fails.
     */
    listCategory: async function (req, res) {
        try {
            let categories = await Category.find().populate("eventsList"); 
            res.status(200).json(categories); 
        }
        catch (err) {
            res.status(400).json({"error": err.message});
        }
    }, 

    /**
     * Delete a category by its ID and all its associated events.
     * @function
     * @async
     * @param {Object} req - The HTTP request object.
     * @param {Object} res - The HTTP response object.
     * @throws {Error} Throws an error if the category deletion fails or if the category ID is not found.
     */
    deleteById: async function (req, res) { 
        try {
            let categoryId = req.body.categoryId;
            let theCategory = await Category.findOne({ categoryId: categoryId }); 
            // Delete events in the category's events list
            if (theCategory.eventsList.length > 0) {
                for (let i = 0; i < theCategory.eventsList.length; i++) {
                    let eventId = theCategory.eventsList[i];
                    let event = await Event.findById(eventId); 
                    await Event.deleteOne({ _id: event._id });
                }
            }
            // Delete category 
            let result = await Category.deleteOne({ categoryId: categoryId });
            await OperationCont.recordsDeleted();
            await OperationCont.categoryCount();
            await OperationCont.eventCount();
		    res.json(result);
        }
        catch (err){
            res.status(400).json({ error: "Category ID not found" });
        }
    }, 

    /**
     * Update a category name and description by ID.
     * @function
     * @async
     * @param {Object} req - The HTTP request object.
     * @param {Object} res - The HTTP response object.
     * @throws {Error} Throws an error if the category update fails or if the category ID is not found.
     */
    updateById: async function (req, res) {
        try {
            // Retrieve variables 
            let categoryId = req.body.categoryId;
            let newName = req.body.name;
            let newDesc = req.body.description;
            let newImage = req.body.image;

            // Perform update 
            let category = await Category.findOne({ "categoryId" : categoryId });

            // If there is no matched category ID, return error message 
            if (!category) {
                res.status(400).json({ status: "ID not found" });
            }
            else {
                category.name = newName;
                category.description = newDesc;
                category.image = newImage;
                await category.save();
                await OperationCont.recordsUpdated();
                res.status(200).json({ status: "updated successfully" });
            }
        }
        catch (err) {
            res.status(400).json({"error": err.message});
        }
    }, 

}
