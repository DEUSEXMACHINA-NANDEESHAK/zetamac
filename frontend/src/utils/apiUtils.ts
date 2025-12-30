const API_BASE_URL = import.meta.env.VITE_API_URL;
// const API_BASE_URL = "http://127.0.0.1:8000";

export type Score = {
  value: number;
  timestamp: string;
};

export async function saveScore(
  value: number,
  magicPhrase: string
): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${API_BASE_URL}/scores`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      value,
      magic_phrase: magicPhrase,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to save score");
  }
  console.log("Score saved successfully");
  return response.json();
}

export async function fetchScores(): Promise<Score[]> {
  const response = await fetch(`${API_BASE_URL}/scores`);
  if (!response.ok) throw new Error("Failed to fetch scores");
  return response.json();
}
