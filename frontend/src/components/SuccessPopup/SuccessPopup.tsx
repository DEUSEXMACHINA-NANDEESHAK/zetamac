import "./SuccessPopup.css";

type SuccessPopupProps = {
  onClose: () => void;
};

export default function SuccessPopup({ onClose }: SuccessPopupProps) {
  return (
    <div className="success-backdrop">
      <div className="success-card">
        <button className="success-close" onClick={onClose}>
          ✕
        </button>

        <svg
          className="success-icon"
          width="72"
          height="72"
          viewBox="0 0 72 72"
        >
          <circle
            cx="36"
            cy="36"
            r="34"
            fill="#0f172a"
            stroke="#22c55e"
            strokeWidth="3"
          />
          <path
            d="M22 38 L32 48 L50 26"
            fill="none"
            stroke="#22c55e"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <p className="success-text">Score saved successfully</p>
      </div>
    </div>
  );
}
