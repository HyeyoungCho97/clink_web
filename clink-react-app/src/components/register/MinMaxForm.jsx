const MinMaxForm = ({ min, max }) => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ textAlign: 'left', width: '50%' }}>
        <b>{min}</b>
      </div>
      <div style={{ textAlign: 'right', width: '50%' }}>
        <b>{max}</b>
      </div>
    </div>
  );
};
export default MinMaxForm;
