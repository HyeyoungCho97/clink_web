import QuoteBackgroundImage from '../../images/main_quote.svg';

const MainQuote = ({ quote }) => {
  return (
    <div
      className="main-quote"
      style={{ backgroundImage: 'url(' + QuoteBackgroundImage + ')' }}
    >
      <div style={{ padding: 10 }}>
        {quote[1]} {"\n\n"} - {quote[0]} -
      </div>
    </div>
  );
};

export default MainQuote;
