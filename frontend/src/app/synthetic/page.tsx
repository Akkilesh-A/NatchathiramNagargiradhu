"use client";
import { useEffect, useState } from "react";

export default function TrainingComponent() {
  const [trainingLogs, setTrainingLogs] = useState<{ epoch: number; loss: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [testLoss, setTestLoss] = useState<number | null>(null);
  const [yTest, setYTest] = useState<number[]>([]);
  const [yPred, setYPred] = useState<number[]>([]);

  useEffect(() => {
    const eventSource = new EventSource("http://127.0.0.1:8000/train");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.epoch) {
        setTrainingLogs((prev) => [...prev, { epoch: data.epoch, loss: data.loss }]);
      }

      if (data.final) {
        setTestLoss(data.final.test_loss);
        setYTest(data.final.y_test);
        setYPred(data.final.y_pred);
        setLoading(false);
        eventSource.close();
      }
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold">Training Progress</h2>
      {loading ? (
        <div className="border p-4 mt-4 bg-gray-100 animate-pulse">Training in progress...</div>
      ) : (
        <div className="border p-4 mt-4 bg-green-100">Training Completed!</div>
      )}

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Epoch Losses</h3>
        <ul className="list-disc pl-5">
          {trainingLogs.map((log) => (
            <li key={log.epoch}>
              Epoch {log.epoch}: Loss = {log.loss.toFixed(4)}
            </li>
          ))}
        </ul>
      </div>

      {!loading && testLoss !== null && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Final Test Loss: {testLoss.toFixed(4)}</h3>
          <PredictionChart yTest={yTest} yPred={yPred} />
        </div>
      )}
    </div>
  );
}

// Prediction Graph Component
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PredictionChart = ({ yTest, yPred }: { yTest: number[]; yPred: number[] }) => {
  const data = {
    labels: yTest.map((_, index) => index),
    datasets: [
      {
        label: "True Values",
        data: yTest,
        borderColor: "blue",
        fill: false,
      },
      {
        label: "Predicted Values",
        data: yPred,
        borderColor: "red",
        fill: false,
      },
    ],
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Prediction Results</h3>
      <Line data={data} />
    </div>
  );
};
