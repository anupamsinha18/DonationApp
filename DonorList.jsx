// DonorList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Hwader from './Hwader';
import './DonorList.css';

const DonorList = () => {
  const [donors, setDonors] = useState([]);
  const apiUrl = "http://localhost:5000/api/v1/listdonors";

  const fetchApi = async (api) => {
    try {
      const response = await axios.get(api);
      const data = response.data;
      setDonors(data);
      console.log("Fetched data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchApi(apiUrl);
  }, []);

  return (
    <>
      <Hwader />
      <div className='donor-main'>
        <table className='donor-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Country</th>
              <th>Contact Number</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {donors.length > 0 ? (
              donors.map((donor, index) => (
                <tr key={index}>
                  <td>{donor.donor_name}</td>
                  <td>{donor.donor_email_id}</td>
                  <td>{donor.donor_country}</td>
                  <td>{donor.donor_mobile_number}</td>
                  <td>{donor.donor_amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DonorList;
