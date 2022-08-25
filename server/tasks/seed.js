const mongoCollections = require("./../config/mongoCollections");
const getImagesCollection = mongoCollections.ImagesData;
const { ObjectId } = require('mongodb');
const uuid = require('uuid');

// Updat this variable to drop the collection and start the collections newly
const SHOULD_DROP_COLLECTION = false;


const newImages = async function() {
    let userMails = ['saiharishkumar10@gmail.com', 'saiharish.vitta@gmail.com', 'alexandtoddy@gmail.com'];
    let imagesCollection = await getImagesCollection();
    
    if(SHOULD_DROP_COLLECTION) {
        await imagesCollection.drop();
    }

    let approvedImageObjects = [
        {
            _id: ObjectId(), 
            ownerMail: 
            userMails[0], 
            imageLink: "Image-1.png", 
            textExtracted: "This can be done by you as well!It is made so simple. Click on Home …", 
            isApproved: true
        },
        {
            _id: ObjectId(), 
            ownerMail: userMails[1], 
            imageLink: "Image-2.jpg", 
            textExtracted: "I have to admit that theater did not come naturally to me, and | remember that | felt remarkably self-conscious and nervous the first few times | set foot on the stage. The first time | was on stage was in eighth grade when my best friend talked me into auditioning for our school's performance of the play Romeo and Juliet by William Shakespeare.", 
            isApproved: true
        },
        {
            _id: ObjectId(), 
            ownerMail: userMails[2], 
            imageLink: "Image-3.jpg", 
            textExtracted: "Hello", 
            isApproved: true
        }
    ];

    let unApprovedImages = [
        {
            _id: ObjectId(), 
            ownerMail: userMails[1], 
            imageLink: "Image-4.png", 
            textExtracted: "CS554 Notes 1. Signup 1. Using Credentials 2. Google Mail 2. Login 1. Using Credentials 2. Google Mail 3. Logout 4. Home Page: 1. Displays all the Meta Information of Images in our DB (Clickable) 1. Click this for View Image in Detail (Step 5) 2. Upload Image Button 1. A Form pops up to allow user to upload Image(s) 3. Search through the Image Texts we extracted and return the list of Image Meta Data 1. Display the list of meta info just as in 4.1 but only matching ones 5. View Image: Now the real image is loaded along with Meta Information 1. Edit the Text Extracted in the image Backend Routes: (ST 1liT o} 1. Creates a User Object in Mongo with all info collected in Front End 2. Creates an Entry in Firebase necessary for login 3. Returns an object indicating ‘True’ in case of success 2. 3. % 101779987519 4", 
            isApproved: false
        },
        {
            _id: ObjectId(),
            ownerMail: userMails[0], 
            imageLink: "Image-5.png", 
            textExtracted: '4‘{\' 7 I gVt Ml iR B NU TToUuillo 1 V= I “ _id: ObjectId(), ownerMail: userMails[1], imagelLink: "Image-2.jpg", ‘ textExtracted: "I have to admit that theater did not come naturally to me, and | remember that | felt remarkably self—consc‘ isApproved: true 4 I R _id: ObjectId(), ownerMail: userMails[2], imagelLink: "Image-3.jpg", textExtracted: "Hello", isApproved: trud - unApprovedImages = [ b _id: ObjectId(), ownerMail: userMails[1], imagelLink: "Image-4.png", textExtracted: "CS554 Notes 1. Signup 1. Using Credentials 2. Google Mail 2. Login 1. Using Credentials 2. Google Mail 3. L isApproved: false IR',
            isApproved: false
        },
    ];

    let insertedImageIds = [];
    let insertImage = async (imageObject) => {
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
    for(let imageObject of approvedImageObjects) {
        await insertImage(imageObject);
    }
    for(let imageObject of unApprovedImages) {
        await insertImage(imageObject);
    }

    console.log("Inserted Images: " + insertedImageIds);
    return insertedImageIds;
}

newImages();