import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"

import AppLayout from "./AppLayout"
import Form from "./Form"

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="form" element={<Form />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "1.4rem",
            fontFamily: "Manrope, sans-serif",
            color: "var(--color-light--2)",
            backgroundColor: "var(--color-dark--1)",
          },
        }}
      />
    </>
  )
}
