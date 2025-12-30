import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from "recharts";
import { fetchScores } from "../../utils/apiUtils";
import type { Score } from "../../utils/apiUtils";
import "./ScoreGraph.css";

type Props = {
  graphDirty: boolean;
  graphLoaded: boolean;
  setGraphLoaded: (v: boolean) => void;
  graphData: Score[];
  setGraphData: (d: Score[]) => void;
  onGraphReloaded: () => void;
};


export default function ScoreGraph({
  graphDirty,
  graphLoaded,
  setGraphLoaded,
  graphData,
  setGraphData,
  onGraphReloaded,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [chartType, setChartType] = useState<"line" | "bar">("line");

  const loadGraph = async () => {
  try {
    setLoading(true);
    setError("");

    const data = await fetchScores();
    setGraphData(data);
    setGraphLoaded(true);
    onGraphReloaded();
  } catch (err: any) {
    setError(err.message || "Failed to load graph");
  } finally {
    setLoading(false);
  }
};


  /* ---------- IDLE ---------- */
  if (!graphLoaded && !loading) {
    return (
        <div className="graph-placeholder">
        <button className="graph-load-btn" onClick={loadGraph}>
            Load Graph
        </button>
        {error && <p className="graph-error">{error}</p>}
        </div>
    );
    }


  /* ---------- LOADING ---------- */
  if (loading) {
    return (
        <div className="graph-loader">
        <div className="spinner" />
        <p>Loading graph…</p>
        </div>
    );
    }


  /* ---------- LOADED ---------- */
  return (
    <div className="graph-wrapper">
      {graphDirty && (
        <div className="graph-soft-refresh">
          <span>New data available</span>
          <button onClick={loadGraph}>Reload</button>
        </div>
      )}

      <div className="graph-controls">
        <span className="graph-view-label">Choose View :</span>
        <button
          className={chartType === "line" ? "active" : ""}
          onClick={() => setChartType("line")}
        >
          Line
        </button>
        <button
          className={chartType === "bar" ? "active" : ""}
          onClick={() => setChartType("bar")}
        >
          Bar
        </button>
      </div>

      <div className="graph-container">
        <ResponsiveContainer width="100%" height={360}>
          {chartType === "line" ? (
            <LineChart
              data={graphData}
              margin={{ top: 10, right: 40, left: 0, bottom: 10 }}
            >
              <XAxis
                dataKey="timestamp"
                tickFormatter={(t) =>
                  new Date(t).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                }
                tick={{ fill: "#1a9d6aff", fontSize: 12 }}
              />
              <YAxis
                domain={[0, 150]}
                tick={{ fill: "#1a9d6aff", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  background: "#020617",
                  border: "1px solid #38bdf8",
                  borderRadius: "8px",
                }}
                labelFormatter={(label) =>
                  new Date(label).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                }
              />
              <Line
                type="linear"
                dataKey="value"
                stroke="#f8d538ff"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
                isAnimationActive={false}
              />
              <Brush
                dataKey="timestamp"
                height={36}
                stroke="#f83855ff"
                travellerWidth={5}
                tickFormatter={(t) =>
                    new Date(t).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    })
                }
                />

            </LineChart>
          ) : (
            <BarChart
              data={graphData}
              margin={{ top: 10, right: 40, left: 0, bottom: 10 }}
            >
              <XAxis
                dataKey="timestamp"
                tickFormatter={(t) =>
                  new Date(t).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                }
                tick={{ fill: "#1a9d6aff", fontSize: 12 }}
              />
              <YAxis
                domain={[0, 150]}
                tick={{ fill: "#1a9d6aff", fontSize: 12 }}
              />
              <Tooltip />
              <Bar dataKey="value" fill="#f8d538ff" radius={[6, 6, 0, 0]} />

              <Brush
                dataKey="timestamp"
                height={30}
                stroke="#f83855ff"
                travellerWidth={15}
                tickFormatter={(t) =>
                    new Date(t).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    })
                }
                />

            </BarChart>
          )}
          
        </ResponsiveContainer>
        <p className="adjust-scroll-text"> &emsp;&emsp;&emsp;&emsp;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;--------------------Adjust the Red Slider above by clicking on the slider at the two ends------------------------&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;</p>
      </div>
    </div>
  );
}
