const express = require('express');
const router = express.Router();
const data = require('../data/users');
const usersData = data.users;
let { ObjectId } = require('mongodb');
const xss = require('xss');

router.post('/createUser', async (req,res) =>{

});

router.post('/checkAdminFlagByid', async (req,res) =>{
    try {
		var body = req.body;
		if (!body._id ) throw 'Empty uid input!';
		const id = xss(body._id);
		let x = await usersData.checkAdminFlagByid(id);
		return x;
	} 
	catch (e) {
		res.status(500).json({"2":e});
	}
});

router.get('/getUserById/:id', async (req,res) =>{

});

router.post('/deleteUserByid/:id', async (req,res) =>{

});


module.exports = router;