/**
 * RESTFul endpoints for Operations
 * @author De Zheng Chang 32939965 <dcha0082@student.monash.edu>
 */

/**
 * express module 
 * @const 
 */
const express = require('express');

/**
 * Reference to stats API Controller 
 * @const 
 */
const statsCont = require('../controllers/stats');

/**
 * Router instance 
 * @const 
 */
const router = express.Router(); 

router.get('/stats', statsCont.getStatistics); 

/**
 * Export router for stats operations endpoints 
 * @const 
 */
module.exports = router; 