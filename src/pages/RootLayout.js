import React from "react"
import { Fragment } from "react"
import { Outlet } from "react-router-dom"

import Footer from "./footer"

const RootLayout = ()=>{
    
    return (
        <Fragment>
        <Outlet/>
        <Footer/>
        </Fragment>
    )}


export default RootLayout