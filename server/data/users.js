const mongoCollections = require("../config/mongoCollections");
const UsersDataInfo = mongoCollections.UsersData;
const { ObjectId } = require('mongodb');

async function createUser() {

}

async function checkAdminFlagByid(id) {
    if (!id) throw 'no uid!'
    if (id == 'LE6VJ8K3PnZjoJVd8btEIc4kT3d2'){
        return true;
    } else{
        return false;
    }
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