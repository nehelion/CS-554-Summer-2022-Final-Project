const express = require('express');
const router = express.Router();
const imagesData = require('../data/images');
let { ObjectId } = require('mongodb');
const xss = require('xss');

router.post('/images/addNewApprovedImages', async (req,res) =>{

});

router.get('/images/getAllApprovedImages', async (req,res) =>{

});

router.get('/images/getApprovedImageByImageId', async (req,res) =>{

});

router.get('/images/getApprovedImageByUserId', async (req,res) =>{

});

router.get('/images/getApprovedImageByUserId', async (req,res) =>{

});

router.post('/images/editApprovedImageByImageId', async (req,res) =>{

});

router.post('/images/deleteApprovedImageByImageId', async (req,res) =>{

});


module.exports = router;