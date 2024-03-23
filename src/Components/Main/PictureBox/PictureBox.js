import React from "react";
import PBox from "./PBox";
import passion from "../../../Assets/passion.jpg";
import ty from "../../../Assets/ty.jpg";
import party from "../../../Assets/party.jpg";

const PictureBox = () => {
  return (
    <div className="PictureBox">
      {/* contains the highlight events below the header */}
      <PBox images={[passion]} />
      <PBox images={[party, party, party]} heroBanner={"Disover Agwa!"} />
      <PBox images={[ty]} />
    </div>
  );
};

export default PictureBox;
