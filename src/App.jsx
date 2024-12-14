import Options from "./components/Options/Options";
import Feedback from "./components/Feedback/Feedback";
import Description from "./components/Description/Description";
import Notification from "./components/Notification/Notification";

import { useState, useEffect } from "react";

const App = () => {
  // Ініціалізація стану
  const [feedback, setFeedback] = useState(() => {
    // Отримуємо дані з локального сховища або задаємо початкові значення
    const savedFeedback = localStorage.getItem("feedback");
    return savedFeedback ? JSON.parse(savedFeedback) : { good: 0, neutral: 0, bad: 0 };
  });

  // Використання useEffect для збереження стану в localStorage при його зміні
  useEffect(() => {
    localStorage.setItem("feedback", JSON.stringify(feedback));
  }, [feedback]);

  // Функція для оновлення стану
  const updateFeedback = (feedbackType) => {
    switch (feedbackType) {
      case "good":
        return setFeedback((prev) => ({ ...prev, good: prev.good + 1 }));
      case "neutral":
        return setFeedback((prev) => ({ ...prev, neutral: prev.neutral + 1 }));
      case "bad":
        return setFeedback((prev) => ({ ...prev, bad: prev.bad + 1 }));
      default:
        break;
    }
  };

  // Обчислюємо загальну кількість відгуків
  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;

  const message = "No feedback yet";
  // Функція для скидання стану
  const resetFeedback = () => {
    setFeedback({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };
  // Для підрахунку відсотка позитивних відгуків можна використовувати наступну формулу:
  const positiveFeedback = Math.round((feedback.good / totalFeedback) * 100) + "%";

  return (
    <>
      <Description />
      {/* Передаємо updateFeedback та resetFeedback в Options */}
      <Options 
      updateFeedback={updateFeedback} 
      resetFeedback={resetFeedback} 
      totalFeedback={totalFeedback}/>
      {/* Передаємо feedback в Feedback */}
      {/* Умовний рендеринг: компонент Feedback рендериться тільки коли totalFeedback > 0 */}
      {totalFeedback > 0 && (
        <Feedback feedback={feedback} totalFeedback={totalFeedback} positiveFeedback={positiveFeedback}/>
      )}
      {/* Умовний рендеринг: показуємо Notification, якщо немає відгуків */}
      {totalFeedback === 0 && <Notification message={message} />}
    </>
  );
};

export default App;
