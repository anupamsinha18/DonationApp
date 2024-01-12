// MyWebsite.js

import React, { useEffect } from 'react';
import './style.css'; // Import the existing CSS file
import { Link } from 'react-router-dom';
// import mypic from './Assets/oopp.jpg'


const Webpage = () => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      if ('ontouchstart' in window === false) {
        const moveX = (e.pageX * -1) / 30;
        const moveY = (e.pageY * -1) / 30;
        document.querySelector('.content').style.backgroundPosition = `${moveX}px ${moveY}px`;
      }
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;

      document.querySelector('.butt').style.marginTop = `${scrollTop / 1.25 + 200}px`;
      document.querySelector('.welcome').style.marginTop = `${scrollTop / 1.1}px`;
      document.querySelector('.about').style.marginTop = `${scrollTop / 1.2 + 125}px`;

      document.querySelector('.one').classList.add('on');
      document.querySelector('.two').classList.add('on');
      document.querySelector('.three').classList.add('on');

      setTimeout(() => {
        document.querySelector('.one').classList.add('on');
        setTimeout(() => {
          document.querySelector('.two').classList.add('on');
          setTimeout(() => {
            document.querySelector('.three').classList.add('on');
          }, 300);
        }, 300);
      }, 300);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      // Clean up the event listeners when the component unmounts
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures that this effect runs once on mount

  return (
    <div>
      
      < div className="intro">
        <h2 className="welcome">AnupamAidAlliance</h2>
        <h3 className="about">Donating is cultivating kindness to reap change—a harvest of goodwill from seeds of hope and compassion.. </h3>
        
      
      <Link to="/donation" id="button">
  <button className="butt" id="button" >Donate Now</button>
      </Link>
   
        
      </div>

      <div className="content">
        <h1>Our team</h1>

        <div className="one">
          <img src="data:image/jpeg;base64,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" alt="The Hacker" />
          <p className="name">Chairperson</p>
          <p className="aboutName">
          Provide visionary leadership and set the overall direction and goals of the foundation.
Establish the mission, values, and strategic priorities of the foundation.
Build and maintain relationships with key stakeholders, including donors, partners, and the community.
          </p>
        </div>

        <div className="two">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRab-l2oxcj1OiNPAij5cVest_osUOCuvjNLVv57CbqWw&s" alt="The Brains" />
          <p className="name">CEO (CTO)</p>
          <p className="aboutName">
          Implement the strategic plan set by the founder/chairperson.
Manage day-to-day operations and ensure the foundation operates efficiently.
Build and lead a team of staff and volunteers.
          </p>
        </div>

        <div className="three">
          <img src="data:image/jpeg;base64,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" alt="The Fighter" />
          <p className="name">Program Manager</p>
          <p className="aboutName">
          Design and implement programs and initiatives that align with the foundation's mission.
Coordinate and collaborate with partner organizations and stakeholders to execute programs effectively.
          </p>
        </div>
      </div>
     
    </div>
  );
};

export default Webpage;
