import '../App.css';
import React, {useEffect, useState } from "react";
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, makeStyles } from '@material-ui/core';
import {Link } from 'react-router-dom';
import URLS from '../constants/constants';
import {getCurrentUserName} from '../firebase/FirebaseFunctions';
import axios from 'axios';


const useStyles = makeStyles({
    card: {
        maxWidth: 250,
        height: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 5,
        border: '1px solid #1e8678',
        boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
      },
      titleHead: {
        borderBottom: '1px solid #1e8678',
				fontSize: '15px',
        fontWeight: 'bold'
      },
      grid: {
        flexGrow: 1,
        flexDirection: 'row'
      },
      media: {
        height: '100%',
        width: '100%'
      },
      button: {
        color: '#1e8678',
        fontWeight: 'bold',
        fontSize: 12
      } 
});


/**
 * image (id, name, url, owner, text)
 * @param {*} props 
 * @returns 
 */
const ImageCard = (props) => {
    const classes = useStyles();
    let image = props.image;
    let [editable, setEditable] = useState(false);
    let [amIOwner, setAmIOwner] = useState(false);
    let [textExtracted, setTextExtracted] = useState("");

    // only owner of the image is allowed to upload the text of the image
    useEffect(()=> {
        let checkIfImageCanBeEdited = async () => {
            let loggedInUserName = await getCurrentUserName();
            if(loggedInUserName === image.ownerMail) {
                console.log("Test passed");
                setAmIOwner(true);
            }
            else 
                setAmIOwner(false);
        }
        checkIfImageCanBeEdited();
    }, []);

    let sendBackendCall = async (updateText) => {
        try {
            let requestConfig = {
                    updateText: updateText
            }
            let ans = await axios.post(`${URLS.UPDATE_TEXT_BY_IMAGE_ID}/${image._id}`, requestConfig);
            console.log("Updated Text updated in backend");
            image.textExtracted = updateText;
            setTextExtracted(image.textExtracted);
        } catch(e) {
            console.log("Failed to update Text for this Image", e);
        }
    };

    let updateTextHandler = (event) => {
        event.preventDefault();
        let text = event.target.imageText.value;
        image.text = text;
        sendBackendCall(text);
        setEditable(false);
    }

    return(
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={image._id}>
            <Card className={classes.card} variant='outlined'>
                <CardActionArea>
                    <Link to={`${URLS.GET_IMAGE_DETAILS_URL_BY_ID}/${image._id}`}>
                        <CardMedia
                            className={classes.media}
                            component='img'
                            image={`${URLS.GET_IMAGE_URL}/${image.imageLink}`} // TODO: image object should have url property
                            alt="No Image"
                            title={image.imageLink} // TODO: image object should have a name 
                        />
                    </Link>
                </CardActionArea>
                <CardContent>
                    <Typography
                        className={classes.titleHead}
                        gutterBottom
                        variant='h6'
                        component='h1'>
                        <p>File Name: </p>
                        <a href={`${URLS.GET_IMAGE_DETAILS_URL_BY_ID}/${image._id}`}>{image.imageLink}</a>
                        <p>User:</p>
                        <p>{image.ownerMail}</p>
                        <p>Text:</p>
                        <p>{image.textExtracted}</p>
                    </Typography>
                    {
                        amIOwner &&
                        <div className="edit">
                        <button onClick={() => setEditable(!editable)}>{editable?"View":"Edit"}</button>
                        {
                            editable &&
                            <form onSubmit={updateTextHandler} >
                                <input type="text" name="imageText" placeholder={image.textExtracted}/>
                                <button type="submit"> Update Text </button>
                            </form>
                        }
                        </div>
                    }
              </CardContent>
        </Card>
      </Grid>
    )
}
export default ImageCard;