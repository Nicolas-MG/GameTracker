import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import GameList from './components/Game/GameList';
import GameForm from './components/Game/GameForm';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/games" element={<GameList />} />
      <Route path="/games/new" element={<GameForm />} />
      <Route path="/games/edit/:id" element={<GameForm />} />
    </Routes>
  );
}