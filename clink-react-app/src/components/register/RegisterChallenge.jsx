import BackgroundCircle from './BackgroundCircle';
import { BsPlus } from 'react-icons/bs';
import ChallengeForm from './ChallengeFrom';
import '../../styles/register/RegisterChallenge.css';
import AddAcountForm from './AddAcountForm';
import ChallengePrice from './ChallengePrice';
import RegisterBtn from './RegisterBtn';
import Nochallenge from './NoChallenge';

const RegisterChallenge = () => {
  return (
    <div className="RegisterChallengeWrap">
      <BackgroundCircle />
      <h1 className="RegisterTitle">
        새로운 목표
        <BsPlus />
      </h1>
      <Nochallenge />
      {/* <AddAcountForm />
      <ChallengeForm />
      <ChallengePrice />
      <div
        className="btnWrap"
        style={{ display: 'flex', justifyContent: 'space-evenly' }}
      >
        <RegisterBtn btnType={'등록'} />
        <RegisterBtn btnType={'취소'} />
      </div> */}
    </div>
  );
};
export default RegisterChallenge;
