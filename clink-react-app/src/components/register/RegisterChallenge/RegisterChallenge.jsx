import ChallengeForm from './ChallengeFrom';
import '../../../styles/register/RegisterChallenge.css';
import AddAcountForm from './AddAcountForm';
import ChallengePrice from './ChallengePrice';
import RegisterBtn from '../Common/RegisterBtn';
import CommonTitle from '../Common/CommonTitle';

const RegisterChallenge = () => {
  return (
    <CommonTitle>
      <AddAcountForm />
      <ChallengeForm />
      <ChallengePrice />
      <div
        className="btnWrap"
        style={{ display: 'flex', justifyContent: 'space-evenly' }}
      >
        <RegisterBtn btnType={'등록'} />
        <RegisterBtn btnType={'취소'} />
      </div>
    </CommonTitle>
  );
};
export default RegisterChallenge;
