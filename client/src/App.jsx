import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PaymentSuccess from './pages/PaymentSuccess';


function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/payment-success' element={<PaymentSuccess />} />
    </Routes>
  );
}

export default App;
