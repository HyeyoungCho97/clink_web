import Button from 'react-bootstrap/Button';
import '../../../styles/MyPage.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getAuthHeader, callRefresh } from '../../common/JwtAuth';
/* *params
challenge_title : ,
challenge_amount :   

*/
const RegisterBtn = ({ btnType, title, description, amount }) => {
  const navigate = useNavigate();
  const test = async (e) => {
    const user_no = '01010';
    const challenge_no = '12345';
    const param = {
      challenge_title: title,
      challenge_description: description,
      challenge_amount: amount,
      user_no: user_no,
      challenge_no: challenge_no,
    };
    await axios.post('http://localhost:80/challenge/register', param, {
      headers: getAuthHeader(),
    });
    navigate('/Main');
  };
  return (
    <>
      {btnType === '등록' ? (
        <Button type="button" onClick={test}>
          {btnType}
        </Button>
      ) : (
        <Button onClick={() => navigate(-1)}>{btnType}</Button>
      )}
    </>
  );
};
export default RegisterBtn;
