import React from 'react'
import './meetteam.scss'
import { useSelector } from 'react-redux'
function MeatTeam() {
    const dark = useSelector(state => state.UserReducer.theme);
    return (
        <>
            <div className={dark}>
                <section className=' ourTeam ptb'>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="ourTeam-heading text-center ">
                                    <h1 className="common">Our Team</h1>
                                    <p className='ptb20'>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut<br /> aliquid ex ea commodi consequatur  incidunt ut labore et dolore magnam aliquam.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="cardTeam">
                                    <img src="projectstarter/socials/Duke-Lim.jpg" alt="personlogo" className='img-fluid' />
                                    <div>
                                        <h4>Duke Lim</h4>
                                        <p>Chief Executive Officer</p>
                                        <a href=""> <i class="fab fa-linkedin-in" /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="cardTeam">
                                    <img src="projectstarter/socials/Darren-Low.jpg" alt="personlogo" className='img-fluid' />
                                    <div>
                                        <h4>Darren Low</h4>
                                        <p>Chief Technology Officer</p>
                                        <a href=""> <i class="fab fa-linkedin-in" /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="cardTeam">
                                    <img src="projectstarter/socials/Gary-Liu.jpg" alt="personlogo" className='img-fluid' />
                                    <div>
                                        <h4>Gary Liu</h4>
                                        <p>Chief Strategic Officer</p>
                                        <a href=""> <i class="fab fa-linkedin-in" /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="cardTeam">
                                    <img src="projectstarter/socials/Barry-Tan.jpg" alt="personlogo" className='img-fluid' />
                                    <div>
                                        <h4>Barry Tan</h4>
                                        <p>Chief Visionary Officer</p>
                                        <a href=""> <i class="fab fa-linkedin-in" /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="cardTeam">
                                    <img src="projectstarter/socials/Nicole-Chen.jpg" alt="personlogo" className='img-fluid' />
                                    <div>
                                        <h4>Nicole Chen</h4>
                                        <p>Chief Business Development</p>
                                        <a href=""> <i class="fab fa-linkedin-in" /></a>
                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default MeatTeam
