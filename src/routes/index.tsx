import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import PublicLayout from '../layouts/public-layout';
import Register from '../pages/register';
import Login from '../pages/login';
import Tasks from '../pages/tasks';
import CreateTask from '../pages/tasks/create';

export default function Router() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route path="auth">
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
            </Route>
            <Route path="tasks" element={<Outlet />}>
              <Route element={<Tasks />} index />
              <Route element={<CreateTask />} path="create" />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
