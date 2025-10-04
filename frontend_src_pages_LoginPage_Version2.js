import React, { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard';
    } else {
      setMsg(data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded shadow" onSubmit={handleLogin}>
        <h2 className="mb-4 text-lg font-bold">Login</h2>
        <input className="block w-full mb-2 p-2 border" type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input className="block w-full mb-2 p-2 border" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="w-full bg-blue-500 text-white p-2 rounded" type="submit">Login</button>
        {msg && <p className="mt-2 text-red-500">{msg}</p>}
      </form>
    </div>
  );
}