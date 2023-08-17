import "../styles/main/MainFrame.scss";
import CalendarGraph from "../components/main/CalendarGraph.js";
import MainBackgroundImage from "../images/main_background.svg";
import React, { useEffect, useState } from "react";
import Header from "../components/common/Header.js";
import MainHello from "../components/main/MainHello.js";
import MainQuote from "../components/main/MainQuote.js";
import MainSavingTotal from "../components/main/MainSavingTotal.js";
import MainReport from "../components/main/MainReport.js";
import axios from "axios";
import NoChallenge from "../components/register/NoChallenge/NoChallengeForm";
import { getAuthHeader, callRefresh } from "../components/common/JwtAuth";

const MainFrame = (props) => {
  const [badge, setBadge] = useState("001");
  const [quote, setQuote] = useState([]);
  const [streakData, setStreakData] = useState();
  const [reportData, setReportData] = useState();
  const [isReport, setIsReport] = useState(false);
  const [checkChallenge, setCheckChallenge] = useState(
    sessionStorage.getItem("challengeCheck")
  );
  const [continuesDate, setContinuesDate] = useState(1);

  //연속일수 구하는 함수
  function getContinuesDate(dayData) {
    let cDate = 1;
    let continueity = true;
    let idx = 0;

    if (dayData.length === 0) {
      continueity = false;
      cDate = 0;
    }
    while (continueity) {
      //하루차이나면 +1
      if (
        (new Date(dayData[idx].day).getTime() -
          new Date(dayData[idx + 1].day).getTime()) /
          (1000 * 60 * 60 * 24) ===
        1
      ) {
        cDate = cDate + 1;
        idx = idx + 1;
      } else {
        //아니면 종료
        continueity = false;
      }
    }
    setContinuesDate(cDate);
  }

  useEffect(() => {
    //console.log(sessionStorage.getItem("challengeCheck"));
    const getUserData = async () => {
      try {
        const headersWithAuth = getAuthHeader();

        const response = await axios.get(
          "http://ec2-43-202-97-102.ap-northeast-2.compute.amazonaws.com:8000/main/info?userNo=" +
            sessionStorage.getItem("user_no"),
          {
            headers: headersWithAuth,
          }
        );
        //console.log(response);
        if (response.data !== "") {
          //console.log(response);
          setBadge(response.data.badge);
          setQuote(response.data.quote);
          setStreakData(response.data.streakData);
          setReportData(response.data.report);
          if (response.data.streakData.streakData.length !== 0)
            setIsReport(true);
          getContinuesDate(response.data.streakData.streakData);
          setCheckChallenge(true);
          //console.log(response.data.report.total_saving);
          //console.log(reportData);
        } else {
          setCheckChallenge(false);
          console.log("없졍");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  return (
    <>
      <div className="backgroundCircle"></div>
      {checkChallenge >= 1 ? (
        <div
          className="main-div"
          style={{
            backgroundImage: "url(" + MainBackgroundImage + ")",
            paddingBottom: "20%",
          }}
        >
          <Header />
          <MainHello badge={badge} />
          <MainQuote quote={quote} />
          {isReport && (
            <MainSavingTotal
              saving={reportData.yesterday_saving}
              totalSave={reportData.total_saving}
            />
          )}
          {streakData && (
            <CalendarGraph data={streakData} continuesDate={continuesDate} />
          )}
          {reportData && <MainReport data={reportData} />}
        </div>
      ) : (
        <>
          <NoChallenge />
        </>
      )}
    </>
  );
};

export default MainFrame;
