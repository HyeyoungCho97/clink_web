import React from "react";

const ChallengeTableCard = ({ date, time, description, category, amount }) => {
  return (
    <div className="ChallengeTableCard">
      <div className="CardTop">
        <div id="CardLeft">{date}</div>
        <div id="CardMiddle">{description}</div>
        <div id="CardRight">{amount}</div>
      </div>
      <div className="CardBottom">
        <div id="CardLeft">{time}</div>
        <div id="CardMiddle">{category}</div>
        <div id="CardRight"></div>
      </div>
    </div>
  );
};

export default ChallengeTableCard;
