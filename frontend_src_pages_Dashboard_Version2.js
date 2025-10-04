import React, { useState } from 'react';

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('excel', file);
    const res = await fetch('http://localhost:5000/api/files/upload', {
      method: 'POST',
      body: formData,
    });
    const parsed = await res.json();
    setData(parsed);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <form onSubmit={handleUpload}>
        <input type="file" accept=".xls,.xlsx" onChange={e => setFile(e.target.files[0])} />
        <button className="ml-2 bg-green-500 text-white px-4 py-2 rounded" type="submit">Upload & Analyze</button>
      </form>
      {data && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Columns:</h2>
          <pre>{JSON.stringify(data.columns, null, 2)}</pre>
          <h2 className="text-lg font-semibold mt-2">First Rows:</h2>
          <pre>{JSON.stringify(data.data.slice(0, 5), null, 2)}</pre>
        </div>
      )}
    </div>
  );
}