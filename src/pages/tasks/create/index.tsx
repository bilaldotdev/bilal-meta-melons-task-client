import { ChangeEvent, FormEvent, useState } from 'react';
import { LoginPayload } from '../../types';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../../../services';

const CreateTask = () => {
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState<LoginPayload>({
    title: '',
    description: '',
    status: 'pending',
    priority: 'low',
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
      const resp = await createTask(formData);
      if (resp?.error) {
        setError(resp?.error?.map(item => item?.message).join(',') || 'failed to create task!');
      }

      if (resp) {
        navigate('/tasks');
      }
    } catch (error) {
      setError('Failed to create task!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[93dvh] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="title"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400"
              placeholder="Enter your title"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              type="description"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400"
              placeholder="Enter your description"
              required
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select name="status" id="status" onChange={handleChange}>
              {['pending', 'in_progress', 'completed'].map(st => (
                <option value={st} key={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select name="priority" id="priority" onChange={handleChange}>
              {['low', 'medium', 'high'].map(pt => (
                <option value={pt} key={pt}>
                  {pt}
                </option>
              ))}
            </select>
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

export default CreateTask;
