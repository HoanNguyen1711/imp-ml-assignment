import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DataSourceSelector({ onDataSourceSelect }) {
  const [dataSources, setDataSources] = useState([]);
  const [selectedSource, setSelectedSource] = useState('');

  useEffect(() => {
    const fetchDataSources = async () => {
      try {
        const response = await axios.get('/api/datasources');
        setDataSources(response.data);
      } catch (error) {
        console.error('Error fetching data sources:', error);
      }
    };

    fetchDataSources();
  }, []);

  const handleSourceChange = (e) => {
    const selected = e.target.value;
    setSelectedSource(selected);
    const selectedData = dataSources.find(source => source.name === selected);
    onDataSourceSelect(selectedData);
  };

  return (
    <div className="datasource-selector">
      <label htmlFor="datasource">Select Data Source:</label>
      <select
        id="datasource"
        value={selectedSource}
        onChange={handleSourceChange}
        className="datasource-select"
      >
        <option value="">Choose a data source...</option>
        {dataSources.map(source => (
          <option key={source.name} value={source.name}>
            {source.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DataSourceSelector;