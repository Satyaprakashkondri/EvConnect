import React from "react";
import "../css/index.css"
import sample1 from "../assets/HomePageBackground.png"
import sample2 from "../assets/sample2.jpg"





const IndexPage = () => {

  return (
    <div className='about'>
    <div className='about-banner' style={{fontFamily:"sans-serif"}}>
      <h1>Charge Up Your Journey With Eco-Friendly EV's.</h1>
    </div>
    <div className='about-content1'>
      <img src={sample1} alt="" />
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, dolorem illo qui reiciendis impedit quas. Accusamus ducimus ea maxime in distinctio deserunt iusto modi consequuntur quibusdam, culpa quam necessitatibus ipsum?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, dolorem illo qui reiciendis impedit quas. Accusamus ducimus ea maxime in distinctio deserunt iusto modi consequuntur quibusdam, culpa quam necessitatibus ipsum?
      </p>
    </div>
    <div className='about-content2' style={{marginBottom:"100px"}}>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, dolorem illo qui reiciendis impedit quas. Accusamus ducimus ea maxime in distinctio deserunt iusto modi consequuntur quibusdam, culpa quam necessitatibus ipsum?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, dolorem illo qui reiciendis impedit quas. Accusamus ducimus ea maxime in distinctio deserunt iusto modi consequuntur quibusdam, culpa quam necessitatibus ipsum?
      </p>
      <img src={sample2} alt="" />
    </div>
    </div>
  );
};

export default IndexPage;
