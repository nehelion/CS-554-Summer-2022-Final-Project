# Client Application
1. Open Terminal in 'client' directory
2. Install the Dependencies 
    ### `npm i --legacy-peer-deps`
3. Start the application
    ### `npm start`


# Server Application
1. Open Terminal in 'server' directory
2. Install the Dependencies 
    ### `npm i --legacy-peer-deps`
3. Seed the Local Mongo Database
    ### `npm run seed`
4. Copy firebase-private-key.json to Repo Folder - CS-554-Summer-2022-Final-Project (Just out of server directory)
    ### saiharishkumarvitta@Sais-Air-2 CS-554-Summer-2022-Final-Project % ls -lrth firebase-private-key.json 
    ### -rw-r--r--@ 1 saiharishkumarvitta  staff   2.3K Aug 24 16:39 firebase-private-key.json
    ### saiharishkumarvitta@Sais-Air-2 CS-554-Summer-2022-Final-Project % pwd
    ### /Users/saiharishkumarvitta/Documents/CS554_Web2/Final-Project/CS-554-Summer-2022-Final-Project
5. Start the application
    ### `npm start`


# Usage of the application
1. Sign Up (Skip this step if you are an user already)
2. Sign In (Admin Credentials are provided seperately)
3. Landing Page contains breif description of the Website
4. Click on Home (In Navigation)
5. Now you can see all the Approved Images available in Database (Inserted during the seed)
    1. If the logged in user has images in the list, you can edit them as well
6. Type some text and press Enter to filter the Images 
7. Click on Upload for starting the Image Extraction
    1. Press Load button to select the file from the local device
    2. Click on Image in the image viewer to extract text after editing 
    3. You can see the Text Extracted in the display
    4. Click on Submit to save the image (Can't see the image till admin approves it)
8. Click on Signout and Confirm to Signout to log out 

(Only for ADMIN)
9. Click on Admin (In Navigation)'
10. You can see UnApproved Images One after Other
    1. Approve it to display it in Home Page List
    2. Delete it if you think the Picture is not appropriate