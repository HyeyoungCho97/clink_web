import React, { useEffect, useState, useCallback } from "react";
import "../../styles/MainCalendar.scss";
import ChallengeTable from "./ChallengeTable";
import ChallengeBarChart from "./ChallengeBarChart";
import ChallengePieChart from "./ChallengePieChart";
import Calendar from "react-calendar";
import axios from "axios";
import moment from "moment";

const ChallengeGraph = ({ today, week }) => {
  const [value, onChange] = useState(new Date());
  const [data, setData] = useState(today);

  useEffect(() => {
    setData(today);
    //console.log(today);
    getData();
  }, [today, value]);
  //데이터 가져오기
  const getData = async () => {
    //console.log("click");
    const address =
      "http://localhost:80/challenge/refresh.do?userNo=" +
      sessionStorage.getItem("userNo") +
      "&startDate=" +
      moment(value[0]).format("YYYY-MM-DD") +
      "&endDate=" +
      moment(value[1]).format("YYYY-MM-DD");
    const response = await axios.get(address);
    //console.log(response);
    setData(response.data.today);
    /*
      .then((response) => {
        //console.log(response.data.today);
        setData(response.data.today);
      })
      .catch((error) => {
        console.log(error);
      });
      */
  };
  //console.log(today);
  //console.log(data);
  return (
    <>
      <Calendar
        onChange={onChange}
        value={value}
        formatDay={(locale, date) => moment(date).format("DD")}
        minDetail="month"
        maxDetail="month"
        showNeighboringMonth={false} //전 달 || 다음 달 일자 보이기
        selectRange={true}
        className={"calendar"}
      />
      <ChallengeTable date={value} detail={data} />
      <ChallengeBarChart data={week} />
      <ChallengePieChart data={week} />
    </>
  );
};

export default ChallengeGraph;
