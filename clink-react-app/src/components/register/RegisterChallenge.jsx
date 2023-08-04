import BackgroundCircle from './BackgroundCircle';
import { BsPlus } from 'react-icons/bs';
import ChallengeForm from './ChallengeFrom';
import '../../styles/register/RegisterChallenge.css';
import AddAcountForm from './AddAcountForm';
import ChallengePrice from './ChallengePrice';

const RegisterChallenge = () => {
  return (
    <div className="RegisterChallengeWrap">
      <BackgroundCircle />
      <h1 className="RegisterTitle">
        새로운 목표
        <BsPlus />
      </h1>
      <AddAcountForm />
      <ChallengeForm />
      <ChallengePrice />
    </div>
  );
};
export default RegisterChallenge;
