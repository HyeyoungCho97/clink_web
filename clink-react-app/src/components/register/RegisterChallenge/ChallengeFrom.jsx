import Form from 'react-bootstrap/Form';
import ChalltengeTitleForm from './ChallengeTitleForm';
import Title from '../Common/Title';
const ChallengeForm = () => {
  return (
    <Form className="FromWrap">
      <Title title={'챌린지 제목'} />
      <ChalltengeTitleForm />
    </Form>
  );
};
export default ChallengeForm;
