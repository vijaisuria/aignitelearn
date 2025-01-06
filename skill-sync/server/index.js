const express = require("express");
const axios = require("axios");
const app = express();
const path = require("path");

var cors = require("cors");
app.use(cors());

require("dotenv").config();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));

// Middleware to parse JSON request bodies
app.use(express.json());

const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

// Initialize Azure OpenAI client
const endpoint = process.env.AZURE_OPENAI_ENDPOINT; // Get from .env
const apiKey = process.env.AZURE_OPENAI_API_KEY; // Get from .env
const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));

// Define the schema for the learning pathway
const schema = {
  description: "Structured learning pathway",
  type: "array",
  items: {
    type: "object",
    properties: {
      field: {
        type: "string",
        description:
          "The category or field of the learning pathway, e.g., Frontend Development, Backend Development",
        nullable: false,
      },
      skills: {
        type: "array",
        description: "List of skills under the field",
        items: {
          type: "object",
          properties: {
            skill: {
              type: "string",
              description: "The specific skill, e.g., JavaScript, React",
              nullable: false,
            },
            description: {
              type: "string",
              description:
                "A brief description of the skill and its importance",
              nullable: false,
            },
            prerequisites: {
              type: "array",
              description:
                "List of prerequisites required for learning this skill",
              items: {
                type: "string",
                description: "A prerequisite skill, e.g., HTML, CSS",
              },
              nullable: true,
            },
          },
          required: ["skill", "description"],
        },
      },
    },
    required: ["field", "skills"],
  },
};

// Function to get universal skills
async function getUniversalSkills(role, existingSkills) {
  const existingSkillsFormatted = existingSkills.join(", ");

  // Prompt to generate universal skills
  const prompt = `I am planning to become proficient as a ${role}. 
My current skills are: ${existingSkillsFormatted}.
Based on my role and existing skills, provide me with a comma-separated list of universal skills I should acquire to become proficient. 
Label skills I already have with '(Already Have)' and provide other skills in sequence of learning priority.`;

  const deploymentName = "gpt-4"; // Replace with your Azure OpenAI deployment name

  const response = await client.getCompletions(deploymentName, [
    {
      prompt,
      maxTokens: 500,
      temperature: 0.7,
    },
  ]);

  const text = response.choices[0].text.trim();
  return text;
}

// Function to get the learning path
async function getLearningPath(role, universalSkills) {
  const prompt = `
You are an expert in designing structured learning paths. I want to become a ${role}, and ${universalSkills} represents a universal set of skills necessary to excel in this role. 
Your task is to generate a detailed JSON object representing the learning path.

### Desired Format:
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
        "skill": "CSS",
        "description": "Styling web pages, box model, selectors, responsive design.",
        "prerequisites": ["HTML"]
      },
      {
        "skill": "JavaScript",
        "description": "DOM manipulation, asynchronous programming, event handling.",
        "prerequisites": ["HTML", "CSS"]
      }
    ]
  },
  {
    "field": "Advanced Concepts",
    "skills": [
      {
        "skill": "API Integration",
        "description": "Fetching data from REST APIs using Fetch API or Axios.",
        "prerequisites": ["JavaScript"]
      }
    ]
  }
]

### Instructions:
1. Organize the skills by fields and subfields.
2. Label skills the user already has with "(already have)".
3. Indicate prerequisites for each skill or field where applicable.
4. Provide a brief description for each skill to guide the user.

### Your Output:
Follow the above format and include all necessary fields and subfields to guide a beginner to advanced level in ${role}.
Make sure the output is well-structured, and each skill logically flows into the next.
`;

  const deploymentName = "gpt-4"; // Replace with your Azure OpenAI deployment name

  const response = await client.getCompletions(deploymentName, [
    {
      prompt,
      maxTokens: 1500,
      temperature: 0.7,
    },
  ]);

  const text = response.choices[0].text.trim();
  console.log(text);

  return text;
}

// Define the API endpoint for generating the learning path
app.post("/generate-learning-path", async (req, res) => {
  try {
    const { role, userSkills } = req.body;
    const universalSkills = await getUniversalSkills(role, userSkills);
    const learningPath = await getLearningPath(role, universalSkills);

    const data = JSON.parse(learningPath);

    res.json({ data });
  } catch (error) {
    console.error("Error generating learning path:", error);
    res
      .status(500)
      .send("An error occurred while generating the learning path.");
  }
});

app.get("/login", (req, res) => {
  res.send(`
        <div style="text-align: center; margin-top: 50px;">
            <img src="genz-in-ai-logo.png" alt="Company Logo" style="width: 150px; margin-bottom: 20px;">
            <p>Welcome to Our Company. Please sign in with LinkedIn to continue.</p>
            <a href="https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${client_id}&redirect_uri=${encodeURIComponent(
    redirect_uri
  )}&state=YF67HJGT9WD&scope=profile%20email%20openid">
                <img src="linkedin-signin.png" alt="Sign in with LinkedIn" style="width: 200px;">
            </a>
        </div>
    `);
});

// Serve the HTML file for the root endpoint
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/auth/linkedin/callback", async (req, res) => {
  const code = req.query.code;
  const state = req.query.state;

  if (!code || state !== "YF67HJGT9WD") {
    return res.status(400).send("Invalid code or state");
  }

  try {
    const tokenResponse = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      null,
      {
        params: {
          grant_type: "authorization_code",
          code,
          redirect_uri,
          client_id,
          client_secret,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Store the access token in the session or a database for further use
    // req.session.accessToken = accessToken;

    console.log(accessToken);

    // Redirect to a route that fetches and displays user info
    res.redirect("/profile?token=" + accessToken);
    // res.send(accessToken);
  } catch (error) {
    console.error("Error fetching access token:", error);
    res.status(500).send("Error fetching access token");
  }
});

app.get("/profile", async (req, res) => {
  const accessToken = req.query.token;

  if (!accessToken) {
    return res
      .status(401)
      .send("Access token not found. Please sign in again.");
  }

  try {
    const userInfoResponse = await axios.get(
      "https://api.linkedin.com/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const userInfo = userInfoResponse.data;

    // Redirect to localhost:5173 with user info as query parameters
    const userInfoQuery = encodeURIComponent(JSON.stringify(userInfo));
    res.redirect(`http://localhost:5173/goals?userInfo=${userInfoQuery}`);
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).send("Error fetching user info");
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
