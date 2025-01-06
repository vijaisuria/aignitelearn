import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPython,
  faJsSquare,
  faMailchimp,
} from "@fortawesome/free-brands-svg-icons"; // Brand icons
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-regular-svg-icons"; // Regular icons
const SkillCard = ({ skill }) => {
  return (
    <div className="relative bg-white/30 backdrop-blur-md border border-white/40 shadow-lg rounded-lg p-6 hover:shadow-xl transition transform hover:scale-105">
      {/* Feedback thumbs in top-right corner */}
      <div className="absolute top-2 right-2 flex gap-2">
        <button className="bg-gray-200/70 backdrop-blur-sm hover:bg-green-400 text-gray-700 p-2 rounded-full transition">
          <FontAwesomeIcon icon={faThumbsUp} className="text-xl" />
        </button>
        <button className="bg-gray-200/70 backdrop-blur-sm hover:bg-red-400 text-gray-700 p-2 rounded-full transition">
          <FontAwesomeIcon icon={faThumbsDown} className="text-xl" />
        </button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <h4 className="text-lg font-semibold text-gray-800">{skill.skill}</h4>
      </div>
      <p className="text-gray-600 mb-4">{skill.description}</p>
      {skill.prerequisites.length > 0 && (
        <div className="mt-4">
          <strong className="block text-gray-700 mb-2">Prerequisites:</strong>
          <ul className="list-disc list-inside text-gray-600">
            {skill.prerequisites.map((pre, i) => (
              <li key={i}>{pre}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SkillCard;
