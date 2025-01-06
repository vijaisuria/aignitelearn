import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import { BACKEND_API_URL, USER_ID } from "../Constants";

const GoalsLandingPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    GoalName: "",
    GoalType: "Short-Term",
    GoalDescription: "",
    StartDate: "",
    TargetDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newGoal = { ...formData, UserID: USER_ID };

    try {
      const response = await axios.post(BACKEND_API_URL + "goals/", newGoal, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Goal added successfully!");
        navigate("/profile");
      } else {
        toast.error(
          `Failed to add goal: ${response.data.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Failed to add goal:", error);
      toast.error(
        `Failed to add goal: ${
          error.response?.data?.message || "Network error"
        }`
      );
    }
  };

  return (
    <div className="container mx-auto p-6">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center  mb-6">Create New Goal</h1>
      <p className="text-center text-gray-400 mb-6">
        Dream big, aim high, and create goals that push you to greatness. Your
        journey starts now!
      </p>
      <div className="border-b-2 border-gray-300 mb-12"></div>

      <form
        onSubmit={handleFormSubmit}
        className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg p-6 mb-4"
      >
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="GoalName">
            Goal Name
          </label>
          <input
            type="text"
            id="GoalName"
            name="GoalName"
            className="bg-transparent border border-white rounded-lg w-full p-2"
            value={formData.GoalName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="GoalType">
            Goal Type
          </label>
          <select
            id="GoalType"
            name="GoalType"
            className="border border-white bg-transparent rounded-lg w-full p-2"
            value={formData.GoalType}
            onChange={handleInputChange}
            required
          >
            <option value="Short-Term">Short Term</option>
            <option value="Long-Term">Long Term</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="GoalDescription">
            Goal Description
          </label>
          <textarea
            id="GoalDescription"
            name="GoalDescription"
            className="border border-white bg-transparent rounded-lg w-full p-2"
            value={formData.GoalDescription}
            onChange={handleInputChange}
            rows="3"
            required
          ></textarea>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block font-bold mb-2" htmlFor="StartDate">
              Start Date
            </label>
            <input
              type="date"
              id="StartDate"
              name="StartDate"
              className="border border-white bg-transparent rounded-lg w-full p-2"
              value={formData.StartDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex-1">
            <label className="block font-bold mb-2" htmlFor="TargetDate">
              End Date
            </label>
            <input
              type="date"
              id="TargetDate"
              name="TargetDate"
              className="border border-white bg-transparent rounded-lg w-full p-2"
              value={formData.TargetDate}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
        >
          Submit Goal
        </button>
      </form>
    </div>
  );
};

export default GoalsLandingPage;
