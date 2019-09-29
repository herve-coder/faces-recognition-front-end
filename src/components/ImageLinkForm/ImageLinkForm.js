import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = props => {
  return (
    <div>
      <p>{"This app will detect all the faces in your pictures"} </p>
      <div>
        <form className=" center">
          <div className="form pa4 br3 shadow-5">
            <input
              className="pa3 f4 w-70"
              type="text"
              placeholder="Enter an image url here"
              onChange={props.inputChange}
            />
            <button
              className="w-30 f4 grow ph3 pv3  bg-light-purple"
              type="button"
              onClick={props.submitPicture}
            >
              {"DETECT"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImageLinkForm;
