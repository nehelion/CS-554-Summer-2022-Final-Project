const express = require('express');
const router = express.Router();
const queueData = require('../data/queue');
let { ObjectId } = require('mongodb');
const xss = require('xss');


router.get('/getAllApprovedImages', async (req,res) =>{

});

router.get('/getUnapprovedImageByImageId/:id', async (req,res) =>{

});

router.post('/approveImageByImageId/:id', async (req,res) =>{

});

router.post('/deleteUnapprovedImageByImageId/:id', async (req,res) =>{

});


module.exports = router;