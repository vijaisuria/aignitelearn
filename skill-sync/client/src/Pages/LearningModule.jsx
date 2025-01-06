import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SkillCard from "../components/SkillCard";
import RoadmapHeader from "../components/RoadmapHeader";
import { motion } from "framer-motion";
import { BACKEND_API_URL } from "../Constants";

const LearningModule = () => {
  const location = useLocation(); // Access the location object
  const [data, setData] = useState(null); // State to store the API response
  const [loading, setLoading] = useState(true); // State for loading status

  // Helper function to extract query parameters
  const getQueryParam = (param) => {
    const params = new URLSearchParams(location.search);
    return params.get(param);
  };

  const goalId = getQueryParam("goalId"); // Extract `goalId` from query parameters

  useEffect(() => {
    if (!goalId) {
      console.error("No goalId provided in query parameters");
      return;
    }

    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch(`${BACKEND_API_URL}goals/${goalId}`);
        const result = await response.json();

        // Check if RoadmapData exists and set it
        if (result.RoadmapData) {
          // format the result.RoadmapData into json object
          result.RoadmapData = JSON.parse(result.RoadmapData);
          console.log(result.RoadmapData);
          setData(result);
        } else {
          console.error("RoadmapData is null or undefined");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [goalId]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while data is being fetched
  }

  if (!data) {
    return <div>No data available for this module</div>; // Handle no data case
  }

  return (
    <motion.div
      className="container mx-auto px-4 grid gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <RoadmapHeader data={data} />

      {data.RoadmapData.map((field, index) => (
        <motion.section
          key={index}
          className="border rounded-lg bg-white shadow p-6 relative"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 * index }}
        >
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-3">
                <div className="text-xl font-semibold bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full">
                  {index + 1}
                </div>
                <motion.h2
                  className="text-2xl font-semibold text-gray-800"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  {field.field}
                </motion.h2>
              </div>
            </div>

            {/* Progress bar under field name */}
            <div className="w-full mt-2">
              <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500"
                  style={{ width: `${(field.skills.length / 10) * 100}%` }} // Example progress
                />
              </div>
              <span className="text-sm text-gray-600 mt-1 block">
                Progress: {field.skills.length}/10
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {field.skills.map((skill, i) => (
              <SkillCard key={i} skill={skill} />
            ))}
          </div>

          <div className="flex justify-end gap-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Mark as Complete
            </button>
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">
              Skip
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
              Add to Favorites
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              Reset Progress
            </button>
          </div>
        </motion.section>
      ))}
    </motion.div>
  );
};

export default LearningModule;
