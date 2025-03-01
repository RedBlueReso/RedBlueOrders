
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useQuery} from '@apollo/client'
import {Toaster} from 'react-hot-toast'
import { Navigate } from 'react-router-dom';

// local
import NotFound from './pages/NotFound.jsx';
import NavBar from './components/NavBar.jsx';
import CreateFood from './pages/CreateFood.jsx';
import UpdateFood from './pages/UpdateFood.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx';
import Cart from './pages/Cart.jsx'
import Test from './Test.jsx';

import { AUTH_CUSTOMER} from './graphql/query/customer.query.js' 

function App() {
  
  const {data} = useQuery(AUTH_CUSTOMER)
  const authCustomer = data?.authCustomer;
  console.log(authCustomer)
  return (
    <>
      <Router>
        
            <div className="min-h-screen bg-gray-100">
              <NavBar />
              <Routes>
                <Route path="/" element={authCustomer ? <Home /> : <Navigate to='/login/0' />} />
                <Route path="/admin" element={ <Home userAdmin = {true}/>} />
                <Route path="/login/:tn" element={!authCustomer ? <Login /> : <Navigate to="/"/>} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/cart" element={authCustomer ? <Cart /> : <Navigate to='/login/0' />} /> 
                <Route path="/create" element={<CreateFood />} />
                <Route path="/update/:id" element={<UpdateFood />} />
                <Route path="test" element={<Test />} />
                <Route path="*" element={<NotFound />} />

              </Routes>
              <Toaster/>
            </div>
        
      </Router>

    </>
  )
}

export default App
