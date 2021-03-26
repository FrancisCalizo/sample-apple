import { useRef, useState } from 'react';
import Head from 'next/head';
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function Registration() {
  const { register, handleSubmit, errors } = useForm<FormData>({
    defaultValues: {
      name: 'Alexander Hamilton',
      email: 'aham@gmail.com',
      password: 'Password1',
    },
  });

  const [formState, setFormState] = useState<'idle' | 'submitting'>('idle');
  const [serverErrors, setServerErrors] = useState([]);

  return (
    <div>
      <Head>
        <title>Registration</title>
      </Head>

      <form
        onSubmit={handleSubmit(async (formData) => {
          setFormState('submitting');
          setServerErrors([]);

          const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          const data = await response.json();

          if (data.errors) {
            setServerErrors(data.errors);
          }

          setFormState('idle');
        })}
      >
        {serverErrors && (
          <ul>
            {serverErrors.map((err) => (
              <li key={err}>{err} </li>
            ))}
          </ul>
        )}

        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            ref={register({ required: 'required' })}
          />
          {errors.name && <div>{errors.name.message}</div>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            ref={register({ required: 'required' })}
          />
          {errors.email && <div>{errors.email.message}</div>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            ref={register({
              required: 'required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
              validate: (value) => {
                return (
                  [/[a-z]/, /[A-Z]/, /[0-9]/].every((pattern) =>
                    pattern.test(value)
                  ) ||
                  'Must include one uppercase character, one lowercase character, and one number'
                );
              },
            })}
          />
          {errors.password && <div>{errors.password.message}</div>}
        </div>

        <div>
          <button type="submit" disabled={formState === 'submitting'}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
