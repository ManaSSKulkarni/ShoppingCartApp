import Home from './components/home.js';
import {Routes,Route} from 'react-router-dom';
import About from './components/about.js'
import RegistrationForm from './components/registration.js';
import Order from './components/orderpage.js';
import ReviewOrder from './components/revieworder.js';
import PrintBill from './components/printbill.js';
import { MyCart } from './components/cart.js';
import { User } from './components/user.js';

function App() {
  return (
    <>
    <User>
      <MyCart>
        <Routes>
          <Route path='/mycart' element={<Home />} />
          <Route path='mycart/about' element={<About />} />
          <Route path='mycart/register' element={<RegistrationForm />} />
          <Route path='mycart/register/order' element={<Order />} />
          <Route path='mycart/register/order/revieworder' element={<ReviewOrder />} />
          <Route path='mycart/register/order/review/orderplaced' element={<PrintBill />} />
        </Routes>
     </MyCart>
    </User>
    </>
  );
}


export default App;
