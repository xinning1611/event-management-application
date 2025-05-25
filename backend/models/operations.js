/**
 * Schema for Operations
 * @author Chew Xin Ning 32693974 <xche0235@student.monash.edu>
 * @author De Zheng Chang 32939965 <dcha0082@student.monash.edu>
 */

/**
 * mongoose module 
 * @const 
 */
const mongoose = require('mongoose');

/**
 * Operations schema 
 * @const 
 * @type {mongoose.Schema}
 */
const operationsSchema = mongoose.Schema({
    eventsCount: {
        type: Number, 
        default: 0, 
    }, 
    categoriesCount: {
        type: Number, 
        default: 0, 
    }, 
    createdCount: {
        type: Number, 
        default: 0, 
    }, 
    deletedCount: {
        type: Number, 
        default: 0, 
    }, 
    updatedCount: {
        type: Number, 
        default: 0, 
    }, 
}); 

/**
 * Export Operations schema 
 * @const 
 */
module.exports = mongoose.model("Operations", operationsSchema); 