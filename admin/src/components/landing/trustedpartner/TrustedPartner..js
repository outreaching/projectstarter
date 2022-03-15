import React from 'react'
import './trustedpartner.scss'
import { useSelector } from 'react-redux'
function TrustedPartner() {
    const dark = useSelector(state => state.UserReducer.theme);
    return (
        <>
            <div className={dark}>
                <section className=' trustedPartners ptb'>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="trustedPartners-heading text-center ">
                                    <h1 className="common">Our Trusted Partners</h1>
                                    <p className='ptb20'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem<br /> aliquid ex ea commodi consequatur  incidunt ut labore et dolore magnam aliquam.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="cardTeam">
                                    <img src="projectstarter/socials/p1.svg" alt="personlogo" className='img-fluid' />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="cardTeam">
                                    <img src="projectstarter/socials/p2.svg" alt="personlogo" className='img-fluid' />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="cardTeam">
                                    <img src="projectstarter/socials/p3.svg" alt="personlogo" className='img-fluid' />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="cardTeam">
                                    <img src="projectstarter/socials/p4.svg" alt="personlogo" className='img-fluid' />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default TrustedPartner
