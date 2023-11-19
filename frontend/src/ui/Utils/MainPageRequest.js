/**************************************************************************
 * This file should contain functions that make requests to the backend.  *
 * So that it will be easier to test it with dependency injection.        *
 **************************************************************************/

import axios from 'axios';

export const getCurrentPlace = async (url) => {
  throw new Error('Not implemented');
};

// // Function to make a GET request
// export const getRequest = async (url) => {
//   try {
//     const response = await axios.get(url);
//     return response.data;
//   } catch (error) {
//     console.error('Error making GET request:', error);
//     throw error;
//   }
// };

// // Function to make a POST request
// export const postRequest = async (url, data) => {
//   try {
//     const response = await axios.post(url, data);
//     return response.data;
//   } catch (error) {
//     console.error('Error making POST request:', error);
//     throw error;
//   }
// };

// // Function to make a PUT request
// export const putRequest = async (url, data) => {
//   try {
//     const response = await axios.put(url, data);
//     return response.data;
//   } catch (error) {
//     console.error('Error making PUT request:', error);
//     throw error;
//   }
// };

// // Function to make a DELETE request
// export const deleteRequest = async (url) => {
//   try {
//     const response = await axios.delete(url);
//     return response.data;
//   } catch (error) {
//     console.error('Error making DELETE request:', error);
//     throw error;
//   }
// };
