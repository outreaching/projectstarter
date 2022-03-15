import React from 'react';
import './footersecondary.scss';
import { useSelector } from 'react-redux'
function FooterSecondary() {
    const dark = useSelector(state => state.UserReducer.theme);
    return (
        <>
            <div className={dark}>
                <section className="footerSecondary-main ptb">
                    <div className="container">
                        <div className="row ptb">
                            <div className="col-md-6 text-center my-auto">
                                <img src="\projectstarter-dark\logo.svg" className='img-fluid' alt="logo" />
                            </div>
                            <div className="col-sm-6 text-center my-auto">
                                <p className='mt-md-0 '>© PROJECTSTARTER - 2021 COPYRIGHT</p>
                            </div>
                            {/* <div className="col-12">
                                <div className="footerS-inner ptb">
                                    
                                    <img src="\projectstarter\header\logo.svg" className='img-fluid' alt="logo" />
                                    <p className='mt-md-0 mt-3 '>© PROJECTSTARTER - 2021 COPYRIGHT</p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default FooterSecondary
