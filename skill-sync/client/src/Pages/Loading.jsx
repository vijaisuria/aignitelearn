import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const LoadingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = searchParams.get("page");
  const goalId = searchParams.get("goalId");
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Hang tight! We're crafting your personalized experience.";

  const typeWriter = () => {
    let currentText = "";
    let index = 0;

    const typeWriterInterval = setInterval(() => {
      if (index < fullText.length) {
        currentText += fullText[index];
        setDisplayedText(currentText);
        index++;
      } else {
        clearInterval(typeWriterInterval); // Stop interval when text is fully typed
        fetchLearningPath(); // Fetch data after typing animation completes
      }
    }, 60); // Adjust typing speed as needed

    return () => clearInterval(typeWriterInterval); // Cleanup function to clear interval
  };

  useEffect(typeWriter, []); // Run typewriter effect once on component mount

  useEffect(() => {
    const timer = setTimeout(() => {
      if (page === "roadmap") {
        navigate(`/roadmap?goalId=${goalId}`);
      } else if (page === "learning") {
        navigate(`/learning?goalId=${goalId}`);
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, [page, goalId, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <img src="/loading1.gif" alt="Loading animation" className="w-1/3 mb-4" />
      <p className="text-lg font-medium text-gray-700">{displayedText}</p>
    </div>
  );
};

export default LoadingPage;
