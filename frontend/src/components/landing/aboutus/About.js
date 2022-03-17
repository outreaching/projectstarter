import React from 'react';
import './about.scss';
import { useSelector } from 'react-redux'
const About = () => {
    const dark = useSelector(state => state.UserReducer.theme); 
    return (
        <>
            <div className={dark}>
                <section className="main-about ptb" id="aboutus">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="inner-img text-center">
                                    <img src={dark==='dark'?"/projectstarter/about-us/Projectstarter_Project-Detail dark.svg":"/projectstarter/about-us/Projectstarter_Project-Detail.svg"} className="img-fluid" alt="" />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="inner-content pt-3">
                                    <h6 className="common">About <b>Projectstarter</b> </h6>
                                    <h4 className="ptb20">At vero eos et accusamus <span className="common">et iusto odio dignissimos</span>ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias</h4>
                                    <p className="grey">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                                    <p className="grey ptb20">
                                        Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi consequatur.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>


                </section>
                <div className="row">
                    <div className="col-sm-12 p-0">
                        <div className="inner-img text-center">
                            <img src={dark==='dark'?"/projectstarter-dark/curve-top.png":"/projectstarter/curve-top.png"} className="img-fluid w100" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About;
