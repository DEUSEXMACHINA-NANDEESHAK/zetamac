import { useState } from "react";
import "./App.css";
import ScoreInput from "./components/ScoreInput/ScoreInput";
import MagicPhraseModal from "./components/MagicPhraseModal/MagicPhraseModal";

type View = "upload" | "graph";

function App() {
  const [view] = useState<View>("upload");
  const [pendingScore, setPendingScore] = useState<number | null>(null);

  return (
    <div className="app">
      <h1>Nandeeshak</h1>
      <p>Breath-hold tracker</p>

      {view === "upload" && (
        <section className="panel">
          <h2 className="panel__title">Upload Score</h2>

          <ScoreInput onSubmit={(v) => setPendingScore(v)} />
        </section>
      )}

      {pendingScore !== null && (
        <MagicPhraseModal
          score={pendingScore}
          onClose={() => setPendingScore(null)}
          onSuccess={() => {
            alert("Saved successfully (local)");
          }}
        />
      )}
    </div>
  );
}

export default App;