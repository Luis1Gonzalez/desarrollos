import React, { useEffect } from "react";

const App = () => {
  const [thickness, setThickness] = React.useState(null);
  const [folds, setFolds] = React.useState(null);
  const [lengths, setLengths] = React.useState([]);
  const [diferents, setDiferents] = React.useState(null);
  const [resultSegmentos, setResultSegmentos] = React.useState(0);
  const [resultAngulo, setResultAngulo] = React.useState(0);

  useEffect(() => {
    const calculateResultSegmentos = lengths.reduce((sum, length) => sum + parseFloat(length || 0), 0);
    setResultSegmentos(calculateResultSegmentos);
  }, [lengths]);

  useEffect(() => {
    const calculateResultAngulo = (folds - diferents) * 2 * thickness;
    setResultAngulo(calculateResultAngulo);
  }, [folds, diferents, thickness]);

  const calculateDevelopment = () => {
    const development = resultSegmentos - resultAngulo;
    return development.toFixed(1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4 text-center">Calculadora de Desarrollo</h1>

        <div className="flex items-center gap-2">
          <label className="block text-gray-700 mb-2 pb-2">Espesor:</label>
          <input
            type="number"
            value={thickness}
            onChange={(e) => setThickness(parseFloat(e.target.value))}
            className="w-[100px] mb-4 p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-gray-700 pb-4">Nº Pliegues:</label>
          <input
            type="number"
            value={folds}
            onChange={(e) => setFolds(parseInt(e.target.value))}
            className="w-[100px] mb-4 p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-gray-700 pb-4">Pliegues ≠ 90º</label>
          <input
            type="number"
            value={diferents}
            onChange={(e) => setDiferents(parseInt(e.target.value))}
            className="w-[100px] mb-4 p-2 border border-gray-300 rounded-lg"
          />
        </div>

        {lengths.map((length, index) => (
          <div key={index} className="mb-4 flex items-center justify-around">
            <label className="block text-gray-700 mb-2">Segmento</label>
            <input
              type="number"
              value={length}
              onChange={(e) =>
                setLengths(lengths.map((len, i) => (i === index ? e.target.value : len)))
              }
              className="w-[80px] p-2 border border-gray-300 rounded-lg"
            />
          </div>
        ))}

        <button
          onClick={() => setLengths([...lengths, ""])}
          className="w-full mb-4 p-2 bg-green-500 text-white rounded-lg"
        >
          Agregar Segmento
        </button>

        <p className="text-gray-700 mt-4">
          Se trata de una pieza de {folds} pliegues de 90º y {diferents} diferente a 90º, con un espesor de{" "}
          {thickness}mm y un desarrollo de {calculateDevelopment()}mm.
        </p>
      </div>
    </div>
  );
};

export default App;
