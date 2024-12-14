// Options.jsx
import s from './Options.module.css';

const Options = ({ updateFeedback, resetFeedback, totalFeedback }) => {
  return (
    <div className={s.btn_group}>
      {/* Кнопки для оновлення відгуків */}
      <button className={s.btn_green} onClick={() => updateFeedback("good")}>Good</button>
      <button className={s.btn_yellow} onClick={() => updateFeedback("neutral")}>Neutral</button>
      <button className={s.btn_red}  onClick={() => updateFeedback("bad")}>Bad</button>

      {/* Умовний рендеринг кнопки Reset */}
      {totalFeedback > 0 && <button onClick={resetFeedback}>Reset</button>}
    </div>
  );
  
};

export default Options;
