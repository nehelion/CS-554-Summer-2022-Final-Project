import '../App.css';
import React, {useState } from "react";
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, makeStyles } from '@material-ui/core';
import {Link } from 'react-router-dom';
import GET_IMAGE_DETAILS_URL_BY_ID from '../constants/constants';

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

    let updateTextHandler = (event) => {
        event.preventDefault();
        let text = event.target.imageText.value;
        image.text = text;
        console.log("value updating to " + text);
        // TODO: need to send the update to backend before re-render this card with new Image Data
        setEditable(false);
    }

    return(
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={image.id}>
            <Card className={classes.card} variant='outlined'>
                <CardActionArea>
                    <Link to={`${GET_IMAGE_DETAILS_URL_BY_ID}/${image.id}`}>
                        <CardMedia
                            className={classes.media}
                            component='img'
                            image={image.url} // TODO: image object should have url property
                            alt="No Image"
                            title={image.name} // TODO: image object should have a name 
                        />
                    </Link>
                </CardActionArea>
                <CardContent>
                    <Typography
                        className={classes.titleHead}
                        gutterBottom
                        variant='h6'
                        component='h1'>
                        <a href={`${GET_IMAGE_DETAILS_URL_BY_ID}/${image.id}`}>{image.name}</a>
                        <p>{image.text}</p>
                    </Typography>

                    <div className="edit">
                        <button onClick={() => {setEditable(!editable)}}>{editable?"View":"Edit"}</button>
                        {
                            editable &&
                            <form onSubmit={updateTextHandler} >
                                <input type="text" name="imageText" defaultValue={image.text}/>
                                <button type="submit"> Update Text </button>
                            </form>
                        }
                        
                    </div>
              </CardContent>
        </Card>
      </Grid>
    )
}
export default ImageCard;