import { useState } from "react";
import "./App.css";
import ScoreInput from "./components/ScoreInput/ScoreInput";
import MagicPhraseModal from "./components/MagicPhraseModal/MagicPhraseModal";
import SuccessPopup from "./components/SuccessPopup/SuccessPopup";
import ScoreGraph from "./components/ScoreGraph/ScoreGraph";
import type { Score } from "./utils/apiUtils";

type View = "upload" | "graph";

function App() {
  const [view, setView] = useState<View>("upload");

  // score waiting for confirmation
  const [pendingScore, setPendingScore] = useState<number | null>(null);

  // success popup visibility
  const [showSuccess, setShowSuccess] = useState(false);

  const [graphDirty, setGraphDirty] = useState(false);
  const [graphLoaded, setGraphLoaded] = useState(false);
  const [graphData, setGraphData] = useState<Score[]>([]);

  return (
    <div className="app">
      <h1>ZETAMAC</h1>
      <p>This is a game. ONLY for those who know me very well :)</p>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${view === "upload" ? "tab--active" : ""}`}
          onClick={() => setView("upload")}
        >
          Upload
        </button>

        <button
          className={`tab ${view === "graph" ? "tab--active" : ""}`}
          onClick={() => setView("graph")}
        >
          Graph
        </button>
      </div>

      {/* Upload Panel */}
      {view === "upload" && (
        <section className="panel">
          <h2 className="panel__title">Upload Score</h2>

          {/* IMPORTANT: this ONLY sets pendingScore */}
          <ScoreInput
            onSubmit={(value) => {
              setPendingScore(value);
            }}
          />
        </section>
      )}

      {/* Graph Panel */}
      {view === "graph" && (
  <section className="panel">

    <ScoreGraph
      graphDirty={graphDirty}
      graphLoaded={graphLoaded}
      setGraphLoaded={setGraphLoaded}
      graphData={graphData}
      setGraphData={setGraphData}
      onGraphReloaded={() => setGraphDirty(false)}
    />
  </section>
)}



      {/* Magic Phrase Modal */}
      {pendingScore !== null && (
        <MagicPhraseModal
          score={pendingScore}
          onClose={() => {
            // user cancelled modal
            setPendingScore(null);
          }}
          onSuccess={() => {
            // ONLY when magic phrase is correct
            setPendingScore(null);
            setShowSuccess(true);
            setGraphDirty(true); // 👈 soft refresh trigger
          }}
        />
      )}

      {/* Success Popup */}
      {showSuccess && (
        <SuccessPopup
          onClose={() => {
            setShowSuccess(false);
            setView("graph");
          }}
        />
      )}
    </div>
  );
}

export default App;
