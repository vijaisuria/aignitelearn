# Import necessary modules
import os
from flask import Flask, render_template, request, jsonify, Response, stream_with_context
from dotenv import load_dotenv
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage, AssistantMessage
from azure.core.credentials import AzureKeyCredential
from flask_cors import CORS

# Load environment variables from .env file
load_dotenv()

# Initialize Flask application
app = Flask(__name__)

# Enable CORS
CORS(app)

# Azure OpenAI configuration
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")  # Set this in your environment variables
AZURE_ENDPOINT = "https://models.inference.ai.azure.com"
MODEL_NAME = "gpt-4o"

# Initialize Azure Chat Completion Client
client = ChatCompletionsClient(
    endpoint=AZURE_ENDPOINT,
    credential=AzureKeyCredential(GITHUB_TOKEN),
)

def initialize_conversation(user_name, user_background, user_goal):
    return [
        SystemMessage(content=(
            f"You are an empathetic and supportive chatbot named [BOT NAME]. Your role is to assist users by understanding "
            f"their context, emotions, and past interactions. Here is the user's profile: \n\n"
            f"- Name: {user_name}\n"
            f"- Background: {user_background}\n"
            f"- Current Goal: {user_goal}\n"
            f"When the user shares their thoughts or experiences, respond with empathy and constructive advice. If they are "
            f"facing challenges, offer motivational and actionable suggestions to help them overcome their struggles. If "
            f"they share a success, celebrate it and encourage them to keep progressing. Always provide contextually relevant "
            f"and thoughtful responses.\n\n"
            f"User Input: {{USER_MESSAGE}}\n\n"
            f"Your response should:\n"
            f"1. Acknowledge the user's emotion and context.\n"
            f"2. Provide empathetic support.\n"
            f"3. Suggest actionable steps or celebrate success as appropriate."
        ))
    ]

# Example usage
conversation_history = initialize_conversation(
    user_name="Vijai",
    user_background="Final-year CSE student at MIT",
    user_goal="Looking for a Software Engineer Fresher Role"
)

@app.route("/", methods=["GET"])
def home():
    return render_template("chat.html")

@app.route("/chat", methods=["POST"])
def chat():
    global conversation_history

    # Retrieve user input from the request
    user_input = request.json.get("message")
    conversation_history.append(UserMessage(content=user_input))

    def generate_stream():
        try:
            # Call Azure OpenAI API with streaming enabled
            response = client.complete(
                stream=True,
                messages=conversation_history,
                model=MODEL_NAME,
            )
            assistant_reply = ""
            for update in response:
                if update.choices:
                    delta = update.choices[0].delta.content or ""
                    assistant_reply += delta
                    yield delta  # Yield each token
            # Append the full assistant reply to the conversation history
            conversation_history.append(AssistantMessage(content=assistant_reply))
        except Exception as e:
            yield f"Error: {str(e)}"

    return Response(stream_with_context(generate_stream()), content_type="text/plain")

@app.route("/reset", methods=["POST"])
def reset():
    global conversation_history
    # Reset conversation history
    conversation_history = [
        SystemMessage(content="You are an empathetic and supportive assistant.")
    ]
    return jsonify({"status": "Conversation history reset."})

if __name__ == "__main__":
    app.run(debug=True, port=5001)
