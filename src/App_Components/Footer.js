import React from 'react'
import { FaLinkedinIn, FaGithub, FaTwitter } from 'react-icons/fa';
import './footer.css'

const Footer = () => {
  return (
    <footer className="container-fluid footer text-light shadow-lg mt-5">
      <div className="row p-4">
      <div className="col-sm-12 d-flex flex-column align-items-center">
            
            <div className="social-icons d-flex flex-row justify-content-center">
              <a
                href="https://www.linkedin.com/in/eleazer-ugwu-662211200/"
                target="_blank"
                rel="noopener noreferrer">
                <FaLinkedinIn color="white" size={20}/>
              </a>

              <a
                href="https://github.com/MobuchiElly"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub color="white" size={20}/>
              </a>
              
              <a href="">
                <FaTwitter color="white" size={20}/>
              </a>
            </div>

          <div className="col-sm-12 d-flex justify-content-center">
            <h3 className='text-light'>&copy; BuchiDev</h3>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer