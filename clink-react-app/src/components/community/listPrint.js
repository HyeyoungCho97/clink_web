import '../../styles/community/listPrint.css';
import LikeButton from './likeButton';
function ListPrint({ title, list }) {
  const clickPost = (list) => {
  };
  const lists = () => {
    const bestList = [];
    for (let i = 0; i < list.length; i++) {
      bestList.push(
        <li className="li" key={i} onClick={() => clickPost(list[i])}>
          <b className="listNum">{i + 1}</b>
          <b className="boardTi" style={{ overflow: 'hidden' }}>
            {list[i].board_title}
          </b>
          &nbsp; &nbsp;
          {list[i].board_title !== '게시물이 존재하지 않습니다.' ? (
            <>
              <LikeButton className="likeButton" />
              <b className="Like">{list[i].board_like_count}</b>
            </>
          ) : (
            ''
          )}
        </li>
      );
    }
    return bestList;
  };
  return (
    <div className="listForm">
      <p className="listTitle">
        <b>{title}</b>
      </p>
      <ol className="list">{lists()}</ol>
    </div>
  );
}
export default ListPrint;
