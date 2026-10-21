import { Navigate, Route, Routes } from "react-router-dom"
import SlowOrderTable from "./components/slow-order-table/slow-order-table"
import VirtualizationOrderTable from "./components/virtualization-order-table/virtualization-order-table"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/slowOrder" replace />} />
      <Route path="/slowOrder" element={<SlowOrderTable />} />
      <Route path="/virtualized" element={<VirtualizationOrderTable />} />
    </Routes>
  )
}

export default App
