/**
 * RESTFul endpoints for Category (Assignment 2)
 * @author Chew Xin Ning 32693974 <xche0235@student.monash.edu>
 */

/**
 * express module 
 * @const 
 */
const express = require('express');

/**
 * Reference to Category API Controller 
 * @const 
 */
const categoryApiCont = require('../controllers/category-api-controller');

/**
 * Router instance 
 * @const 
 */
const router = express.Router(); 

/**
 * Endpoint to insert a new category. 
 * @name POST /api/v1/category/32693974/add-category
 * @function 
 * @param {string} path - path to Add Category operation 
 * @param {function} function - function used by router to insert category
 */
router.post('/add-category', categoryApiCont.insertCategory);  

/**
 * Endpoint to list all categories. 
 * @name GET /api/v1/category/32693974/list-category
 * @function 
 * @param {string} path - path to List Category operation 
 * @param {function} function - function used by router to list category
 */
router.get('/list-category', categoryApiCont.listCategory);  

/**
 * Endpoint to delete category by ID. 
 * @name DELETE /api/v1/category/32693974/delete-category
 * @function 
 * @param {string} path - path to Delete Category operation 
 * @param {function} function - function used by router to delete category
 */
router.delete('/delete-category', categoryApiCont.deleteById); 

/**
 * Endpoint to update category by ID. 
 * @name PUT /api/v1/category/32693974/update-category
 * @function 
 * @param {string} path - path to Update Category operation 
 * @param {function} function - function used by router to update category
 */
router.put('/update-category', categoryApiCont.updateById); 

/**
 * Export router for Category operations endpoints 
 * @const 
 */
module.exports = router; 
