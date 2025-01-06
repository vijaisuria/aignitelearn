import React from "react";
import Stepper from "./Stepper";

const RoadmapHeader = ({ data }) => {
  const steps = data.RoadmapData.map((field) => field.field);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center my-8">
        <img
          src="/Logo.png"
          alt="Company Logo"
          className="mx-auto max-w-[150px] h-auto"
        />
        <h1 className="text-3xl font-bold my-4">Goal: {data.GoalName}</h1>
        <h2 className="text-2xl text-gray-400">{data.GoalDescription}</h2>
        <h4 className="mt-1 text-xl font-medium">
          Duration: {data.StartDate} - {data.TargetDate}
        </h4>
      </div>
      <Stepper steps={steps} activeStep={2} />
    </div>
  );
};

export default RoadmapHeader;
