import React, { useState } from "react";
import "../styles/style.css";

interface ChartDataModalProps {
  chartType: string;
  onClose: () => void;
  onSave: (data: number[]) => void;
}

const ChartDataModal: React.FC<ChartDataModalProps> = ({ chartType, onClose, onSave }) => {
  const [data, setData] = useState<number[]>([]);

  const handleInputChange = (index: number, value: string) => {
    const newData = [...data];
    newData[index] = Number(value);
    setData(newData);
  };

  const renderInputs = () => {
    switch (chartType) {
      case "Bar":
      case "Line":
        return (
          <>
            <input
            className="modalInput"
              type="number"
              placeholder="Value for January"
              onChange={(e) => handleInputChange(0, e.target.value)}
            />
            <input
              className="modalInput"
              type="number"
              placeholder="Value for February"
              onChange={(e) => handleInputChange(1, e.target.value)}
            />
            <input
            className="modalInput"
              type="number"
              placeholder="Value for March"
              onChange={(e) => handleInputChange(2, e.target.value)}
            />
          </>
        );
      case "Doughnut":
      case "Pie":
        return (
          <>
            <input
            className="modalInput"
              type="number"
              placeholder="Value for Red"
              onChange={(e) => handleInputChange(0, e.target.value)}
            />
            <input
            className="modalInput"
              type="number"
              placeholder="Value for Blue"
              onChange={(e) => handleInputChange(1, e.target.value)}
            />
            <input
            className="modalInput"
              type="number"
              placeholder="Value for Yellow"
              onChange={(e) => handleInputChange(2, e.target.value)}
            />
            {chartType === "Doughnut" && (
              <>
                <input
                className="modalInput"
                  type="number"
                  placeholder="Value for Green"
                  onChange={(e) => handleInputChange(3, e.target.value)}
                />
                <input
                className="modalInput"
                  type="number"
                  placeholder="Value for Purple"
                  onChange={(e) => handleInputChange(4, e.target.value)}
                />
              </>
            )}
          </>
        );
      default:
        return null;
    }
  };

//   return (
//     <div className="modal">
//       <h2>Add Data for {chartType} Chart</h2>
//       {renderInputs()}
//       <button onClick={() => { onSave(data); onClose(); }}>Save</button>
//       <button onClick={onClose}>Cancel</button>
//     </div>
//   );

return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Enter Data for {chartType} Chart
        </h2>
        {renderInputs()}
        <div className="flex justify-end space-x-4">
          <button
            className="modalCancelBtn"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="modalSaveBtn"
            onClick={() => { onSave(data); onClose(); }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChartDataModal;
