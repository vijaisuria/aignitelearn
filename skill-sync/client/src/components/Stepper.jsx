import React from "react";

const Stepper = ({ steps, activeStep }) => {
  return (
    <div className="flex flex-wrap items-center justify-center">
      {steps.map((step, index) => {
        const isCompleted = index < activeStep;
        const isActive = index === activeStep;

        return (
          <div
            key={index}
            className="flex flex-col items-center w-1/6 min-w-[60px] mb-4"
          >
            {/* Step Circle */}
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 
                ${isCompleted ? "bg-green-500 border-green-500 text-white" : ""}
                ${isActive ? "bg-blue-500 border-blue-500 text-white" : ""}
                ${
                  !isCompleted && !isActive
                    ? "bg-gray-200 border-gray-300 text-gray-500"
                    : ""
                }
              `}
            >
              {isCompleted ? "✔" : index + 1}
            </div>

            {/* Step Label */}
            <div className="text-center mt-2">
              <span
                className={`text-xs font-medium break-words 
                  ${isCompleted ? "text-green-500" : ""}
                  ${isActive ? "text-blue-500" : ""}
                  ${!isCompleted && !isActive ? "text-gray-500" : ""}
                `}
              >
                {step}
              </span>
            </div>

            {/* Step Connector */}
            {index < steps.length - 1 && (
              <div
                className={`h-px w-full max-w-[50px] mx-auto mt-2 
                  ${isCompleted ? "bg-green-500" : "bg-gray-300"}
                `}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;

// Usage Example
// <Stepper steps={["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Step 6", "Step 7", "Step 8", "Step 9", "Step 10", "Step 11", "Step 12", "Step 13"]} activeStep={5} />
