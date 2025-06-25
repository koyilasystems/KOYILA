import React from 'react'
import { FaUserPlus } from 'react-icons/fa'
import { MdFindInPage } from 'react-icons/md'
import { IoMdSend } from 'react-icons/io'

const HowItWorks = () => {
  return (
    <div className='howitworks'>
        <div className="container">
          <h3>How KOYILA WORKS </h3>
            <div className="banner">
                <div className="card">
                    <FaUserPlus/>
                    <p>Create Account</p>
                    <p>IT is very Easy way to create an account form KOYILA SYSTEMS JOB SEARCH.
                      Only one thing you need to register from your email account.
                      Then, 
                      Login from that account then look into job then applay.
                    </p>
                </div>
                <div className="card">
                    <MdFindInPage/>
                    <p>Find a Job/Post A Job</p>
                    <p>IT is very Easy way to create an account form KOYILA SYSTEMS JOB SEARCH.
                      Only one thing you need to register from your email account.
                      Then, 
                      Login from that account then look into job then applay.
                    </p>
                </div>
                <div className="card">
                    <IoMdSend/>
                    <p>Create Account</p>
                    <p>IT is very Easy way to create an account form KOYILA SYSTEMS JOB SEARCH.
                      Only one thing you need to register from your email account.
                      Then, 
                      Login from that account then look into job then applay.
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HowItWorks