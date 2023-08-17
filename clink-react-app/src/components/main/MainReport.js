import moment from "moment";
import category from "../../dataCode/expenseCategory.json";

const MainReport = ({ isReport, data }) => {
  let month = moment(data.yesterday).month() + 1;
  let day = moment(data.yesterday).date();
  let name = sessionStorage.getItem("user_id");
  let percent = Math.round(
    (data.categoryAmount / data.yesterday_used) * 100,
    2
  );
  //만약 빈배열이면 어제날짜 구하기
  if (data.total_saving === null) {
    let today = new Date();
    month = today.getMonth();
    day = today.getDate() - 1;
  }

  return (
    <div className="main-report">
      <div style={{ padding: 10 }}>
        <b style={{ fontSize: "large", marginTop: "50px" }}>
          {month}월 {day}일 {name}님의 결제내역 리포트
          {"\n\n"}
        </b>
        {data.total_saving === null ? (
          <b>전일 결제 내역이 없습니다.</b>
        ) : (
          <>
            <p style={{ fontSize: "14px", textAlign: "left", fontWeight: 700 }}>
              총 사용 금액은 <span id="emphasis">{data.sum}원</span>이고,
              {"\n"}
              {"\n"}이 중{" "}
              <span id="emphasis">
                {category.category[Number(data.category)]}
              </span>{" "}
              카테고리가 차지하는 금액 비중이{" "}
              <span id="emphasis">{percent + "%"}</span>를 차지합니다.{"\n"}
              {"\n"}
              가장 비싼 결제는 <span id="emphasis">{data.high}원</span> 이고,
              가장 저렴한 소비는 <span id="emphasis">{data.low}원</span>
              이었습니다{"\n"}
              {"\n"}
              평균 결제 금액은 <span id="emphasis">{data.avg}원</span> 입니다.
              {"\n"}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default MainReport;
