import React from 'react'
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="page notfound">
      <div className="content">
          <iframe src="/notfound.png" alt="notfound"/>
          <Link to={"/"}>RETURN TO HOME</Link>
      </div>
    </section>
  );
};

export default NotFound;