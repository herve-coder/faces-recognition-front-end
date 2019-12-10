import React from "react";
import "./FaceDetection.css";

const FaceDetection = ({ imageUrl, boxes }) => {
  return (
    <div className="center ">
      <div className="ma4 absolute">
        <img
          id="inputimage"
          alt=""
          src={imageUrl}
          width="500px"
          height="auto"
        />
        {boxes.map((box, i) => {
          console.log(box.topRow, box.bottomRow, box.leftCol, box.rightCol);

          return (
            <div
              key={i}//replace by immutable value
              className="bounding-box"
              style={{
                top: box.topRow,
                bottom: box.bottomRow,
                left: box.leftCol,
                right: box.rightCol
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default FaceDetection;
