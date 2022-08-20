const mongoCollections = require("../config/mongoCollections");
const ImagesDataInfo = mongoCollections.ImagesData;
const { ObjectId } = require('mongodb');

async function getAllUnapprovedImages() {

}

// Approving unapproved Images by updating its "Approval field" to True
async function approveImageByImageId() {

}

async function getAllApprovedImages() {

}

async function getImageByImageId() {

}

async function getImageByUserId() {

}

async function editImageByImageId() {

}


async function deleteImageByImageId() {

}

module.exports = {
    getAllUnapprovedImages,
    approveImageByImageId,
    getAllApprovedImages,
    getImageByImageId,
    getImageByUserId,
    editImageByImageId,
    deleteImageByImageId
}