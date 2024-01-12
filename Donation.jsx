// DonationPage.js

import React, { useEffect, useState } from 'react';
import './Donation.css';
import data from '../Assets/data.json'
import Hwader from './Hwader';
import axios from 'axios';


const Donation = () => {
  const [donorName, setDonorName] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState('+91');
  const [countryCodes, setCountryCodes] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [cause, setCause] = useState('');
  const [donorNameError, setDonorNameError] = useState('');
  const [donorEmailError, setDonorEmailError] = useState('');
  const [contactNumberError, setContactNumberError] = useState('');
  const [amountError, setAmountError] = useState('');
 
const loadScript =(src) =>{
  return new Promise((resolve) => {
    const script= document.createElement('script')
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () =>{
      resolve(false)
    }
    document.body.appendChild(script)
  })
}
const displayRazor = async() =>{
  const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
if (!res){
  alert('you are offline failed to load')
  return
}

const options = {
  key:"rzp_test_0kUFOaNwOklBWd",
  currency: "INR",
  amount:amount*100,
  name: "Donation",
  decription: "thanks for help",
  image:"",

  handler: function (response) {
    // alert(response.razorpay_payment_id);
    setShowModal(true);
  },
  prefill: {
    name: "",
  },
};

const paymentObject = new window.Razorpay(options);
paymentObject.open();
};



  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries()
    const codes = data.map(country => country.dial_code);
    setCountryCodes(codes);
  }, []);
;




const handleSubmit = async (e) => {
  e.preventDefault();
 


  if (!donorName.trim()) {
    setDonorNameError('Please enter Donor Name.');
    return;
  }

  if (/\d/.test(donorName)) {
    setDonorNameError('Please enter a valid Donor Name without numeric characters.');
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setDonorEmailError('Please enter a valid email.');
    return;
  }

  if (!/^\d{10}$/.test(phoneNumber)) {
    setContactNumberError('Please enter a valid 10-digit Contact Number.');
    return;
  }

  if (amount < 1) {
    setAmountError('Please enter a valid amount.');
    return;
  }

  try {
    const response = await axios.post('http://localhost:5000/api/v1/savedonation', {
      donor_name: donorName,
      donor_email_id: email,
      donor_mobile_number: selectedCountryCode + phoneNumber,
      donor_amount: amount,
      donor_country: selectedCountry,
      donor_cause: cause,
    });

    console.log('Server response:', response.data);
    displayRazor();
  } catch (error) {
    console.error('Error submitting form:', error.response ? error.response.data : error.message);
  }
};



const isButtonDisabled = !(selectedCountry && selectedCountryCode && amount && email && document.getElementById('name').value.trim() !== '');

const closeModal = () => {
  setShowModal(false);
};

const Modal = () => {
  return (
    <div className="modal-overlay">
    <div className="modal">
      <div className="modal-content">
        <h2>Payment Successfully</h2>
        <p>Thank you for your donation!</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
    </div>
  );
};

  return (
    <div>
      <Hwader />
      <div className="container">
        <div className="card">
          <h2>Donate Now</h2>
          <form className="form" id="donation-form">
            <label>Name:</label>
            <input type="text" id="name"  value={donorName} onChange={(e) => setDonorName(e.target.value)}name="name" required />
            {donorNameError && <span className="error-message">{donorNameError}</span>}

            <label >Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
               {donorEmailError && <span className="error-message">{donorEmailError}</span>}


            <label htmlFor="donorCountry">Donor Country:</label>
      <select
        id="donorCountry"
        name="donorCountry"
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.alpha3Code} value={country.name.common}>
            {country.name.common}
          </option>
        ))}
      </select>
    
      <div className="form-field">
  <label >Phone Number:</label>
  <div className="phone-input">
    <select
      id="donorCountryCode"
      name="donorCountryCode"
      value={selectedCountryCode}
      onChange={(e) => setSelectedCountryCode(e.target.value)}
      >
      <option value=""></option>
      {countryCodes.map((code) => (
        <option key={code} value={code}>
          {code}
        </option>
      ))}
    </select>
    <input
      type="text"
      id="donorPhoneNumber"
      name="donorPhoneNumber"
      placeholder="Enter phone number"
      value={phoneNumber}
      onChange={(e) => setPhoneNumber(e.target.value)}
      required
    />
  </div>
  {contactNumberError && <span className="error-message">{contactNumberError}</span>}
 
</div>
      <label>Donation Amount:</label>
            <input
        type="number"
        id="amount"
        name="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      {amountError && <span className="error-message">{amountError}</span>}
         
            <label>Payment Method:</label>
            <select id="payment-method" name="payment-method" required>
              <option value="">Select Payment Method</option>
              <option value="credit-card">Credit Card</option>
              <option value="paypal">PayPal</option>
            </select>

            <label>Donation Cause</label>
            <input type="text" id="text" name="cause" value={cause}     onChange={(e) => setCause(e.target.value)} required />


            <button type="submit" disabled={isButtonDisabled}  onClick={handleSubmit} >Register</button>
          </form>
         
          {showModal && <Modal />}
        </div>
      </div>
    </div>
  );
};

export default Donation;
