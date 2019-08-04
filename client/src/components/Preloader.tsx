import React from 'react';
const preloader = require('../assets/expensify-preloader.svg');
const Preloader = () => (
  <div className="preloader-container">
    <img src={preloader} />
  </div>
);

export default Preloader;
