const mongoCollections = require("./../config/mongoCollections");
const validations = require("../validations/validations");
const getImagesCollection = mongoCollections.ImagesData;
const { ObjectId } = require('mongodb');
const uuid = require('uuid');
const UnprocessibleRequest = require("../errors/UnprocessibleRequest");

/**
 * Save a new Image Object 
 * 
 * Structure:
  id - Object(id)
  userID - Object(id)
  username - String
  imageLink - String
  textExtracted - String
  approval - Boolean
 */
const insertImage = async (ownerMail, imageLink, textExtracted) => {
  // Validations
  ownerMail = validations.validateMail(ownerMail, "Owner Mail");
  imageLink = validations.validateString(imageLink, "Image Link");
  textExtracted = validations.validateString(textExtracted, "Text Extracted");

  // Create New Image Object
  let imageObject = {
    _id: ObjectId(),
    ownerMail: ownerMail,
    imageLink: imageLink,
    textExtracted: textExtracted,
    isApproved: false // Initial State of any Image would be unapproved
  }

  // Save it to DB
  const imagesCollection = await getImagesCollection();
  let {value : insertedImage} = await imagesCollection.findOneAndUpdate(
        { _id:  imageObject._id},
        { $setOnInsert: imageObject},
        { upsert: true, returnNewDocument: true, returnDocument: 'after' }      // Options to ensure the function to return updated user Object 
    );
  
  // Verify and return the new Document Created
  if(insertedImage == null) 
    throw new Error("Couldn't create a new Image");
  insertedImage._id = insertedImage._id.toString();     // Update the _id from ObjectId to string
  return insertedImage;
};

/**
 * Get All UnApproved Images i.e., image Objects with isApproved = false
 */
const getAllUnapprovedImages = async () => {
  const imagesCollection = await getImagesCollection();
  let unApprovedImages = await imagesCollection.find({isApproved: false}).toArray();
  if(unApprovedImages == null)
    throw new Error(`Failed to Get Unapproved Images`);
  
  for(let i= 0; i < unApprovedImages.length; i++)
    unApprovedImages[i]._id = unApprovedImages[i]._id.toString();
  return unApprovedImages;
};

/**
 * Get All UnApproved Images i.e., image Objects with isApproved = true
 */
 const getAllApprovedImages = async () => {
  const imagesCollection = await getImagesCollection();
  let approvedImages = await imagesCollection.find({isApproved: true}).toArray();
  if(approvedImages == null)
    throw new Error(`Failed to Get Approved Images`);
  
  for(let i= 0; i < approvedImages.length; i++)
    approvedImages[i]._id = approvedImages[i]._id.toString();
  return approvedImages;
};

/**
 * Get Image by It's Id
 */
const getImageByImageId = async (imageId) => { 
  imageId = validations.validateId(imageId, "Image Id");
  const imagesCollection = await getImagesCollection();
  let imageObject = await imagesCollection.find({_id: imageId}).toArray();
  if(imageObject == null)
    throw new Error(`Failed to Get Image with Id ${imageId}`);
  if(imageObject.length > 1)
    throw new Error(`Found multiple Images with Id ${imageId}`);
  
  imageObject._id = imageObject._id.toString();
  return imageObject;
}

/**
 * Get All Images uploaded by User with Id - UserId
 */
const getImagesByUserId = async (userId) => {
  userId = validations.validateId(userId, "User Id");
  const imagesCollection = await getImagesCollection();
  let imageObjects = await imagesCollection.find({userId: userId}).toArray();
  if(imageObjects == null)
    throw new Error(`Failed to Get Approved Images`);
  for(let i =0; i < imageObjects.length; i++)
    imageObjects[i]._id = imageObjects[i]._id.toString();
  return imageObjects;
};

const getImagesWithText = async (searchTerm) => {
  searchTerm = validations.validateString(searchTerm);
  const imagesCollection = await getImagesCollection();
  const searchImages = await imagesCollection.find({"textExtracted": {$regex: searchTerm, $options : 'i'}}).toArray();
  if(searchImages == null)
    throw new Error(`Failed to fetch Images with given Text`);
  for(let i = 0; i < searchImages.length; i++) {
    searchImages[i]._id = searchImages[i]._id.toString();
  }
  return searchImages;
}

/**
 * Approve Image of _id ImageId i.e., update status to true
 */
const approveImageByImageId = async (imageId) => {
  imageId = validations.validateId(imageId, "Image Id");
  const imagesCollection = await getImagesCollection();
  let {value : approvedImage} = await imagesCollection.findOneAndUpdate(
    { _id:  imageId},
    { isApproved: true},
    { upsert: false, returnNewDocument: true, returnDocument: 'after' }
  );

  if(approvedImage == null) 
    throw new UnprocessibleRequest(`Failed to approve image with Id - ${imageId}`);
  approvedImage._id = approvedImage._id.toString();
  return approvedImage;
};

/**
 * Update Extracted Text of an Image with Id imageId
 */
const updateTextbyImageId = async (imageId, updatedText) => {
  imageId = validations.validateId(imageId, "Image Id");
  updatedText = validations.validateString(updatedText, "New Extracted Text");
  const imagesCollection = await getImagesCollection();
  let {value : updatedImage} = await imagesCollection.findOneAndUpdate(
    { _id:  imageId},
    { $set: {textExtracted: updatedText}},
    { upsert: false, returnNewDocument: true, returnDocument: 'after' }
  );

  if(updatedImage == null) 
    throw new Error(`Image Text cannot be updated for Id - ${imageId}`);
  updatedImage._id = updatedImage._id.toString();
  return updatedImage;
}

const deleteImageByImageId = async (imageId) => {
  imageId = validations.validateId(imageId, "Image Id");
  const imagesCollection = await getImagesCollection();
  const imageObject = imagesCollection.findOne({_id: imageId});
  if(imageObject == null)
    throw new Error(`Couldn't find the object with Id - ${imageId}`);
  await imagesCollection.deleteOne({_id: imageId});
  imageObject._id = imageObject._id.toString();
  return imageObject;
};

module.exports = {
    insertImage,
    getAllUnapprovedImages,
    getAllApprovedImages,
    getImageByImageId,
    getImagesByUserId,
    getImagesWithText,
    approveImageByImageId,
    updateTextbyImageId,
    deleteImageByImageId
}