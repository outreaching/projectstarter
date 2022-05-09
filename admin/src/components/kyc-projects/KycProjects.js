import React, { useState, useEffect } from 'react';
import Navbar from '../landing/header/Navbar'
import { Link } from 'react-router-dom'
import './kyc.scss'
import { toast } from 'react-toastify';
import { Backdrop } from '@material-ui/core';
import FooterSecondary from '../footerSecondary/FooterSecondary'
import { useSelector } from 'react-redux'
import { ApiUri } from '../../utils/apiUrl';
import axios from 'axios';
function KycProjects() {
    const dark = useSelector(state => state.UserReducer.theme);
    const [searchTerm, setsearchTerm] = useState('');
    const [itemlength, setitemlength] = useState(10);
    const [opens, setOpens] = useState(false);
    const [allKYC, setallKYC] = useState([]);
    const LoadMoreItems = () => {
        const a = parseInt(itemlength) + 5
        setitemlength(a)
    };

    const allkycrojects = () => {
        setOpens(true)
        axios.post(`${ApiUri}/v1/Kyc/getAllKyc`)
            .then((response) => {
                setOpens(false)
                setallKYC(response.data.data)
                console.log("All KYC we have", response)
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
        allkycrojects()
    }, [])
    const handleSearch = (e) => {
        // search(e.target.value);
        const hgf = e.target.value;
        setsearchTerm(hgf)
    }
    console.log("search", searchTerm)
    const allkycproject = allKYC?.filter((elem, index) => {
        console.log("scbabhasbsabhasvhhsabcsahc")
        if (searchTerm === null) {
            console.log("scbabhasbsabhasvhhsabcsahc 222222")
            return elem
        }
        else if (elem?.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            // const startpresaledate = elem?.preSaleStartDateAndTime.split('T')[0];

            return (
                <tr index={index}>
                    <td scope="row"><p className='pOnDark'><strong>{elem?.name}</strong> </p></td>
                    <td className='common-color'>{elem?.email}</td>
                    <td>20-Dec-2021</td>
                    <td className=' truncate '>{elem?.contractAddressDeployed}</td>
                    <td className='text-warning'><strong>PENDING</strong></td>
                    <td><Link to={`/kycprojectsdetail/${elem?.walletAddress}`}><button className='btn-common buttonCustom m-0'>Details</button></Link></td>
                </tr>
                // <tr index={index}>
                //     <td scope="row">
                //         <ul className='list-inline d-flex align-items-center'>
                //             <li className='list-inline-item'>
                //                 <img src={elem?.logoURL} alt="img" className=' roundImg' />
                //             </li>
                //             <li className='list-inline-item imgDetail'>
                //                 <p>{elem?.projectName}</p>
                //                 <p>{elem?.symbol}</p>
                //             </li>
                //         </ul>
                //     </td>
                //     <td>{elem?.websiteLink}</td>
                //     <td>{elem?.preSaleStartDateAndTime?.split('T')[0]}</td>
                //     <td className=' truncate '>{elem?.contractAddress}</td>
                //     <td>
                //     </td>
                //     <td>
                //         <Link to={`/admindetail/${elem?._id}`} >
                //             <button className='btn-common buttonCustom m-0'>Details</button></Link></td>
                // </tr>
                //      <tr>
                //      <td scope="row"><p className='pOnDark'><strong>FANADISE</strong> </p></td>
                //      <td className='common-color'>john.doe@gmail.com</td>
                //      <td>20-Dec-2021</td>
                //      <td className=' truncate '>0x87B2E9E0565788...</td>
                //      <td className='text-warning'><strong>PENDING</strong></td>
                //      <td><Link to='/kycprojectsdetail'><button className='btn-common buttonCustom m-0'>Details</button></Link></td>
                //  </tr>
            )
        }
    })
        .slice(0, itemlength).map((elem, index) => {
            // const startpresaledate = elem?.preSaleStartDateAndTime?.split('T')[0];
            return (
                <tr index={index}>
                    <td scope="row"><p className='pOnDark'><strong>{elem?.name}</strong> </p></td>
                    <td className='common-color'>{elem?.email}</td>
                    <td>20-Dec-2021</td>
                    <td className=' truncate '>
                        <h6 className="asjbajsabsj">{elem?.contractAddressDeployed}</h6>
                    </td>
                    <td className='text-warning'><strong>{elem?.statusOfApplication}</strong></td>
                    <td><Link to={`/kycprojectsdetail/${elem?.walletAddress}`}><button className='btn-common buttonCustom m-0'>Details</button></Link></td>
                </tr>
            )
        })
    return (
        <>
            <Backdrop className="loader" sx={{ color: '#fff' }} open={opens}>
                <img src="/projectstarter/header/loader.svg" alt="" className="img-fluid shdshhgdss" />
            </Backdrop>
            <div className={dark}>
                <section className='kycProjects'>
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
                                                                <th scope="col">Email address</th>
                                                                <th scope="col">Request Date</th>
                                                                <th scope="col">Wallet Address</th>
                                                                <th scope="col">Status</th>
                                                                <th scope="col">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {allkycproject}
                                                            {/* <tr>
                                                        <td scope="row"><p className='pOnDark'><strong>FANADISE</strong> </p></td>
                                                        <td className='common-color'>john.doe@gmail.com</td>
                                                        <td>20-Dec-2021</td>
                                                        <td className=' truncate '>0x87B2E9E0565788...</td>
                                                        <td className='text-warning'><strong>PENDING</strong></td>
                                                        <td><Link to='/kycprojectsdetail'><button className='btn-common buttonCustom m-0'>Details</button></Link></td>
                                                    </tr> */}
                                                            {/* <tr>
                                                        <td scope="row"><p className='pOnDark'><strong>Helen S. Clark</strong> </p> </td>
                                                        <td className='common-color'>john.doe@gmail.com</td>
                                                        <td>20-Dec-2021</td>
                                                        <td className=' truncate '>0x87B2E9E0565788...</td>
                                                        <td className='text-success'><strong>APPROVED</strong></td>
                                                        <td><Link to='/kycprojectsdetail'><button className='btn-common buttonCustom m-0'>Details</button></Link></td>
                                                    </tr>
                                                    <tr>
                                                        <td scope="row"><p className='pOnDark'><strong>Allen Lewis</strong> </p> </td>
                                                        <td className='common-color'>john.doe@gmail.com</td>
                                                        <td>20-Dec-2021</td>
                                                        <td className=' truncate '>0x87B2E9E0565788...</td>
                                                        <td className='text-danger'><strong>REJECTED</strong></td>
                                                        <td><Link to='/kycprojectsdetail'><button className='btn-common buttonCustom m-0'>Details</button></Link></td>
                                                    </tr>
                                                    <tr>
                                                        <td scope="row"><p className='pOnDark'><strong>Jeannie Jones</strong> </p> </td>
                                                        <td className='common-color'>john.doe@gmail.com</td>
                                                        <td>20-Dec-2021</td>
                                                        <td className=''>0x87B2E9E0565788...</td>
                                                        <td className='text-danger'><strong>REJECTED</strong></td>
                                                        <td><Link to='/kycprojectsdetail'><button className='btn-common buttonCustom m-0'>Details</button></Link></td>
                                                    </tr>
                                                    <tr>
                                                        <td scope="row"><p className='pOnDark'><strong>FANADISE</strong> </p> </td>
                                                        <td className='common-color'>john.doe@gmail.com</td>
                                                        <td>20-Dec-2021</td>
                                                        <td className=' truncate '>0x87B2E9E0565788...</td>
                                                        <td><strong>APPROVED</strong></td>
                                                        <td><Link to='/kycprojectsdetail'><button className='btn-common buttonCustom m-0'>Details</button></Link></td>
                                                    </tr> */}
                                                            {/* <tr>
                                                        <td scope="row"><p className='pOnDark'><strong>Larry Caldwell</strong> </p> </td>
                                                        <td className='common-color'>john.doe@gmail.com</td>
                                                        <td>20-Dec-2021</td>
                                                        <td className=' truncate '>0x87B2E9E0565788...</td>
                                                        <td><strong>APPROVED</strong></td>
                                                        <td><Link to='/kycprojectsdetail'><button className='btn-common buttonCustom m-0'>Details</button></Link></td>
                                                    </tr>
                                                    <tr>
                                                        <td scope="row"><p className='pOnDark'><strong>FANADISE</strong> </p> </td>
                                                        <td className='common-color'>john.doe@gmail.com</td>
                                                        <td>20-Dec-2021</td>
                                                        <td className=' truncate '>0x87B2E9E0565788...</td>
                                                        <td><strong>APPROVED</strong></td>
                                                        <td><Link to='/kycprojectsdetail'><button className='btn-common buttonCustom m-0'>Details</button></Link></td>
                                                    </tr>
                                                    <tr>
                                                        <td scope="row"><p className='pOnDark'><strong>Tara Reed</strong> </p> </td>
                                                        <td className='common-color'>john.doe@gmail.com</td>
                                                        <td>20-Dec-2021</td>
                                                        <td className=' truncate '>0x87B2E9E0565788...</td>
                                                        <td><strong>APPROVED</strong></td>
                                                        <td><Link to='/kycprojectsdetail'><button className='btn-common buttonCustom m-0'>Details</button></Link></td>
                                                    </tr>
                                                    <tr>
                                                        <td scope="row"><p className='pOnDark'><strong>FANADISE</strong> </p> </td>
                                                        <td className='common-color'>john.doe@gmail.com</td>
                                                        <td>20-Dec-2021</td>
                                                        <td className=' truncate '>0x87B2E9E0565788...</td>
                                                        <td><strong>APPROVED</strong></td>
                                                        <td><Link to='/kycprojectsdetail'><button className='btn-common buttonCustom m-0'>Details</button></Link></td>
                                                    </tr>
                                                    <tr>
                                                        <td scope="row"><p className='pOnDark'><strong>FANADISE</strong> </p> </td>
                                                        <td className='common-color'>john.doe@gmail.com</td>
                                                        <td>20-Dec-2021</td>
                                                        <td className='truncate '>0x87B2E9E0565788...</td>
                                                        <td><strong>APPROVED</strong></td>
                                                        <td><Link to='/kycprojectsdetail'><button className='btn-common buttonCustom '>Details</button></Link></td>
                                                    </tr> */}
                                                        </tbody>
                                                    </table>

                                                </div> <div className='text-center ptb20'>
                                                    {allKYC.length > itemlength ?
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

export default KycProjects
