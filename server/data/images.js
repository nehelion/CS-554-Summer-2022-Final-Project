const mongoCollections = require("../config/mongoCollections");
const ImagesDataInfo = mongoCollections.ImagesData;
const { ObjectId } = require('mongodb');

async function addNewApprovedImages() {

}

async function getAllApprovedImages() {

}

async function getApprovedImageByImageId() {

}

async function getApprovedImageByUserId() {

}

async function editApprovedImageByImageId() {

}


async function deleteApprovedImageByImageId() {

}

module.exports = {
    addNewApprovedImages,
    getAllApprovedImages,
    getApprovedImageByImageId,
    getApprovedImageByUserId,
    editApprovedImageByImageId,
    deleteApprovedImageByImageId
}