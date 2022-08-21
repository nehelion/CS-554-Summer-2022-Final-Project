// import { FormControl } from "@material-ui/core";
import React from "react";
const UpdateText = (props) => {
    let image = props.image;

    return (
        <div>
            <form onSubmit={() => {console.log("test")}} >
                <input type="text" name="imageText" defaultValue="default"/>
                <button type="submit"> Update Text </button>
            </form>
        </div>
    );
}

export default UpdateText;