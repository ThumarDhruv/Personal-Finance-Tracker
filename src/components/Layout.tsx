// import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../types';
import Navbar from './Navbar';
import LoadingScreen from './LoadingScreen';

export default function Layout() {
  const loading = useSelector((state: RootState) => state.transactions.loading);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}