# AIgniteLearn: Empowering Developers with Personalized Learning & Emotional Support

AIgniteLearn is a platform designed to assist developers in their learning journey by combining personalized learning paths, career guidance, real-time mentoring, and empathetic AI-driven emotional support. By leveraging **GitHub Copilot** and **Azure services**, it offers a seamless, AI-powered experience to help developers enhance their skills, track progress, and overcome emotional challenges.

---

## Key Features

- **Personalized AI Trainer**:  
  Provides real-time mentoring, career guidance, and progress feedback on learning activities.
- **Empathy AI**:  
  Detects emotional states and offers motivational support to help developers stay focused and motivated.

- **Goal Progress Tracking**:  
  Allows users to track their learning goals, achievements, and progress with visual dashboards and metrics.

- **Skill Gap Analysis**:  
  Analyzes users' profiles (LinkedIn, resumes) to identify missing skills and suggest personalized learning resources.

- **Real-time Feedback**:  
  Helps users receive instant feedback on their code and assignments to improve learning outcomes.

- **Interactive Learning**:  
  Includes gamified education, personalized quizzes, mock tests, and engaging activities.

- **AI-powered Chatbot**:  
  Uses **Azure OpenAI Models** (GPT-4, GPT-3) for generating personalized learning roadmaps and a chatbot to assist with queries.

- **Accessibility**:  
  Provides text-to-speech, multilingual translation, and immersive reading for enhanced accessibility.

- **Emotional and Mental Support**:  
  Utilizes **Azure AI Speech** and **Sentiment Analysis** to detect stress levels and provide tailored activities like mindfulness exercises.

---

## Technologies Used

- **Frontend**:

  - **React**, **Redux**, **React Router**, **D3.js**

- **Backend**:

  - **Flask**, **Node.js**, **Express.js**

- **Database**:

  - **MySQL**, **Cosmos DB**

- **Cloud & Azure Services**:

  - **Azure App Services** (Backend Deployment)
  - **Azure Static Web Apps** (Frontend Deployment)
  - **Azure Communication Services** (Email Notifications)
  - **Azure Cognitive Services** (Speech-to-Text, Translator, Immersive Reader)
  - **Azure OpenAI Models** (GPT-4o, GPT-o1)
  - **Azure Machine Learning** (Personalization Models)
  - **Azure Speech Avatar** (Mentor Mode Interaction)

- **Development Tools**:
  - **GitHub Copilot**, **GitHub Actions**, **VS Code**, **Jest**, **Pytest**

---

## How to Run the Project Locally

### Prerequisites

- Node.js (v16+)
- Python 3.x
- MySQL Database
- Azure Account (for cloud services)

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/vijaisuria/AIgniteLearn.git
   cd AIgniteLearn
   ```

2. Install dependencies for the frontend:

   ```bash
   cd skill-sync/client
   npm install
   ```

3. Install dependencies for the backend:

   ```bash
   cd flask-server
   pip install -r requirements.txt
   ```

4. Configure environment variables for **Azure Services** (Refer to `.env.example` for variables).

5. Run the frontend:

   ```bash
   npm start
   ```

6. Run the backend:

   ```bash
   flask run
   ```

---

## Testing

- **Frontend Testing**:  
  Run tests with Jest:

  ```bash
  npm test
  ```

- **Backend Testing**:  
  Run Flask API tests with Pytest:

  ```bash
  pytest
  ```

- **Manual Testing**:
  - Test app functionality on different browsers (Chrome, Firefox, Safari).
  - Ensure accessibility features (e.g., Immersive Reader, AI Speech) are working.
  - Perform edge case testing (invalid inputs, API failure, timeouts).
  - Conduct load testing using Azure Portal.

---

## Contribution

We welcome contributions to the project! If you’d like to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to your forked branch (`git push origin feature/YourFeature`).
5. Create a pull request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Collaborators

- [Vijai Suria](https://linkedin.com/in/vijaisuria)
- [Tejeshree](https://linkedin.com/)
- [Neelavathy](https://linkedin.com/)
- [Kavyadharshene](https://linkedin.com/)

---

## Acknowledgments

- Thanks to **GitHub Copilot** for boosting our development productivity.
- **Azure Services** for providing scalable cloud infrastructure and AI-powered tools.
- **OpenAI** for enabling intelligent learning paths and chatbot functionality.
