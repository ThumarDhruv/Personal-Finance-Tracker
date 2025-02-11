import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoading } from './store/transactionsSlice';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import TransactionDetails from './components/TransactionDetails';
// import LoadingScreen from './components/LoadingScreen';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    const timer = setTimeout(() => {
      dispatch(setLoading(false));
    }, 2000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="transactions" element={<TransactionList />} />
        <Route path="transaction/:id" element={<TransactionDetails />} />
      </Route>
    </Routes>
  );
}

export default App;