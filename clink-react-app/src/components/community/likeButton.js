import { BiLike } from '@react-icons/all-files/bi/BiLike';
import { IoArrowUndoSharp } from '@react-icons/all-files/io/ArrowUndoSharp';
function LikeButton() {
  const onclick = () => {
    alert('gkdl');
  };
  return (
    <>
      <BiLike onClick={onclick} />
    </>
  );
}
export default LikeButton;
