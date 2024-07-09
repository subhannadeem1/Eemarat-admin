import React from 'react'
import SideBar from '../components/SideBar'
import { Route, Routes } from "react-router-dom"
import AddProduct from '../components/AddProduct'
import ListProduct from '../components/ListProduct'
import WorkerBooking from '../components/WorkerBooking'
const Admin = () => {
  return (
    <div className='lg:flex'>
        <SideBar />
        <Routes>
             <Route path='/addproduct' element={<AddProduct />}/>
             <Route path='/listproduct' element={<ListProduct />}/>
             <Route path='/workerBooking' element={<WorkerBooking />}/>
        </Routes>
    </div>
  )
}

export default Admin