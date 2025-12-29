import { useState } from "react";
import "./MagicPhraseModal.css";

type MagicPhraseModalProps = {
  score: number;
  onClose: () => void;
  onSuccess: () => void;
};

export default function MagicPhraseModal({
  score,
  onClose,
  onSuccess,
}: MagicPhraseModalProps) {
  const [phrase, setPhrase] = useState("");
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = phrase.trim().length > 0 && checked;

  const handleSubmit = () => {
    if (!checked) {
      setError("Please confirm before submitting.");
      return;
    }

    if (!phrase.trim()) {
      setError("Magic phrase cannot be empty.");
      return;
    }

    setError("");
    onClose();
    onSuccess();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        {/* HEADER */}
        <div className="modal-header">
          <svg
            className="hexagon-svg"
            width="120"
            height="104"
            viewBox="0 0 120 104"
          >
            <polygon
              points="60,4 112,30 112,74 60,100 8,74 8,30"
              fill="#0f172a"
              stroke="#38bdf8"
              strokeWidth="2"
            />
            <text
              x="60"
              y="62"
              textAnchor="middle"
              dominantBaseline="middle"
              className="hexagon-text"
            >
              {score}
            </text>
          </svg>

          <label className="confirm-check">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
          </label>
        </div>

        {/* INPUT */}
        <label className="modal-label">Enter the MAGIC PHRASE</label>

        <input
          className={`modal-input ${error ? "modal-input--error" : ""}`}
          placeholder="YYYY-MM-DDWolfieIsHere@!%)#@))!"
          value={phrase}
          onChange={(e) => {
            setPhrase(e.target.value);
            setError("");
          }}
        />

        {error && <div className="modal-error">{error}</div>}

        {/* ACTIONS */}
        <div className="modal-actions">
          <button
            className="modal-submit"
            disabled={!canSubmit}
            onClick={handleSubmit}
          >
            Submit
          </button>

          <button
            className="modal-forgot"
            onClick={() => {
              setPhrase("");
              setError("");
            }}
          >
            Forgot
          </button>
        </div>
      </div>
    </div>
  );
}
