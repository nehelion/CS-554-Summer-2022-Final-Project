const mongoCollections = require("./../config/mongoCollections");
const images = mongoCollections.ImagesData;
const { ObjectId } = require('mongodb');
const uuid = require('uuid');

async function addUnapprovedImage(url, tag, text) {
  if (!url || !tag || !text) throw 'Empty input!';
  const newId = ObjectId();
  let newImage = {
    _id: newId,
    url: url,
    tag: tag,
    text: text,
    approval: false,
  };
  const imagesCollection = await images();
  const insertInfo = await imagesCollection.insertOne(newImage);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
  throw "Could not add image";
  result = await imagesCollection.findOne(newImage);
  return result;
}

async function getAllUnapprovedImages() {

}

// Approving unapproved Images by updating its "Approval field" to True
async function approveImageByImageId() {

}

async function getAllApprovedImages() {
  const imagesCollection = await images();
  const approvedImagesList = await imagesCollection.find({approval: true}, {
  }).toArray();
  if (!approvedImagesList) throw 'No approved Images yet, you can go to Admin page to approve some images~';
  return approvedImagesList;
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
    addUnapprovedImage,
    getAllUnapprovedImages,
    approveImageByImageId,
    getAllApprovedImages,
    getImageByImageId,
    getImageByUserId,
    editImageByImageId,
    deleteImageByImageId
}