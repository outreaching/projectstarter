import React from 'react';
import './roadmap.scss';
import { useSelector } from 'react-redux'
const Roadmap = () => {
    const dark = useSelector(state => state.UserReducer.theme);
    return (
        <>
            <div className={dark}>
                <div className="row">
                    <div className="col-sm-12 p-0">
                        <div className="inner-img text-center">
                            <img src={dark==='dark' ? '/projectstarter-dark/curve-bottom.png':'/projectstarter/curve-bottom.png' } className="img-fluid w100" alt="" />
                        </div>
                    </div>
                </div>
                <section className="main-rewards" id="roadmap">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="inner-img text-center">
                                    <h1 className="common">ROUND 2 - FCFS ROUND</h1>
                                </div>
                            </div>
                        </div>
                        <div className="row ptb">
                            <div className="col-sm-7">
                                <div className="inner-content ptb">
                                    <h4 className="ptb20">At vero eos et accusamus <span className="common">et iusto odio dignissimos</span>ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias</h4>
                                    <p className="grey">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                                    <p className="grey ptb20">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                                </div>
                            </div>
                            <div className="col-sm-5">
                                <div className="inner-img text-center">
                                    <img src="\projectstarter\round-two\round-two-illustration.svg" className="img-fluid" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Roadmap;
