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
                                    <h1 className="common">Meet out team</h1>
                                    <p className='ptb20'>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut<br /> aliquid ex ea commodi consequatur  incidunt ut labore et dolore magnam aliquam.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="cardTeam">
                                    <img src="projectstarter/socials/personImg.png" alt="personlogo" className='img-fluid' />
                                    <div>
                                        <h4>John Doe</h4>
                                        <p>CEO/Founder</p>
                                        <a href=""> <i class="fab fa-linkedin-in" /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="cardTeam">
                                    <img src="projectstarter/socials/sarah.png" alt="personlogo" className='img-fluid' />
                                    <div>
                                        <h4>Saron Denzen</h4>
                                        <p>Co-Founder</p>
                                        <a href=""> <i class="fab fa-linkedin-in" /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="cardTeam">
                                    <img src="projectstarter/socials/Dduck.png" alt="personlogo" className='img-fluid' />
                                    <div>
                                        <h4>David Jonson</h4>
                                        <p>Managing Director</p>
                                        <a href=""> <i class="fab fa-linkedin-in" /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="cardTeam">
                                    <img src="projectstarter/socials/personImg.png" alt="personlogo" className='img-fluid' />
                                    <div>
                                        <h4>John Doe</h4>
                                        <p>CEO/Founder</p>
                                        <a href=""> <i class="fab fa-linkedin-in" /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="cardTeam">
                                    <img src="projectstarter/socials/Alex.png" alt="personlogo" className='img-fluid' />
                                    <div>
                                        <h4>Alex </h4>
                                        <p>Co-Founder</p>
                                        <a href=""> <i class="fab fa-linkedin-in" /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="cardTeam">
                                    <img src="projectstarter/socials/personImg.png" alt="personlogo" className='img-fluid' />
                                    <div>
                                        <h4>John Doe</h4>
                                        <p>CEO/Founder</p>
                                        <a href=""> <i class="fab fa-linkedin-in" /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="cardTeam">
                                    <img src="projectstarter/socials/Alex.png" alt="personlogo" className='img-fluid' />
                                    <div>
                                        <h4>Alex </h4>
                                        <p>Co-Founder</p>
                                        <a href=""> <i class="fab fa-linkedin-in" /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="cardTeam">
                                    <img src="projectstarter/socials/personImg.png" alt="personlogo" className='img-fluid' />
                                    <div>
                                        <h4>John Doe</h4>
                                        <p>CEO/Founder</p>
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
