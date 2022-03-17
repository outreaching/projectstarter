import React, { useState, useEffect } from 'react';
import Navbar from '../landing/header/Navbar'
import './admin.scss'
import { Link, useParams } from "react-router-dom";
import FooterSecondary from '../footerSecondary/FooterSecondary'
import { useSelector } from 'react-redux'
import { API_URL } from '../../utils/ApiURL';
import { useWeb3React } from '@web3-react/core';
import { toast } from 'react-toastify';
import { Backdrop } from '@material-ui/core';
import axios from 'axios';
function Admin() {
    const dark = useSelector(state => state.UserReducer.theme);
    const [allprojectss, setallprojectss] = useState([]);
    const [searchTerm, setsearchTerm] = useState('');
    const [itemlength, setitemlength] = useState(10);
    const { account } = useWeb3React();
    const [opens, setOpens] = useState(false);
    const LoadMoreItems = () => {
        const a = parseInt(itemlength) + 5
        setitemlength(a)
    };
    const allprojects = () => {
        setOpens(true)
        axios.post(`${API_URL}/v1/Project/getAllUserProject`,{ address: account })
            .then((response) => {
                setOpens(false)
                setallprojectss(response.data.data)
                console.log("respdsvskjbfwejbcwebvsebfebfeb", response)
            })
            .catch((err) => {
                setOpens(false)
                toast.warning('Error While Geting Detail', {
                    position: "top-right",
                    autoClose: 3000,
                });
                return false;
            })
    }

    
    // console.log("all nft data", allnft)
    useEffect(() => {
        allprojects()
    }, [account])
    const handleSearch = (e) => {
        // search(e.target.value);
        const hgf = e.target.value;
        setsearchTerm(hgf)
    }
    console.log("newsearch", searchTerm)
    // console.log("stae data",allprojectss)
    // let userlike
    const allproj = allprojectss?.filter((elem, index) => {
        console.log("scbabhasbsabhasvhhsabcsahc")
        if (searchTerm === null) {
            console.log("scbabhasbsabhasvhhsabcsahc 222222")
            return elem
        }
        else if (elem?.projectName.toLowerCase().includes(searchTerm.toLowerCase())) {
            // const startpresaledate = elem?.preSaleStartDateAndTime.split('T')[0];
            return (
                <tr index={index}>
                    <td scope="row">
                        <ul className='list-inline d-flex align-items-center'>
                            <li className='list-inline-item'>
                                <img src={elem?.logoURL} alt="img" className=' roundImg' />
                            </li>
                            <li className='list-inline-item imgDetail'>
                                <p>{elem?.projectName}</p>
                                <p>{elem?.symbol}</p>
                            </li>
                        </ul>
                    </td>
                    {/* <td>{elem?.websiteLink}</td> */}
                    {/* <td>{elem?.preSaleStartDateAndTime?.split('T')[0]}</td> */}
                    <td className=' truncate '>{elem?.contractAddress}</td>
                    <td>
                    </td>
                    <td>
                        <Link to={`/admindetail/${elem?._id}`} >
                            <button className='btn-common buttonCustom m-0'>Details</button></Link></td>
                </tr>
            )
        }

    })
        .slice(0, itemlength).map((elem, index) => {
            // const startpresaledate = elem?.preSaleStartDateAndTime?.split('T')[0];
            return (
                <tr index={index}>
                    <td scope="row">
                        <ul className='list-inline d-flex align-items-center'>
                            <li className='list-inline-item'>
                                <img src={elem?.logoURL} alt="img" className=' roundImg' />
                            </li>
                            <li className='list-inline-item imgDetail'>
                                <p>{elem?.projectName}</p>
                                <p>{elem?.symbol}</p>
                            </li>
                        </ul>
                    </td>
                    {/* <td>{elem?.websiteLink}</td>
                    <td>{elem?.preSaleStartDateAndTime?.split('T')[0]}</td> */}
                    <td className=' truncate '>
                        <h6 className="asjbajsabsj">{elem?.contractAddress}</h6>
                    </td>
                    <td>
                        {elem?.statusOfApplication}
                    </td>
                    <td><Link to={`/admindetail/${elem?._id}`}><button className='btn-common buttonCustom m-0'>Details</button></Link></td>
                </tr>
            )
        })


    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={opens}>
                <img src="/projectstarter/header/loader.svg" alt="" className="img-fluid shdshhgdss" />
            </Backdrop>
            <div className={dark}>
                <section className='admin'>
                    <Navbar />
                    <div className="container-fluid mt-5">
                        <div className="row">
                            <div className="col-lg-10 m-auto">
                                <div className='table-main '>
                                    <div className="filter-input-div">
                                        <div className="row">
                                            <div className="col-md-3 col-12 mb-3 order-1 order-md-0">
                                                <h3>All Projects</h3>
                                            </div>
                                            <div className="col-md-5 order-2 mb-3 order-md-1">
                                                <input type="text" className="sdsj" type="search" onChange={handleSearch} placeholder='Search project...' />
                                            </div>
                                            {/* <div className="col-md-4 col-12 mb-3 order-1 order-md-2">
                                        <ul className='list-inine'>
                                            <li className='list-inline-item'>
                                                <select className='btn-common-outline' name="Sort by" id="Sort by">
                                                    <option value="Filter">Sort-by</option>
                                                    <option value="Filter">Jawad</option>
                                                </select>
                                            </li>
                                            <li className='list-inline-item'><button className='btn-common-outline'><img src="projectstarter/admin/filter.svg" className='mr-1' alt="" /> Filter</button></li>
                                        </ul>
                                    </div> */}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className=''>
                                                <div className="table-responsive">
                                                    <table class="table table-striped custom-table">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Name</th>
                                                                {/* <th scope="col">Website</th>
                                                                <th scope="col">Starting Date</th> */}
                                                                <th scope="col">Contract Address</th>
                                                                <th scope="col">Status</th>
                                                                <th scope="col">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {allproj}
                                                            {/* <tr>
                                                        <td scope="row">
                                                            <ul className='list-inline d-flex align-items-center'>
                                                                <li className='list-inline-item'>
                                                                    <img src="projectstarter/project-card/admin.png" alt="img" className=' roundImg' />
                                                                </li>
                                                                <li className='list-inline-item imgDetail'>
                                                                    <p>FANADISE</p>
                                                                    <p>FAN</p>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className='common-color'>Fanadise.com</td>
                                                        <td>20-Dec-2021</td>
                                                        <td className=' truncate '>0x87B2E9E0565788...</td>
                                                        <td className='text-success'><strong>APPROVED</strong></td>
                                                        <td><Link to='/admindetail'><button className='btn-common buttonCustom m-0'>Details</button></Link></td>
                                                    </tr>
                                                    <tr>
                                                        <td scope="row">
                                                            <ul className='list-inline d-flex align-items-center'>
                                                                <li className='list-inline-item'>
                                                                    <img src="projectstarter/project-card/admin2.png" alt="img" className='img-fluid' />
                                                                </li>
                                                                <li className='list-inline-item imgDetail'>
                                                                    <p>FANADISE</p>
                                                                    <p>FAN</p>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className='common-color'>Fanadise.com</td>
                                                        <td>20-Dec-2021</td>
                                                        <td className=' truncate '>0x87B2E9E0565788...</td>
                                                        <td className='text-danger'><strong>Rejected</strong></td>
                                                        <td><Link to='/admindetail'><button className='btn-common buttonCustom m-0'>Details</button></Link></td>
                                                    </tr>
                                                    <tr>
                                                        <td scope="row">
                                                            <ul className='list-inline d-flex align-items-center'>
                                                                <li className='list-inline-item'>
                                                                    <img src="projectstarter/project-card/admin.png" alt="img" className='img-fluid' />
                                                                </li>
                                                                <li className='list-inline-item imgDetail'>
                                                                    <p>FANADISE</p>
                                                                    <p>FAN</p>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className='common-color'>Fanadise.com</td>
                                                        <td>20-Dec-2021</td>
                                                        <td className=' truncate '>0x87B2E9E0565788...</td>
                                                        <td className='text-warning'><strong>PENDING</strong></td>
                                                        <td><Link to='/admindetail'><button className='btn-common buttonCustom m-0'>Details</button></Link></td>
                                                    </tr>
                                                    <tr>
                                                        <td scope="row">
                                                            <ul className='list-inline d-flex align-items-center'>
                                                                <li className='list-inline-item'>
                                                                    <img src="projectstarter/project-card/admin2.png" alt="img" className='img-fluid' />
                                                                </li>
                                                                <li className='list-inline-item imgDetail'>
                                                                    <p>FANADISE</p>
                                                                    <p>FAN</p>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className='common-color'>Fanadise.com</td>
                                                        <td>20-Dec-2021</td>
                                                        <td className=' truncate '>0x87B2E9E0565788...</td>
                                                        <td><strong>APPROVED</strong></td>
                                                        <td><Link to='/admindetail'><button className='btn-common buttonCustom m-0'>Details</button></Link></td>
                                                    </tr>
                                                    <tr>
                                                        <td scope="row">
                                                            <ul className='list-inline d-flex align-items-center'>
                                                                <li className='list-inline-item'>
                                                                    <img src="projectstarter/project-card/admin.png" alt="img" className='img-fluid' />
                                                                </li>
                                                                <li className='list-inline-item imgDetail'>
                                                                    <p>FANADISE</p>
                                                                    <p>FAN</p>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className='common-color'>Fanadise.com</td>
                                                        <td>20-Dec-2021</td>
                                                        <td className=' truncate '>0x87B2E9E0565788...</td>
                                                        <td><strong>APPROVED</strong></td>
                                                        <td><Link to='/admindetail'><button className='btn-common buttonCustom m-0'>Details</button></Link></td>
                                                    </tr>
                                                    <tr>
                                                        <td scope="row">
                                                            <ul className='list-inline d-flex align-items-center'>
                                                                <li className='list-inline-item'>
                                                                    <img src="projectstarter/project-card/admin2.png" alt="img" className='img-fluid' />
                                                                </li>
                                                                <li className='list-inline-item imgDetail'>
                                                                    <p>FANADISE</p>
                                                                    <p>FAN</p>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className='common-color'>Fanadise.com</td>
                                                        <td>20-Dec-2021</td>
                                                        <td className=' truncate '>0x87B2E9E0565788...</td>
                                                        <td><strong>APPROVED</strong></td>
                                                        <td><Link to='/admindetail'><button className='btn-common buttonCustom m-0'>Details</button></Link></td>
                                                    </tr>
                                                    <tr>
                                                        <td scope="row">
                                                            <ul className='list-inline d-flex align-items-center'>
                                                                <li className='list-inline-item'>
                                                                    <img src="projectstarter/project-card/admin.png" alt="img" className='img-fluid' />
                                                                </li>
                                                                <li className='list-inline-item imgDetail'>
                                                                    <p>FANADISE</p>
                                                                    <p>FAN</p>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className='common-color'>Fanadise.com</td>
                                                        <td>20-Dec-2021</td>
                                                        <td className=' truncate '>0x87B2E9E0565788...</td>
                                                        <td><strong>APPROVED</strong></td>
                                                        <td><Link to='/admindetail'><button className='btn-common buttonCustom m-0'>Details</button></Link></td>
                                                    </tr>
                                                    <tr>
                                                        <td scope="row">
                                                            <ul className='list-inline d-flex align-items-center'>
                                                                <li className='list-inline-item'>
                                                                    <img src="projectstarter/project-card/admin2.png" alt="img" className='img-fluid' />
                                                                </li>
                                                                <li className='list-inline-item imgDetail'>
                                                                    <p>FANADISE</p>
                                                                    <p>FAN</p>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className='common-color'>Fanadise.com</td>
                                                        <td>20-Dec-2021</td>
                                                        <td className=' truncate '>0x87B2E9E0565788...</td>
                                                        <td><strong>APPROVED</strong></td>
                                                        <td><Link to='/admindetail'><button className='btn-common buttonCustom m-0'>Details</button></Link></td>
                                                    </tr>
                                                    <tr>
                                                        <td scope="row">
                                                            <ul className='list-inline d-flex align-items-center'>
                                                                <li className='list-inline-item'>
                                                                    <img src="projectstarter/project-card/admin.png" alt="img" className='img-fluid' />
                                                                </li>
                                                                <li className='list-inline-item imgDetail'>
                                                                    <p>FANADISE</p>
                                                                    <p>FAN</p>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className='common-color'>Fanadise.com</td>
                                                        <td>20-Dec-2021</td>
                                                        <td className=' truncate '>0x87B2E9E0565788...</td>
                                                        <td><strong>APPROVED</strong></td>
                                                        <td><Link to='/admindetail'><button className='btn-common buttonCustom m-0'>Details</button></Link></td>
                                                    </tr>
                                                    <tr>
                                                        <td scope="row">
                                                            <ul className='list-inline d-flex align-items-center'>
                                                                <li className='list-inline-item'>
                                                                    <img src="projectstarter/project-card/admin2.png" alt="img" className='img-fluid' />
                                                                </li>
                                                                <li className='list-inline-item imgDetail'>
                                                                    <p>FANADISE</p>
                                                                    <p>FAN</p>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td className='common-color'>Fanadise.com</td>
                                                        <td>20-Dec-2021</td>
                                                        <td className=' truncate '>0x87B2E9E0565788...</td>
                                                        <td><strong>APPROVED</strong></td>
                                                        <td><Link to='/admindetail'><button className='btn-common buttonCustom m-0'>Details</button></Link></td>
                                                    </tr> */}
                                                        </tbody>
                                                    </table>

                                                </div> <div className='text-center ptb20'>
                                                    {allprojectss.length > itemlength ?
                                                        <button className='btn-common-outline' onClick={LoadMoreItems}>Load More</button>
                                                        :
                                                        <button className='btn-common-outline'>No More Items</button>
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                <FooterSecondary /></div>
        </>
    )
}

export default Admin
