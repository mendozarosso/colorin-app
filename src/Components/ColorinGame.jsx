import { useState, useEffect } from 'react';

const ColorinGame = () => {
  const [grid, setGrid] = useState(Array(25).fill(''));
  const [counts, setCounts] = useState({
    rojo: 0,
    verde: 0,
    azul: 0
  });

  // Carga la informacion guardada en el componentex
  // tambien registramos los cambios con el useeffect
  useEffect(() => {
    const savedGrid = localStorage.getItem('colorinGrid');
    const savedCounts = localStorage.getItem('colorinCounts');
    
    if (savedGrid) {
      setGrid(JSON.parse(savedGrid));
    }
    if (savedCounts) {
      setCounts(JSON.parse(savedCounts));
    }
  }, []);

  const handleInputChange = (index, value) => {
    const newGrid = [...grid];
    const lowerValue = value.toLowerCase();
    newGrid[index] = lowerValue;
    setGrid(newGrid);
    
    //Actualiza las cuentas
    const newCounts = {
      rojo: newGrid.filter(x => x === 'rojo').length,
      verde: newGrid.filter(x => x === 'verde').length,
      azul: newGrid.filter(x => x === 'azul').length
    };
    setCounts(newCounts);
  };

  const handleSave = () => {
    localStorage.setItem('colorinGrid', JSON.stringify(grid));
    localStorage.setItem('colorinCounts', JSON.stringify(counts));
    alert('¡Datos guardados!');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 color='black'>COLORIN By Jason Mendoza</h1>
      
      <div className="grid grid-cols-5 gap-2 mb-6">
        {grid.map((value, index) => (
          <input
            key={index}
            type="text"
            value={value}
            onChange={(e) => handleInputChange(index, e.target.value)}
            className={`border p-2 text-center ${
              value.toLowerCase() === 'rojo' ? 'bg-red-500 text-white' :
              value.toLowerCase() === 'verde' ? 'bg-green-500 text-white' :
              value.toLowerCase() === 'azul' ? 'bg-blue-500 text-white' :
              ''
            }`}
          />
        ))}
      </div>
      
      <div className="mb-4 space-x-4">
        <span>Cantidad de Rojos: {counts.rojo}</span>
        <span>Cantidad de Verdes: {counts.verde}</span>
        <span>Cantidad de Azules: {counts.azul}</span>
      </div>
      
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Guardar
      </button>
    </div>
  );
};

export default ColorinGame;