import Link from 'next/link';
import { useState } from 'react';
import Head from 'next/head';

async function loginUser(credentials) {
  return fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login() {
  const [token, setToken] = useState<string>(null);
  const [username, setUserName] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    setToken(token);
  };

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>

      <pre>{JSON.stringify(token, null, 2)}</pre>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>

      <Link href="/registration">
        <a>Register</a>
      </Link>
    </div>
  );
}
