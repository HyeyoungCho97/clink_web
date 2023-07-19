// import { useEffect, useState } from 'react';
import './newsAPI.css';
function News({ data, idx }) {
  return (
    <div>
      {data && (
        <div className="newWrap">
          <a href={data[idx].url} target="blank">
            <img src={data[idx].urlToImage} alt={data[idx].title} />
          </a>
          <p className="newsTitle">
            <b>{data[idx].title}</b>
          </p>
        </div>
      )}
    </div>
  );
}
export default News;
