import "../styles/MainFrame.scss";
import CalendarGraph from "../components/main/CalendarGraph.js";
import MainBackgroundImage from "../images/main_background.svg";
import React, { useEffect, useState } from "react";
import MainHello from "../components/main/MainHello.js";
import MainQuote from "../components/main/MainQuote.js";
import MainSavingTotal from "../components/main/MainSavingTotal.js";
import MainReport from "../components/main/MainReport.js";
import axios from "axios";

const now = new Date();
const name = "chatgpt";

sessionStorage.setItem("userId", "chatgpt");
let userId = sessionStorage.getItem("userId");
if (userId == null) userId = "chatgpt";

const TestView = (props) => {
  const [quote, setQuote] = useState([]);
  const [reportData, setReportData] = useState();
  const [dayData, setDayData] = useState([]);
  const [continuesDate, setContinuesDate] = useState(-1);

  useEffect(() => {
    const getUserData = async () => {
      await axios
        .get("http://localhost:80/main/info?userId=" + userId)
        .then((Response) => {
          console.log(Response.data);
          setQuote([Response.data.quote.author, Response.data.quote.contents]);

          setReportData({
            sum: Response.data.vo.sum,
            month: now.getMonth() + 1,
            day: now.getDay(),
            high: Response.data.vo.high,
            low: Response.data.vo.low,
            avg: Response.data.vo.avg,
            challenge: Response.data.vo.challenge,
            category: "food",
          });

          const tempData = [];
          Response.data.monthData.forEach((number) => {
            tempData.push({ value: number.val, day: number.date });
          });
          setDayData(tempData);

          let cDate = 0;
          for (let i = dayData.length - 1; i >= 1; i--) {
            if (
              new Date(dayData[i].day).getTime() / 10000 -
                new Date(dayData[i - 1].day).getTime() / 10000 >=
                9000 ===
              true
            )
              break;
            else {
              ++cDate;
              setContinuesDate(cDate);
            }
          }
          setContinuesDate(cDate);

          console.log(dayData[dayData.length - 1].day);
        })
        .catch((Error) => {
          console.log("API Error");
        });
    };
    getUserData();
  }, []);

  return (
    <>
      <div
        className="main-div"
        style={{
          backgroundImage: "url(" + MainBackgroundImage + ")",
          paddingBottom: "20%",
        }}
      >
        <MainHello name={name} />
        <MainQuote quote={quote} />
        {dayData && continuesDate >= 0 && (
          <div className="main-calendarGraph">
            <CalendarGraph data={dayData} continuesDate={continuesDate} />
          </div>
        )}
        {reportData && (
          <MainSavingTotal
            saving={reportData.sum}
            totalSave={reportData.challenge}
          />
        )}
        {reportData && <MainReport name={name} data={reportData} />}
      </div>
    </>
  );
};

export default TestView;
