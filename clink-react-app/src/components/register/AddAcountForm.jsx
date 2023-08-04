import AddAccount from '../AddAccount';
import ShowAccount from '../ShowAccount';
import Title from './Title';

const AddAcountForm = () => {
  return (
    <>
      <Title title={'계좌등록'} />
      <AddAccount className="MyPageAddAccount" />
      <ShowAccount className="MyPageAddAccount" />
    </>
  );
};
export default AddAcountForm;
