import { useState, useEffect } from "react";
import Description from "../Description/Description";
import Options from "../Options/Options";
import Feedback from "../Feedback/Feedback";
import Notification from "../Notification/Notification";

export default function App() {
  const [response, setClicks] = useState(() => {
    const savedFeedback = window.localStorage.getItem("feedback");

    if (savedFeedback !== null) {
      return JSON.parse(savedFeedback);
    }
    return { good: 0, neutral: 0, bad: 0 };
  });

  useEffect(() => {
    window.localStorage.setItem("feedback", JSON.stringify(response));
  }, [response]);

  const totalFeedback = response.good + response.neutral + response.bad;
  const positiveFeedback = Math.round((response.good / totalFeedback) * 100);

  const updateFeedback = (feedbackType) => {
    setClicks({
      ...response,
      [feedbackType]: response[feedbackType] + 1,
    });
  };

  const resetFeedback = () => {
    setClicks({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  return (
    <>
      <Description />
      <Options
        onUpdate={updateFeedback}
        onReset={resetFeedback}
        total={totalFeedback}
      />
      {totalFeedback === 0 ? (
        <Notification />
      ) : (
        <Feedback
          value={response}
          total={totalFeedback}
          positive={positiveFeedback}
        />
      )}
    </>
  );
}
