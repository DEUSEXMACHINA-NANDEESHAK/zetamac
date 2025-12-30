import { useState } from "react";
import "./MagicPhraseModal.css";
import { saveScore } from "../../utils/apiUtils";

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
  const [loading, setLoading] = useState(false);

  const canSubmit = phrase.trim().length > 0 && checked && !loading;

  const handleSubmit = async () => {
    if (!checked) {
      setError("Please confirm before submitting.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // ✅ pass the correct variable
      await saveScore(score, phrase);

      onClose();   // close magic modal
      onSuccess(); // show "saved successfully" popup
    } catch (err: any) {
      setError(err.message || "Invalid magic phrase");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        {loading && (
          <div className="modal-loader-overlay">
            <div className="modal-loader" />
          </div>
        )}

        <button className="modal-close" onClick={onClose} disabled={loading}>
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
              disabled={loading}
            />
          </label>
        </div>

        {/* INPUT */}
        <input
          className={`modal-input ${error ? "modal-input--error" : ""}`}
          placeholder="Enter the Magic Phrase...."
          value={phrase}
          onChange={(e) => {
            setPhrase(e.target.value);
            setError("");
          }}
          disabled={loading}
        />

        {error && <div className="modal-error">{error}</div>}

        {/* ACTIONS */}
        <div className="modal-actions">
          <button
            className="modal-submit"
            disabled={!canSubmit}
            onClick={handleSubmit}
          >
            {loading ? "Saving..." : "Submit"}
          </button>

          <button
            className="modal-forgot"
            disabled={loading}
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
