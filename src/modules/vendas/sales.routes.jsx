import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SalesList from './SalesList.jsx';
import SalesForm from './SalesForm.jsx';
import SaleDetails from './SaleDetails.jsx';

export default function SalesRoutes() {
  return (
    <Routes>
      <Route index element={<SalesList />} />
      <Route path="nova" element={<SalesForm />} />
      <Route path=":id" element={<SaleDetails />} />
    </Routes>
  );
}