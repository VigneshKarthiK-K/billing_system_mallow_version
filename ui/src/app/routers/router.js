import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CreateBillPage, ShowBillPage } from '../modules/bill'
import { VisitorForm } from '../modules/visitors'


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/bill/create" replace />} /> */}
        <Route path="/" element={<Navigate to="/visitor/form" replace />} />
        <Route path='visitor/'>
          <Route path='form/' element={<VisitorForm/>}/>
        </Route>
        <Route path='bill/'>
          <Route path='create/' element={<CreateBillPage/>}/>
          <Route path='show/:bill_id/' element={<ShowBillPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
