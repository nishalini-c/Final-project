const express = require('express');
const router = express.Router();
const  {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
} = require ('../controllers/userController.js');
const { protect } =require('../middleware/authMiddleware.js');

const register = router.post.bind(router);
const login = router.post.bind(router, '/login');
const logout = router.post.bind(router, '/logout');
const getProfile = router.route('/profile').get.bind(router.route('/profile'), protect, getUserProfile);
const updateProfile = router.route('/profile').put.bind(router.route('/profile'), protect, updateUserProfile);

register('/', registerUser);
login(authUser);
logout(logoutUser);
getProfile();
updateProfile();

module.exports ={router};