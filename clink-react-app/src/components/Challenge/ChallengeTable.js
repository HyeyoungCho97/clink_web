import React, { useEffect, useState } from "react";

import moment from "moment";
import ChallengeTableCard from "./ChallengeTableCard";
import category from "../../data/expenseCategory.json";

const ChallengeTable = ({ date, detail }) => {
  // const forceUpdate =React.useCallback(()=>updateS)
  // 카드 생성
  const result = [];
  const renderingCard = () => {
    for (let i = 0; i < detail.length; i++) {
      let strAmount =
        detail[i].expenseAmount
          ?.toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";

      let date = new Date(detail[i].expenseDate);
      let strDate =
        date.getMonth() < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      strDate += "." + date.getDate();

      result.push(
        <ChallengeTableCard
          key={detail[i].expenseId}
          date={strDate}
          time={
            date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
          }
          description={detail[i].expenseDescription}
          category={category.category[detail[i].categoryId]}
          amount={strAmount}
          className="tableCard"
        />
      );
    }
  };
  //getData();
  //console.log(detail);
  renderingCard();
  //console.log(renderingCard());
  return (
    <div className="ChallengeTable">
      <div id="SelectedDate">
        {moment(date[0]).format("MM월 DD일")} ~{" "}
        {moment(date[1]).format("MM월 DD일")}
      </div>
      {result}
    </div>
  );
};

export default ChallengeTable;
