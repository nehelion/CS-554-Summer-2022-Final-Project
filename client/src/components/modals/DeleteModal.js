import React, {useState} from 'react';
import '../App.css';
import {useMutation} from '@apollo/client';
import ReactModal from 'react-modal';
import queries from '../../queries';


ReactModal.setAppElement('#root');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    border: '1px solid #28547a',
    borderRadius: '4px'
  }
};

function DeleteModal(props){
    const [showDeleteModal, setShowDeleteModal] = useState(props.isOpen);
    const [image, setImage] =useState(props.deleteImage);

    const [deleteImage] = useMutation(queries.DELETE_image,{
        update(cache,{data:{deleteImage}}){
            const {userPostedImages} = cache.readQuery({query:queries.GET_userPostedImages});
            cache.writeQuery({
                query:queries.GET_userPostedImages,
                data:{
                    userPostedImages: userPostedImages.filter((e)=> e.id !==image.id)
                }
            });
        }
    });

    const handleCloseDeleteModal = () =>{
        setShowDeleteModal(false);
        setImage(null);
        props.handleClose();
    };

    return(
        <div>
            <ReactModal
                name = 'deleteMidal'
                isOpen={showDeleteModal}
                contentLabel = 'Delete Image'
                style={customStyles}
            >
                <div>
                    <p>Are you sure to delete this image?</p>
                    <form
                        className='form'
                        id='delete-image'
                        onSubmit={(e)=>{
                            e.preventDefault();
                            deleteImage({
                                variables:{
                                    id: image.id
                                }
                            });
                            setShowDeleteModal(false);
                            alert('Image Deleted');
                            props.handleClose();
                        }}
                    >
                        <br/>
                        <br/>
                        <button className='button add-button' type='submit'>
                            Delete Image
                        </button>
                    </form>
                </div>
                <br/>
                <br/>
                <button
                    className='button cancel-button'
                    onClick={handleCloseDeleteModal}
                >
                    Cancel
                </button>
            </ReactModal>
        </div>
    );

}

export default DeleteModal;