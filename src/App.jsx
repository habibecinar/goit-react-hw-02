import "./App.css";
import Options from "./components/Options";
import { useState, useEffect } from "react";

function App() {
  // State değişkenlerini tanımla
  const [good, setGood] = useState(() => Number(localStorage.getItem("good")) || 0);
  const [neutral, setNeutral] = useState(
    () => Number(localStorage.getItem("neutral")) || 0
  );
  const [bad, setBad] = useState(
    () => Number(localStorage.getItem("bad")) || 0
  );

  useEffect(() => {
    localStorage.setItem("good", good);
    localStorage.setItem("neutral", neutral);
    localStorage.setItem("bad", bad);
  }, [good, neutral, bad]);

  // updateFeedback fonksiyonu
  const updateFeedback = (type) => {
    if (type === "good") setGood(good + 1);
    else if (type === "neutral") setNeutral(neutral + 1);
    else if (type === "bad") setBad(bad + 1);
  };
  // Total feedback hesapla
  const totalFeedback = good + neutral + bad;

  // Feedback sıfırlama fonksiyonu
  const resetFeedback = () => {
    setGood(0);
    setNeutral(0);
    setBad(0);

    // localStorage'dan da sil
    localStorage.removeItem("good");
    localStorage.removeItem("neutral");
    localStorage.removeItem("bad");
  };
  
  // Positive (Good) yüzdesi
  const positivePercentage =
    totalFeedback > 0 ? Math.round((good / totalFeedback) * 100) : 0;

  return (
    <>
      <div>
        <h1>Sip Happens Café</h1>
        <h3>
          Please leave your feedback about our service by selecting one of the
          options below.
        </h3>
      </div>
      <Options
        updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
        resetFeedback={resetFeedback}
      />
      <div>
        {totalFeedback > 0 ? (
          <>
            <h4>Good: {good}</h4>
            <h4>Neutral: {neutral}</h4>
            <h4>Bad: {bad}</h4>
            <h4>Positive: {positivePercentage}%</h4>
            <button onClick={resetFeedback}>Reset</button>
          </>
        ) : (
          <p>No feedback yet.</p>
        )}
      </div>
    </>
  );
}

export default App;
