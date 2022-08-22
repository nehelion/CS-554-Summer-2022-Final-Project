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
  const imagesCollection = await images();
  const unapprovedImagesList = await imagesCollection.find({approval: false}, {
  }).toArray();
  if (!unapprovedImagesList) throw 'No approved Images yet, you can go to Admin page to approve some images~';
  return unapprovedImagesList;
}

async function getOneUnapprovedImage() {
  const imagesCollection = await images();
  const unapprovedImage = await imagesCollection.findOne({approval: false});
  if (!unapprovedImage) throw 'No approved Images yet, you can go to Admin page to approve some images~';
  return unapprovedImage;
}

// Approving unapproved Images by updating its "Approval field" to True
async function approveImageByImageId(id) {
  if (!id) throw "No id to arppove!";
  const oldImage = await getImageByImageId(id);
  let newImage = {
    _id: ObjectId(id),
    url: oldImage.url,
    tag: oldImage.tag,
    text: oldImage.text,
    approval: ("true" === "true")
  };
  const imagesCollection = await images();
  const updatedInfo = await imagesCollection.updateOne(
    { _id: ObjectId(id) },
    { $set: newImage }
  );
  if (!updatedInfo.matchedCount && !updatedInfo.modifiedCount) {
    throw "could not update image successfully";
  }
  return true;
}

async function getAllApprovedImages() {
  const imagesCollection = await images();
  const approvedImagesList = await imagesCollection.find({approval: true}, {
  }).toArray();
  if (!approvedImagesList) throw 'No approved Images yet, you can go to Admin page to approve some images~';
  return approvedImagesList;
}

async function getImageByImageId(id) {
  if (!id) throw "No userId";
  const imagesCollection = await images();
  const image = await imagesCollection.findOne({_id: ObjectId(id)});
  if (image === null) throw "No image with that id";
  return image;
}

async function getImageByUserId() {

}

async function editImageByImageId(id, text) {
  if (!id || !text) throw "No edit input!";
  const oldImage = await getImageByImageId(id);
  let newImage = {
    _id: ObjectId(id),
    url: oldImage.url,
    tag: oldImage.tag,
    text: text,
    approval: oldImage.approval
  };
  const imagesCollection = await images();
  const updatedInfo = await imagesCollection.updateOne(
    { _id: ObjectId(id) },
    { $set: newImage }
  );
  if (!updatedInfo.matchedCount && !updatedInfo.modifiedCount) {
    throw "could not update image successfully";
  }
  return true;
}


async function deleteImageByImageId(id) {
  if (!id) throw "No delete id!";
  const imagesCollection = await images();
  const deletionInfo = await imagesCollection.deleteOne({_id: ObjectId(id)});
  if (deletionInfo.deletedCount === 0) throw `Could not delete this image`;
  return true;
}

module.exports = {
    addUnapprovedImage,
    getAllUnapprovedImages,
    getOneUnapprovedImage,
    approveImageByImageId,
    getAllApprovedImages,
    getImageByImageId,
    getImageByUserId,
    editImageByImageId,
    deleteImageByImageId
}