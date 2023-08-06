import Button from 'react-bootstrap/Button';
import '../../styles/MyPage.scss';
const RegisterBtn = ({ btnType }) => {
  return (
    <>
      {btnType === '등록' ? (
        <Button type="submit">{btnType}</Button>
      ) : (
        <Button>{btnType}</Button>
      )}
    </>
  );
};
export default RegisterBtn;
