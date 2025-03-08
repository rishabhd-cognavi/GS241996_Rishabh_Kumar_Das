import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import MainLayout from './components/layout/MainLayout';

const StoresPage = lazy(() => import('./pages/stores/StoresPage'));
const SkusPage = lazy(() => import('./pages/skus/SkusPage'));
const PlanningPage = lazy(() => import('./pages/planning/PlanningPage'));
const ChartPage = lazy(() => import('./pages/chart/ChartPage'));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <MainLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path='/stores' element={<StoresPage />} />
              <Route path='/skus' element={<SkusPage />} />
              <Route path='/planning' element={<PlanningPage />} />
              <Route path='/chart' element={<ChartPage />} />
              <Route path='/' element={<Navigate to='/stores' replace />} />
            </Routes>
          </Suspense>
        </MainLayout>
      </Router>
    </Provider>
  );
}

export default App;
