import { useCallback, useEffect, useState } from 'react';
import { Task } from '../../types';
import { deleteTask, getTasks, updateTaskStatus } from '../../services';
import { Link } from 'react-router-dom';

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = useCallback(async (signal?: AbortSignal) => {
    try {
      const res = await getTasks({ signal: signal });
      res && setTasks(res);
    } catch (error) {}
  }, []);

  const handleDelTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      fetchTasks();
      window.alert('task deleted!');
    } catch (error) {
      window.alert('failed to delete!');
    }
  };

  const handleStatusUpdate = async (taskId: number, status: string) => {
    try {
      await updateTaskStatus(taskId, status);
      fetchTasks();
    } catch (error) {
      window.alert('failed to update!');
    }
  };

  useEffect(() => {
    const ctrl = new AbortController();

    fetchTasks(ctrl.signal);
  }, []);

  return (
    <div>
      <TaskList tasks={tasks} onDelete={handleDelTask} onUpdateStatus={handleStatusUpdate} />
    </div>
  );
}

const TaskList = ({
  tasks,
  onDelete,
  onUpdateStatus,
}: {
  tasks: Task[];
  onDelete: (taskId: number) => {};
  onUpdateStatus: (taskId: number, status: string) => {};
}) => {
  return (
    <div>
      <div className="text-center my-4">
        <Link to="/tasks/create">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
            Create Task
          </button>
        </Link>
      </div>

      {tasks.length ? (
        <ul className="space-y-4 p-4">
          {tasks.map(task => (
            <li key={task.id} className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md">
              <h2 className="font-bold text-lg">{task.title}</h2>
              <p className="text-gray-700">
                <strong>Description:</strong> {task.description}
              </p>
              <p className="text-gray-700">
                <strong>Status:</strong> {task.status}
              </p>
              <p className="text-gray-700">
                <strong>Priority:</strong> {task.priority}
              </p>
              <p className="text-gray-700 pt-2">
                <strong>Change Status:</strong>{' '}
                <select
                  name="status"
                  id="status"
                  defaultValue={task.status}
                  onChange={({ target }) => onUpdateStatus(task.id, target.value)}
                >
                  {['pending', 'in_progress', 'completed'].map(st => (
                    <option value={st} key={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onDelete(task.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 py-10">No tasks available.</p>
      )}
    </div>
  );
};
