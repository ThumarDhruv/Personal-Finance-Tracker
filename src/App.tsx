import  { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppDispatch } from '../src/store';
import { setLoading, fetchTransactionsAsync } from './store/transactionsSlice';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import TransactionDetails from './components/TransactionDetails';
import ProtectedRoute from './components/ProtectedRoute';
import AuthForm from './components/AuthForm';
import Navbar from './components/Navbar';
// import LoadingScreen from './components/LoadingScreen';
import { RootState } from '../src/store';
import { useSelector } from 'react-redux';

function App() {
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchTransactionsAsync(user.id));
    }
  }, [dispatch, user?.id]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" replace />} />
      <Route path="/register" element={<AuthForm type="register" />} />
      <Route path="/login" element={<AuthForm type="login" />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/transactions" element={<TransactionList />} />
          <Route path="/transaction/:id" element={<TransactionDetails />} />
        </Route>
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;