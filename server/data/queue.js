const mongoCollections = require("../config/mongoCollections");
const QueueDataInfo = mongoCollections.QueueData;
const { ObjectId } = require('mongodb');

async function getAllUnapprovedImages() {

}

async function getUnapprovedImageByImageId() {

}

async function getUnapprovedImageByUserId() {

}

// Approving new image by deleting it from queue-database and adding it to images-datavase:
async function approveUnapprovedImageByImageId() {

}


async function deleteUnapprovedImageByImageId() {

}

module.exports = {
    getAllUnapprovedImages,
    getUnapprovedImageByImageId,
    getUnapprovedImageByUserId,
    approveUnapprovedImageByImageId,
    deleteUnapprovedImageByImageId
}