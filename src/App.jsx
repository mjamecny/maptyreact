import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"

import AppLayout from "./AppLayout"
import Form from "./Form"

import { getCoords } from "./features/app/appSlice"

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCoords())
  }, [dispatch])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="app" element={<AppLayout />}>
            <Route path="form" element={<Form />} />
          </Route>
          <Route index element={<Navigate replace to="app" />} />
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
