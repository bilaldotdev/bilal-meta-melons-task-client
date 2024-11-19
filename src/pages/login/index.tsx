import { ChangeEvent, FormEvent, useState } from 'react';
import { login } from '../../services';
import { LoginPayload } from '../../types';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../../utils/helpers';

const Login = () => {
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState<LoginPayload>({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resp = await login(formData);
      if (resp?.error) {
        setError(resp?.error?.map(item => item?.message).join(',') || 'failed to login!');
      }

      if (resp?.data) {
        setCookie('token', resp.data.token, 30);
        navigate('/tasks');
      }
    } catch (error) {
      setError('Failed to login!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[93dvh] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <div>
            <div>{error && <p className="text-red-500">{error}</p>}</div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
