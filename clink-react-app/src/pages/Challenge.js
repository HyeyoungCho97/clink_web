import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/challenge/Challenge.scss";
import ChallengeTitle from "../components/Challenge/ChallengeTitle";
import ChallengeGoal from "../components/Challenge/ChallengeGoal";
import Header from "../components/common/Header";
import ChallengeGraph from "../components/Challenge/ChallengeGraph";

const Challenge = () => {
  const [ChallengeTitleText, setChallengeTitleText] = useState();
  const [ChallengeDescriptionText, setChallengeDescruotuibText] = useState();
  const [max, setMax] = useState();
  const [value, setValue] = useState();
  const [todayData, setTodayData] = useState([]);
  const [weekData, setWeekData] = useState([]);

  useEffect(() => {
    const address =
      "http://ec2-43-202-97-102.ap-northeast-2.compute.amazonaws.com:8000/challenge/main-info?userNo=00000";
    //+sessionStorage.getItem("userNo");
    axios
      .get(address)
      .then((response) => {
        //console.log(response.data.chart);
        let chart = response.data.chart;
        setChallengeTitleText(response.data.title);
        setChallengeDescruotuibText(response.data.description);
        setMax(response.data.goal);
        setValue(response.data.value);
        setTodayData(response.data.today);
        setWeekData(chart);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="Challenge" style={{ paddingBottom: "20%" }}>
      <div id="backgroundCircle"></div>
      <div className="challengContent">
        <Header />
        <ChallengeTitle
          title={ChallengeTitleText}
          description={ChallengeDescriptionText}
        />
        <ChallengeGoal value={value} max={max} />
        <ChallengeGraph today={todayData} week={weekData} />
      </div>
    </div>
  );
};

export default Challenge;
