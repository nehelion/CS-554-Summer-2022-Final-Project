const mongoCollections = require("../config/mongoCollections");
const UsersDataInfo = mongoCollections.UsersData;
const { ObjectId } = require('mongodb');

async function createUser() {

}

async function checkUserPassword() {

}

async function checkAdminFlag() {

}

async function getUserById() {

}

async function deleteUser() {

}


module.exports = {
    createUser,
    checkUserPassword,
    checkAdminFlag,
    getUserById,
    deleteUser
}