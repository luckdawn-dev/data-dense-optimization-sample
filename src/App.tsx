import { Navigate, Route, Routes } from "react-router-dom"
import SlowOrderTable from "./components/slow-order-table/slow-order-table"
import VirtualizationOrderTable from "./components/virtualization-order-table/virtualization-order-table"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/virtualized" replace />} />
      <Route path="/virtualized" element={<VirtualizationOrderTable />} />
      <Route path="/slowOrder" element={<SlowOrderTable />} />
    </Routes>
  )
}

export default App
