import { useState, useEffect } from "react";
import Description from "./components/Description/Description";
import Options from "./components/Options/Options";
import Feedback from "./components/Feedback/Feedback";
import Notification from "./components/Notification/Notification";

export default function App() {
  const [clicks, setClicks] = useState(() => {
    const savedClicks = window.localStorage.getItem("saved-clicks");

    if (savedClicks !== null) {
      return JSON.parse(savedClicks);
    }
    return { good: 0, neutral: 0, bad: 0 };
  });

  useEffect(() => {
    window.localStorage.setItem("saved-clicks", JSON.stringify(clicks));
  }, [clicks]);

  const totalFeedback = clicks.good + clicks.neutral + clicks.bad;
  const positiveFeedback = Math.round((clicks.good / totalFeedback) * 100);

  const updateFeedback = (feedbackType) => {
    feedbackType === "good" &&
      setClicks({
        ...clicks,
        good: clicks.good + 1,
      });

    feedbackType === "neutral" &&
      setClicks({
        ...clicks,
        neutral: clicks.neutral + 1,
      });

    feedbackType === "bad" &&
      setClicks({
        ...clicks,
        bad: clicks.bad + 1,
      });

    feedbackType === "reset" &&
      setClicks({
        good: 0,
        neutral: 0,
        bad: 0,
      });
  };

  return (
    <>
      <Description />
      <Options onUpdate={updateFeedback} total={totalFeedback} />
      {totalFeedback === 0 ? (
        <Notification />
      ) : (
        <Feedback
          value={clicks}
          total={totalFeedback}
          positive={positiveFeedback}
        />
      )}
    </>
  );
}
