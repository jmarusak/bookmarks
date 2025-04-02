import { useState } from "react";
import "./Prompt.css";

const Prompt = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    onSubmit(prompt);
  };

  return (
    <div className="prompt-container">
      <textarea
        id="prompt"
        rows="1"
        className="prompt-textarea"
        placeholder="Type your semantic query here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button className="prompt-button" onClick={handleSubmit}>
        Search 
      </button>
    </div>
  );
};

export default Prompt;
