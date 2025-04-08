import { useState } from "react";
import "./Prompt.css";

const Prompt = ({ onSubmit }) => {
  const [userPrompt, setUserPrompt] = useState("");

  const handleSubmit = () => {
    onSubmit(userPrompt);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSubmit(userPrompt);
    }
  }

  return (
    <div className="prompt-container">
      <textarea
        id="prompt"
        rows="1"
        className="prompt-textarea"
        placeholder="Type your semantic query here..."
        value={userPrompt}
        onKeyDown={handleKeyDown}
        onChange={(e) => setUserPrompt(e.target.value)}
      />
      <button className="prompt-button" onClick={handleSubmit}>
        Search 
      </button>
    </div>
  );
};

export default Prompt;
