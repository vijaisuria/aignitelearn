import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faBook, faRobot } from "@fortawesome/free-solid-svg-icons";
import { BACKEND_API_URL, USER_ID } from "../Constants";

const GoalsDisplay = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user ID from session storage or default to 1
  const userId = sessionStorage.getItem("user_id") || USER_ID;

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_API_URL}goals/user/${userId}`
        );
        setGoals(response.data);
      } catch (err) {
        setError("Failed to fetch goals. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, [userId]);

  if (loading) {
    return <div className="text-center mt-10 text-blue-800">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center  mb-6">My Goals</h1>
      <p className="text-center text-gray-200 mb-6">
        Your Dream Journey: Track, Achieve, and Celebrate!
      </p>
      <div className="border-b-2 border-gray-300 mb-12"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <button
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center text-xl"
          onClick={() => (window.location.href = "/new-goals")}
        >
          <FontAwesomeIcon icon={faMap} className="mr-2" />
          Create New Goal
        </button>
        {goals.map((goal) => (
          <div
            key={goal.GoalID}
            className="bg-white shadow-lg rounded-lg p-4 transition-transform hover:scale-105"
          >
            <h2 className="text-xl font-bold text-purple-700 mb-2">
              {goal.GoalName}
            </h2>
            <p className="text-gray-600 mb-2">
              <span className="font-bold">Description:</span>{" "}
              {goal.GoalDescription}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-bold">Type:</span> {goal.GoalType}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-bold">Start Date:</span> {goal.StartDate}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-bold">Target Date:</span> {goal.TargetDate}
            </p>
            <div className="flex justify-between mt-4">
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center"
                onClick={() =>
                  (window.location.href = `/loading?page=roadmap&goalId=${goal.GoalID}`)
                }
              >
                <FontAwesomeIcon icon={faMap} className="mr-2" />
                Go to Roadmap
              </button>
              <button
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center"
                onClick={() =>
                  (window.location.href = `/learning?goalId=${goal.GoalID}`)
                }
              >
                <FontAwesomeIcon icon={faBook} className="mr-2" />
                Learning Module
              </button>
            </div>
            <div className="mt-4">
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 flex items-center justify-center">
                <FontAwesomeIcon icon={faRobot} className="mr-2" />
                Talk with AIgnite
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalsDisplay;
