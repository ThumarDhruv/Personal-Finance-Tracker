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
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}