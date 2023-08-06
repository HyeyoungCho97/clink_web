import 'bootstrap/dist/css/bootstrap.min.css';
import { BsPlus } from 'react-icons/bs';
import '../../styles/AddAccount.scss';
import { Link } from 'react-router-dom';

const GoRegisterChallenge = () => {
  return (
    <div className="addAccount">
      <div className="addAccountConsumptionBox" style={{ width: '100%' }}>
        <Link
          to="/add-account-form"
          style={{
            textDecoration: 'none',
            display: 'flex',
            lineHeight: '100%',
          }}
        >
          <h2 style={{ width: '100%' }}>
            <b>챌린지 등록</b>
          </h2>
          <BsPlus />
        </Link>
      </div>
    </div>
  );
};

export default GoRegisterChallenge;
