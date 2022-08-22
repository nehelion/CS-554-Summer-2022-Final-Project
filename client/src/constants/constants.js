const BASE_URL = 'http://localhost:3001';
const GET_ALL_IMAGES_URL = `${BASE_URL}/images/getAllApprovedImages`;
const GET_IMAGE_DETAILS_URL_BY_ID = `${BASE_URL}/images/getImageByImageId/`;
const UPLOAD_IMAGE_URL = `${BASE_URL}/images/setImage`;
const GET_IMAGE_URL = `${BASE_URL}/images`; 
const SEARCH_IMAGES_URL = `${BASE_URL}/images/searchImages`;
const UPDATE_TEXT_BY_IMAGE_ID = `${BASE_URL}/images/updateText`;

const URLS = {
    BASE_URL,
    GET_ALL_IMAGES_URL,
    GET_IMAGE_DETAILS_URL_BY_ID,
    UPLOAD_IMAGE_URL,
    GET_IMAGE_URL,
    SEARCH_IMAGES_URL,
    UPDATE_TEXT_BY_IMAGE_ID
};

export default URLS;
