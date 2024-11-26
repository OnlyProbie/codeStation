import { Navigate, Routes, Route } from "react-router-dom";
import Issues from "../pages/Issues";
import Books from "../pages/Books";
import InterViews from '../pages/InterViews'

export default function RoutesConfig () {
    return (
        <Routes>
            <Route path='/issues' element={<Issues />} />
            <Route path='/books' element={<Books />} />
            <Route path='/interviews' element={<InterViews />} />
            <Route path='/' element={<Navigate replace to='/books' />} />
        </Routes>
    )
}