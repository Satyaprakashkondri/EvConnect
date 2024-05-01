import React from "react";
import sample1 from "../assets/Assests/sample1.jpg";
import sample2 from "../assets/Assests/sample2.jpg";
import Person1 from "../assets/Assests/Person1.png";
import Person2 from "../assets/Assests/Person2.png";
import Person3 from "../assets/Assests/Person3.png";
import Person4 from "../assets/Assests/Person4.png";


import "../css/about.css";

const AboutPage = () => {
  return (
    <div className='about'>
      <div className='about-banner'>
        <h1>About Us</h1>
      </div>
      <div className='about-content1'>
        <img src={sample1} alt="" />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, dolorem illo qui reiciendis impedit quas. Accusamus ducimus ea maxime in distinctio deserunt iusto modi consequuntur quibusdam, culpa quam necessitatibus ipsum?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, dolorem illo qui reiciendis impedit quas. Accusamus ducimus ea maxime in distinctio deserunt iusto modi consequuntur quibusdam, culpa quam necessitatibus ipsum?
        </p>
      </div>
      <div className='about-content2'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, dolorem illo qui reiciendis impedit quas. Accusamus ducimus ea maxime in distinctio deserunt iusto modi consequuntur quibusdam, culpa quam necessitatibus ipsum?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, dolorem illo qui reiciendis impedit quas. Accusamus ducimus ea maxime in distinctio deserunt iusto modi consequuntur quibusdam, culpa quam necessitatibus ipsum?
        </p>
        <img src={sample2} alt="" />
      </div>
      <div className='team' style = {{marginBottom:"100px"}}>
        <h1 style={{fontFamily:"sans-serif",fontSize:"30px",fontWeight: 600}}>Our Team</h1>
        <div className="team-members">
          <div className='team-member'>
            <img src={Person1} alt="" />
            <h1>Person Name</h1>
            <p>Role</p>
          </div>
          <div className='team-member'>
            <img src={Person2} alt="" />
            <h1>Person Name</h1>
            <p>Role</p>
          </div>
          <div className='team-member'>
            <img src={Person3} alt="" />
            <h1>Person Name</h1>
            <p>Role</p>
          </div>
          <div className='team-member'>
            <img src={Person4} alt="" />
            <h1>Person Name</h1>
            <p>Role</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AboutPage;