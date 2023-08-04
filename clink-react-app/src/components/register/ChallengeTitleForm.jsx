import Form from 'react-bootstrap/Form';

const ChalltengeTitleForm = () => {
  return (
    <>
      <Form.Group className="" controlId="formPost">
        <Form.Control
          type="text"
          placeholder="챌린지 제목을 입력하세요"
          className="challengeTitle"
        />
        <br />
      </Form.Group>
    </>
  );
};
export default ChalltengeTitleForm;
