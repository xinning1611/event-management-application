/**
 * RESTFul endpoints for Event (Assignment 2)
 * @author De Zheng Chang 32939965 <dcha0082@student.monash.edu>
 */

/**
 * express module 
 * @const 
 */
const express = require('express');

/**
 * Reference to event API Controller 
 * @const 
 */
const eventCont = require('../controllers/event-api-controller');

/**
 * Router instance 
 * @const 
 */
const router = express.Router(); 

/**
 * Endpoint to insert a new event. 
 * @name POST /api/v1/event/dezheng/add-events
 * @function 
 * @param {string} path - path to Add Event operation 
 * @param {function} function - function used by router to insert event
 */
router.post('/add-event', eventCont.insertEvent);  

/**
 * Endpoint to list all events. 
 * @name GET /api/v1/event/dezheng/list-events
 * @function 
 * @param {string} path - path to List Event operation 
 * @param {function} function - function used by router to list Events
 */
router.get('/list-events', eventCont.listEvent);  

/**
 * Endpoint to delete event by ID. 
 * @name DELETE /api/v1/event/dezheng/delete-event
 * @function 
 * @param {string} path - path to Delete Event operation 
 * @param {function} function - function used by router to delete event
 */
router.delete('/delete-event', eventCont.deleteById); 

/**
 * Endpoint to update Event by ID. 
 * @name PUT /api/v1/event/dezheng/update-event
 * @function 
 * @param {string} path - path to Update Event operation 
 * @param {function} function - function used by router to update events
 */
router.put('/update-event', eventCont.updateById); 

/**
 * Export router for Event-api operations endpoints 
 * @const 
 */
module.exports = router; 