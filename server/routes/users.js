const express = require('express');
const router = express.Router();
const usersData = require('../data/users');
let { ObjectId } = require('mongodb');
const xss = require('xss');

router.post('/createUser', async (req,res) =>{

});

router.post('/checkUserPassword', async (req,res) =>{

});

router.post('/checkAdminFlagByid/:id', async (req,res) =>{

});

router.get('/getUserById/:id', async (req,res) =>{

});

router.post('/deleteUserByid/:id', async (req,res) =>{

});


module.exports = router;