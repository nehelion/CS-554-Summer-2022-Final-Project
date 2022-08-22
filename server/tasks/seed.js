const mongoCollections = require("./../config/mongoCollections");
const getImagesCollection = mongoCollections.ImagesData;
const { ObjectId } = require('mongodb');
const uuid = require('uuid');

// Updat this variable to drop the collection and start the collections newly
const SHOULD_DROP_COLLECTION = true;


const newImages = async function() {
    let userMails = ['saiharishkumar10@gmail.com', 'saiharis.vitta@gmail.com', 'alexandtoddy@gmail.com'];
    let imagesCollection = await getImagesCollection();
    
    if(SHOULD_DROP_COLLECTION) 
        await imagesCollection.drop();

    let imageObjects = [
        {_id: ObjectId(), ownerMail: userMails[0], imageLink: "Image-1.png", textExtracted: "", isApproved: true},
        {_id: ObjectId(), ownerMail: userMails[1], imageLink: "Image-2.png", textExtracted: "", isApproved: true},
        {_id: ObjectId(), ownerMail: userMails[2], imageLink: "Image-3.png", textExtracted: "", isApproved: true},
        {_id: ObjectId(), ownerMail: userMails[1], imageLink: "Image-4.png", textExtracted: "", isApproved: true},
        {_id: ObjectId(), ownerMail: userMails[0], imageLink: "Image-5.png", textExtracted: "", isApproved: true},
    ];

    let insertedImageIds = [];
    for(let imageObject of imageObjects) {
        try {
            const insertionInfo = await imagesCollection.insertOne(imageObject);
            if (!insertionInfo.acknowledged || !insertionInfo.insertedId)
                throw 'Failed to add post';
            else 
                insertedImageIds.push(insertionInfo.insertedId);
        } catch(e) {
            console.log("Error occured persisting object");
        }
    }

    console.log("Inserted Images: " + insertedImageIds);
    return insertedImageIds;
}

newImages();