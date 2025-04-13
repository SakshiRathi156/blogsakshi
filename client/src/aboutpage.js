import React from 'react';
import { ReactTyped as Typed } from 'react-typed';

const AboutPage = () => {
    return (
        <div className='aboutpage'>
            <div className="about-container">
                <div className="about-header">
                    <h3 className="greeting">Hello, It's Me</h3>
                    <h1 className="name">Sakshi Rathi</h1>
                    <h3 className="role">
                        And I'm a <span className='multiple'>
                            <Typed
                                strings={['Blogger', 'Programmer', 'Data Science Enthusiast', 'AI/ML Enthusiast']}
                                typeSpeed={55}
                                backSpeed={30}
                                loop
                            />
                        </span>
                    </h3>
                </div>

                <div className='about-content'>
                    <div className='about-text'>
                        <h2 className='about-heading'>About Me</h2>
                        <p className='about-paragraph'>
                            I find solace in sharing my thoughts through my blog, hoping to uplift along the way.
                            If you need a reminder that everything is going to be okay, you've found the right place.
                            Let's navigate these things together.
                        </p>
                    </div>
                </div>

                <div className="connect-section">
                    <h3 className="connect-heading">Let's Connect</h3>
                    <div className='socialmedia'>
                        <a href='https://www.linkedin.com/in/sakshirathi156/' target='_blank' rel="noopener noreferrer" aria-label="LinkedIn Profile">
                            <i className='bx bxl-linkedin'></i>
                        </a>
                        <a href='https://www.instagram.com/sakshi.designhub/' target='_blank' rel='noopener noreferrer' aria-label="Instagram Profile">
                            <i className='bx bxl-instagram'></i>
                        </a>
                        <a href='mailto:sakshirathi156@gmail.com' target='_blank' rel='noopener noreferrer' aria-label="Email Sakshi Rathi">
                            <i className='bx bxl-gmail'></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
