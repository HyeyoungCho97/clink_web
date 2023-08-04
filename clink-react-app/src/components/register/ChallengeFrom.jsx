import Form from 'react-bootstrap/Form';
import ChalltengeTitleForm from './ChallengeTitleForm';
import Title from './Title';
const ChallengeForm = () => {
  return (
    <Form className="FromWrap">
      <Title title={'챌린지 이름'} />
      <ChalltengeTitleForm />
    </Form>
  );
};
export default ChallengeForm;
