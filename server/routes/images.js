const express = require('express');
const router = express.Router();
const imagesData = require('../data/images');
let { ObjectId } = require('mongodb');
const xss = require('xss');

router.post('/addNewApprovedImages', async (req,res) =>{

});

router.get('/getAllApprovedImages', async (req,res) =>{

});

router.get('/getApprovedImageByImageId', async (req,res) =>{

});

router.get('/getApprovedImageByUserId', async (req,res) =>{

});

router.get('/getApprovedImageByUserId', async (req,res) =>{

});

router.post('/editApprovedImageByImageId', async (req,res) =>{

});

router.post('/deleteApprovedImageByImageId', async (req,res) =>{

});


module.exports = router;