const mongoCollections = require("../config/mongoCollections");
const UsersDataInfo = mongoCollections.UsersData;
const { ObjectId } = require('mongodb');

async function createUser() {

}

async function checkUserPassword() {

}

async function checkAdminFlagByid() {

}

async function getUserById() {

}

async function deleteUserByid() {

}


module.exports = {
    createUser,
    checkUserPassword,
    checkAdminFlagByid,
    getUserById,
    deleteUserByid
}