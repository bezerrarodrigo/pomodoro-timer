import { Route, Routes } from 'react-router-dom'

import DefaultLayout from './components/layouts/DefaultLayout'
import History from './pages/History'
import { Index } from './pages/Home'

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Index />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}
