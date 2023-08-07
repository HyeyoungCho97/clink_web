import { useState } from 'react';
import Title from '../Common/Title';
import MinMaxForm from './MinMaxForm';
const ChallengePrice = () => {
  const [value, setValue] = useState(0);
  const onchange = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      <Title title={'목표금액'} />
      <MinMaxForm min={value} max={50000} />
      <input
        type="range"
        className="range"
        min={0}
        max={50000}
        step={1000}
        onChange={onchange}
      ></input>
    </>
  );
};
export default ChallengePrice;
