// yarn add @nivo/calendar
import { ResponsiveTimeRange } from "@nivo/calendar";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const CalendarGraph = ({ data, continuesDate }) => (
  <>
    <b>현재 {continuesDate}일 연속으로 목표 달성중입니다.</b>
    <ResponsiveTimeRange
      data={data}
      weekdayTicks={[]} //
      weekdayLegendOffset={0} //
      from="2023-04-17" //"2015-03-01"
      to="2023-07-18" //"2016-07-12"
      emptyColor="#eeeeee"
      colors={["#ffc107"]}
      margin={{ top: 40, right: 20, bottom: 0, left: 20 }}
      yearSpacing={50}
      monthBorderColor="#ffffff"
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
    />
  </>
);

export default CalendarGraph;
