/**
 * Schema file for Category. 
 * @author Chew Xin Ning 32693974 <xche0235@student.monash.edu>
 */

/**
 * mongoose module 
 * @const 
 */
const mongoose = require("mongoose");

/**
 * Category schema 
 * @const 
 * @type {mongoose.Schema}
 */
const categorySchema = mongoose.Schema({
    categoryId: {
        type: String, 
        default: function(){
            return generateCategoryId(); 
        }, 
    }, 
    name: {
        type: String, 
        required: true, 
        validate: {
            validator: function (value) {
                return  /^[a-zA-Z0-9 ]+$/.test(value); // accept alphabet in upper or lower case, numeric number and space only
            }, 
            message: "Name must consist of alphanumeric characters only",
        }
    }, 
    description: {
        type: String, 
        default: "undefined", 
    }, 
    image: {
        type: String, 
        default: "/category-page.png", 
    }, 
    eventsList: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Event", 
        }, 
    ], 
    createdAt: {
        type: Date, 
        default: Date.now(), 
    }, 
}); 

/**
 * Function to generate random Category ID. 
 * @function 
 * @returns Random Category ID. 
 */
function generateCategoryId(){
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    let length = 2;
    for (let i = 0; i < length; i++){
        result += chars.charAt(Math.floor(Math.random() * chars.length)); 
    }
    let categoryId = "C" + result + "-" + Math.round((Math.random() * (9999 - 1000) + 1000));
    return categoryId;
}

/**
 * Export Category schema 
 * @const 
 */
module.exports = mongoose.model("Category", categorySchema); 