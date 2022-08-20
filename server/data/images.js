const mongoCollections = require("./../config/mongoCollections");
const images = mongoCollections.ImagesData;
const { ObjectId } = require('mongodb');

async function setImage(text) {
	console.log(text);
	
  const imagesCollection = await images();
	console.log("here 1");
	
	let newImage = 
	{
    text: text,
    approved: false
  }
	console.log("here 2");
  const insertDetails = await imagesCollection.insertOne(newImage);
  if (insertDetails.insertedCount === 0) throw "Could not add image, try again!"
	
	console.log("here 3");
	
  return {taskInserted: true};
}

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
		setImage,
    getAllUnapprovedImages,
    approveImageByImageId,
    getAllApprovedImages,
    getImageByImageId,
    getImageByUserId,
    editImageByImageId,
    deleteImageByImageId
}