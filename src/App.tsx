/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ToolPage from './pages/ToolPage';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path=":slug" element={<ToolPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Analytics />
    </>
  );
}
