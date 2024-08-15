import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddDoctor from './admins/AddDoctor';
import EditDoctor from './admins/EditDoctor';
import Home from './pages/Home';
import ViewDoctor from './admins/ViewDoctor';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Manufacturer from './pages/Manufacturer';
import AddManufacturer from './manufacturers/AddManufacturer';
import EditManufacturer from './manufacturers/EditManufacturer';
import ViewManufacturer from './manufacturers/ViewManufacturer';
import Pharmacist from './pages/Pharmacist';
import AddPharmacist from './Pharmacists/AddPharmacist';
import EditPharmacist from './Pharmacists/EditPharmacist';
import ViewPharmacist from './Pharmacists/ViewPharmacist';
import Supplier from './pages/Supplier';
import AddSupplier from './suppliers/AddSupplier';
import ViewSupplier from './suppliers/ViewSupplier';
import EditSupplier from './suppliers/EditSupplier';
import Doctorhome from './pages/Doctorhome';
import Manufacturerhome from './pages/Manufacturerhome';
import Supplierhome from './pages/Supplierhome';
import Pharmacisthome from './pages/Pharmacisthome';
import Medicine from './pages/Medicine';
import AddMedicines from './Medicines/AddMedicines';
import ViewMedicines from './Medicines/ViewMedicines';
import EditMedicines from './Medicines/EditMedicines';
import Home1 from './pages/Home1';
import PharmacistMedicine from './pages/Pharmacistmedicine';
import Order from './pages/Order';
import ApprovedOrders from './pages/ApprovedOrders'
import PharmacistKeMedicines from './pages/PharmacistKeMedicines';
import ViewPharmacistkemedicines from './pharmacistkemedicines/ViewPharmacistkemedicines';
import EditPharmacistkemedicines from './pharmacistkemedicines/EditPharmacistkemedicines';
import Pharmahome from './pages/Pharmahome';
import Doctorbuy from './pages/Doctorbuy';
import PharmacistOrders from './pages/PharmacistOrders';
import POS from './pages/POS';
import Approvedpharma from './pages/Approvedpharma';
import Doctorview from './pages/Doctorview';
function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/manufacturers" element={<Manufacturer/>}/>
          <Route path="/addmanufacturer" element={<AddManufacturer />}/>
          <Route path="/adddoctor" element={<AddDoctor />} />
          <Route path="/editmanufacturer/:id" element={<EditManufacturer />}/>
          <Route path="/edituser/:id" element={<EditDoctor />} />
          <Route path="/viewuser/:id" element={<ViewDoctor />} />
          <Route path="/viewmanufacturer/:id" element={<ViewManufacturer />}/>
          <Route path="/pharmacists" element={<Pharmacist />}/>
          <Route path="/addpharmacist" element={<AddPharmacist />}/>
          <Route path="/editpharmacist/:id" element={<EditPharmacist />}/>
          <Route path="/viewpharmacist/:id" element={<ViewPharmacist/>}/>
          <Route path="/suppliers" element={<Supplier/>}/>
          <Route path="/addsupplier" element={<AddSupplier />}/>
          <Route path="/viewsupplier/:id" element={<ViewSupplier />}/>
          <Route path="/editsupplier/:id" element={<EditSupplier />}/>
          <Route path="/doctorhome" element={<Doctorhome />}/>
          <Route path="/manufacturerhome" element={<Manufacturerhome />}/>
          <Route path="/supplierhome" element={<Supplierhome />}/>
          <Route path="/pharmacisthome" element={<Pharmacisthome />}/>
          <Route path="/medicines" element={<Medicine />}/>
          <Route path="/addmedicines" element={<AddMedicines />}/>
          <Route path="/viewmedicines/:id" element={<ViewMedicines />}/>
          <Route path="/editmedicines/:id" element={<EditMedicines />}/>
          <Route path="/home1" element={<Home1 />}/>
          <Route path="/pharmacistmedicine" element={<PharmacistMedicine/>}/>
          <Route path="/manufacturerorders" element={<Order/>}/>
          <Route path="/approvedorders" element={<ApprovedOrders/>}/>
          <Route path="/pharmacistkemedicines" element={<PharmacistKeMedicines/>}/>
          <Route path="/viewpharmacistkemedicines/:id" element={<ViewPharmacistkemedicines/>}/>
          <Route path="/editpharmacistkemedicines/:id" element={<EditPharmacistkemedicines/>}/>
          <Route path="/pharmahome" element={<Pharmahome/>}/>
          <Route path='/doctorbuy' element={<Doctorbuy/>}/>
          <Route path='/pharmaorders' element={<PharmacistOrders/>}/>
          <Route path='/POS' element={<POS/>}/>
          <Route path='/approvedpharma' element={<Approvedpharma/>}/>
          <Route path='/doctorview' element={<Doctorview/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
