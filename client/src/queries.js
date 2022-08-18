import {gql} from '@apollo/client';

const GET_unsplashImages = gql`
  query unsplashImages($pageNum: Int!){
    unsplashImages(pageNum: $pageNum){
      id
      url
      posterName
      description
      userPosted
      binned
    }

  }
`;

const GET_binnedImages = gql`
query binnedImages{
  binnedImages {
    id
    url
    posterName
    description
    userPosted
    binned
  }
}
`;

const GET_userPostedImages = gql`
query userPostedImages{
  userPostedImages{
    id
    url
    posterName
    description
    userPosted
    binned
  }
}
`;

const UPLOAD_image = gql`
  mutation UploadImage(
        $url: String!
        $posterName: String
        $description: String
    ){
        uploadImage(url: $url, posterName: $posterName, description: $description){
            id
            url
            posterName
            userPosted
            description
            binned
        }
    }
`;

const To_BinnedImages = gql`
mutation UpdateImage(
  $id: ID!
  $url: String
  $posterName: String
  $description: String
  $binned: Boolean
  $userPosted: Boolean
){
  updateImage(
      id: $id, 
      url: $url, 
      description: $description,
      posterName: $posterName, 
      userPosted: $userPosted, 
      binned: $binned){
      id
      url
      posterName
      description
      userPosted
      binned
  }
}
`;

const DELETE_image = gql`
mutation DeleteImage(
  $id: ID!
){
  deleteImage(id: $id){
      id
      url
      posterName
      description
      userPosted
      binned
  }
}
`;

let exported = {
  GET_unsplashImages,
  GET_userPostedImages,
  GET_binnedImages,
  To_BinnedImages,
  UPLOAD_image,
  DELETE_image
};

export default exported;
