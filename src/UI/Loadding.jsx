import React from 'react';
import ReactLoading from 'react-loading';
 
const LoaddingUI = ({ type, color }) => (
    <ReactLoading type={type} color={color} height={667} width={375} />
);
 
export default LoaddingUI;