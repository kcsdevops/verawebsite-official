import React from "react"
import { Routes, Route } from "react-router-dom"
import {
  CHOOSE_DATE,
  CHOOSE_PROFESSIONAL,
  CHECKOUT,
} from "../../routes"

const ChooseProcedure = React.lazy(() => import("../choose-procedure"))

const ChooseProfessional = React.lazy(() => import("../choose-professional"))

const ChooseDate = React.lazy(() => import("../choose-date"))

const Checkout = React.lazy(() => import("../checkout"))

const Schedule = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ChooseProcedure />} />
        <Route path={CHOOSE_PROFESSIONAL} element={<ChooseProfessional/>} />
        <Route path={CHOOSE_DATE} element={<ChooseDate/>} />
        <Route path={CHECKOUT} element={<Checkout/>} />
      </Routes>
    </>
  )
}

export default Schedule
