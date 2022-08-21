const BASE_URL = 'http://localhost:3001';
const GET_ALL_IMAGES_URL = `${BASE_URL}/images/getAllApprovedImages`;
const GET_IMAGE_DETAILS_URL_BY_ID = `${BASE_URL}/images/getImageByImageId/`;
const UPLOAD_IMAGE_URL = `${BASE_URL}/images/setImage`;
const GET_IMAGE_URL = `${BASE_URL}/images`; 

const URLS = {
    BASE_URL,
    GET_ALL_IMAGES_URL,
    GET_IMAGE_DETAILS_URL_BY_ID,
    UPLOAD_IMAGE_URL,
    GET_IMAGE_URL
};

export default URLS;
