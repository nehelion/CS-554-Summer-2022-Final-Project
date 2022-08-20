const mongoCollections = require("../config/mongoCollections");
const UsersDataInfo = mongoCollections.UsersData;
const { ObjectId } = require('mongodb');

async function createUser() {

}

async function checkAdminFlagByid() {

}

async function getUserById() {

}

async function deleteUserByid() {

}


module.exports = {
    createUser,
    checkAdminFlagByid,
    getUserById,
    deleteUserByid
}