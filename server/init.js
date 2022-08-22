const dbConnection = require('./config/connection');
const data = require('./data');
const imagesData = data.images;

async function init() {

  const db = await dbConnection();
  await db.dropDatabase();

  console.log("------------Init Images------------");
  try{
    await imagesData.addUnapprovedImage(
     "https://www.stevens.edu/sites/stevens_edu/files/styles/home_page_callout_100x100/public/personnel/photos/phill_27.jpg?itok=93E8Qznf",
     "Patrick Hill",
     "I am the profeesor of Stevens and Teaching CS546/CS554. Emial: phill@stevens.edu"
   );
  } catch(e){
    alert(e)
  }
  try{
    await imagesData.addUnapprovedImage(
     "https://www.stevens.edu/sites/stevens_edu/files/styles/home_page_callout_100x100/public/personnel/photos/mgreenbe_24.jpg?itok=0uD5gtns",
     "Michael Greenberg",
     "I am the profeesor of Stevens and Teaching CS515. Emial: mgreenbe@stevens.edu"
   );
  } catch(e){
    alert(e)
  }
  try{
    await imagesData.addUnapprovedImage(
     "https://www.stevens.edu/sites/stevens_edu/files/styles/home_page_callout_100x100/public/personnel/photos/aklappho_32.jpg?itok=rzr_Cf62",
     "Aaron Klappholz",
     "I am the profeesor of Stevens and Teaching CS561WS. Emial: aklappho@stevens.edu"
    );
  } catch(e){
    alert(e)
  }
  try{
    await imagesData.addUnapprovedImage(
     "https://www.stevens.edu/sites/stevens_edu/files/styles/home_page_callout_100x100/public/personnel/photos/rpeyrovi_30.jpg?itok=JnV-pXoc",
     "Reza Peyrovian",
     "I am the profeesor of Stevens and Teaching CS570. Emial: rpeyrovi@stevens.edu"
    );
  } catch(e){
    alert(e)
  }
  try{
    await imagesData.addUnapprovedImage(
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST_Jq_yCIItqgjpisxsWIg2iVdLFMkrVmZHA&usqp=CAU",
     "Doggie",
     "I am a puppy and i'm naughty, you better not approve me~"
    );
  } catch(e){
    alert(e)
  }

  console.log("------------create users successfully------------");

  await db.serverConfig.close();
  console.log("closed")

}

init();