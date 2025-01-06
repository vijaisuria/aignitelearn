const request = require("supertest");
const express = require("express");
const app = require("./index"); // Assuming your main file is exporting the app
const { getUniversalSkills, getLearningPath } = require("./index");

jest.mock("./index", () => {
  const originalModule = jest.requireActual("./index");
  return {
    ...originalModule,
    getUniversalSkills: jest.fn(),
    getLearningPath: jest.fn(),
  };
});

describe("POST /generate-learning-path", () => {
  it("should generate a learning path and return JSON data", async () => {
    const role = "Frontend Developer";
    const userSkills = ["HTML", "CSS"];
    const universalSkills =
      "HTML (Already Have), CSS (Already Have), JavaScript";
    const learningPath = `
            [
                {
                    "field": "Web Development Fundamentals",
                    "skills": [
                        {
                            "skill": "HTML (already have)",
                            "description": "Semantic HTML5, structuring web pages.",
                            "prerequisites": []
                        },
                        {
                            "skill": "CSS (already have)",
                            "description": "Styling web pages, box model, selectors, responsive design.",
                            "prerequisites": ["HTML"]
                        },
                        {
                            "skill": "JavaScript",
                            "description": "DOM manipulation, asynchronous programming, event handling.",
                            "prerequisites": ["HTML", "CSS"]
                        }
                    ]
                }
            ]
        `;

    getUniversalSkills.mockResolvedValue(universalSkills);
    getLearningPath.mockResolvedValue(learningPath);

    const response = await request(app)
      .post("/generate-learning-path")
      .send({ role, userSkills });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("jsonData");
    expect(response.body.jsonData).toEqual(JSON.parse(learningPath));
  });

  it("should return a 500 error if an error occurs", async () => {
    getUniversalSkills.mockRejectedValue(new Error("Test error"));

    const response = await request(app)
      .post("/generate-learning-path")
      .send({ role: "Frontend Developer", userSkills: ["HTML", "CSS"] });

    expect(response.status).toBe(500);
    expect(response.text).toBe(
      "An error occurred while generating the learning path."
    );
  });

  jest.mock("./index", () => {
    const originalModule = jest.requireActual("./index");
    return {
      ...originalModule,
      getUniversalSkills: jest.fn(),
      getLearningPath: jest.fn(),
    };
  });

  describe("POST /generate-learning-path", () => {
    it("should generate a learning path and return JSON data", async () => {
      const role = "Frontend Developer";
      const userSkills = ["HTML", "CSS"];
      const universalSkills =
        "HTML (Already Have), CSS (Already Have), JavaScript";
      const learningPath = `
              [
                  {
                      "field": "Web Development Fundamentals",
                      "skills": [
                          {
                              "skill": "HTML (already have)",
                              "description": "Semantic HTML5, structuring web pages.",
                              "prerequisites": []
                          },
                          {
                              "skill": "CSS (already have)",
                              "description": "Styling web pages, box model, selectors, responsive design.",
                              "prerequisites": ["HTML"]
                          },
                          {
                              "skill": "JavaScript",
                              "description": "DOM manipulation, asynchronous programming, event handling.",
                              "prerequisites": ["HTML", "CSS"]
                          }
                      ]
                  }
              ]
          `;

      getUniversalSkills.mockResolvedValue(universalSkills);
      getLearningPath.mockResolvedValue(learningPath);

      const response = await request(app)
        .post("/generate-learning-path")
        .send({ role, userSkills });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("jsonData");
      expect(response.body.jsonData).toEqual(JSON.parse(learningPath));
    });

    it("should return a 500 error if an error occurs", async () => {
      getUniversalSkills.mockRejectedValue(new Error("Test error"));

      const response = await request(app)
        .post("/generate-learning-path")
        .send({ role: "Frontend Developer", userSkills: ["HTML", "CSS"] });

      expect(response.status).toBe(500);
      expect(response.text).toBe(
        "An error occurred while generating the learning path."
      );
    });
  });

  describe("getUniversalSkills", () => {
    it("should return a formatted list of universal skills", async () => {
      const role = "Frontend Developer";
      const existingSkills = ["HTML", "CSS"];
      const universalSkills = "HTML (Already Have), CSS (Already Have), JavaScript";

      const mockModel = {
        generateContent: jest.fn().mockResolvedValue({
          response: {
            text: jest.fn().mockResolvedValue(universalSkills),
          },
        }),
      };

      genAI.getGenerativeModel = jest.fn().mockReturnValue(mockModel);

      const result = await getUniversalSkills(role, existingSkills);
      expect(result).toBe(universalSkills);
    });

    it("should throw an error if the model fails to generate content", async () => {
      const role = "Frontend Developer";
      const existingSkills = ["HTML", "CSS"];

      const mockModel = {
        generateContent: jest.fn().mockRejectedValue(new Error("Test error")),
      };

      genAI.getGenerativeModel = jest.fn().mockReturnValue(mockModel);

      await expect(getUniversalSkills(role, existingSkills)).rejects.toThrow(
        "Test error"
      );
    });


  });
});
