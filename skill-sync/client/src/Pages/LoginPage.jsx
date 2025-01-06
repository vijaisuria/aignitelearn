import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

const SkillSyncPortal = () => {
  return (
    <div className="relative min-h-screen grid bg-black">
      <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0">
        {/* Left Section */}
        <div className="relative sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden text-white bg-no-repeat bg-cover">
          <div className="absolute bg-black opacity-25 inset-0 z-0"></div>
          <div className="w-full lg:max-w-2xl md:max-w-md z-10 items-center text-center">
            <div className="font-bold leading-tight mb-6 mx-auto w-full content-center items-center">
              <img
                src="/logo-text.png"
                alt="AIgnite Learn"
                className=" w-auto"
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:flex md:items-center md:justify-left w-full sm:w-auto md:h-full xl:w-1/2 p-8 md:p-10 lg:p-14 sm:rounded-lg md:rounded-none">
          <div className="max-w-xl w-full space-y-12">
            <div className="lg:text-left text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Welcome back!
              </h2>
              <p className="text-white mb-8">
                Welcome back to our Skill Sync Portal, powered by AIgnite Learn.
              </p>
              <div className="flex items-center justify-center">
                <div className="bg-black flex flex-col border border-gray-900 rounded-lg px-8 py-10">
                  <form className="flex flex-col space-y-8 mt-10">
                    <label className="font-bold text-lg text-white">
                      Upload Resume
                    </label>
                    <input
                      type="file"
                      name="resume"
                      className="border rounded-lg py-3 px-3 bg-black border-indigo-600 text-white"
                    />
                    <button
                      type="button"
                      className="flex items-center justify-center border border-indigo-600 bg-indigo-600 text-white rounded-lg py-3 font-semibold mt-4 hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
                      onClick={() =>
                        (window.location.href =
                          "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86esikhquc3kvq&redirect_uri=http%3A%2F%2F127.0.0.1%3A8000%2Fauth%2Flinkedin%2Fcallback&state=YF67HJGT9WD&scope=profile%20email%20openid")
                      }
                    >
                      <FontAwesomeIcon icon={faLinkedin} className="mr-2" />{" "}
                      Sign in with LinkedIn
                    </button>
                    <p className="text-sm text-gray-400 mt-4">
                      This ensures your information is up-to-date with our
                      knowledge base. You can skip if there is no change since
                      your last update. Thanks!
                    </p>
                    <button
                      type="submit"
                      className="border border-indigo-600 bg-black text-white rounded-lg py-3 font-semibold"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="text-indigo-600 mt-4 underline"
                      onClick={() => (window.location.href = "/goals")}
                    >
                      Skip
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillSyncPortal;
