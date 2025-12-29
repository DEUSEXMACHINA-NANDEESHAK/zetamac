import { useState } from "react";

type ScoreInputProps = {
  onSubmit: (value: number) => void;
};

export default function ScoreInput({ onSubmit }: ScoreInputProps) {
  const [value, setValue] = useState<string>("");

  const numericValue = Number(value);
  const isValid = value !== "" && !Number.isNaN(numericValue);

  return (
    <div style={{ marginTop: 24 }}>
      <input
        type="number"
        inputMode="numeric"
        placeholder="Enter score"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{
          padding: "12px",
          fontSize: "18px",
          width: "220px",
          borderRadius: 6,
          border: "1px solid #475569",
          background: "#020617",
          color: "#e5e7eb",
        }}
      />

      <br /><br />

      <button
        disabled={!isValid}
        onClick={() => onSubmit(numericValue)}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: 6,
          cursor: isValid ? "pointer" : "not-allowed",
          background: isValid ? "#38bdf8" : "#475569",
          border: "none",
          color: "#020617",
        }}
      >
        Submit
      </button>
    </div>
  );
}
