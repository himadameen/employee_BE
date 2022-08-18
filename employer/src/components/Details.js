import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import '../App.css';

const Details = (props) => {

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    const [details, setDetails] = useState([]);
    const [search, setSearch] = useState('');
    const itemsPerPage = 10;
    const navigate = useNavigate();

    const callapi = async () => {
        const url = "https://intense-dusk-99657.herokuapp.com/";
        const response = await axios.get(url);
        setDetails(response.data);
    }

    useEffect(() => {
        callapi();
    }, [])

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(details.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(details.length / itemsPerPage));
    }, [details, itemOffset, itemsPerPage]);


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % details.length;
        setItemOffset(newOffset);
    };

    const handleUpdate = (username) => {
        // window.alert(username);
        navigate('/update/' + username);
        // props.history('/update/' + id);
        // console.log(id);
        // navigate("/update");
    }



    const handleDelete = async (username) => {
        console.log(username);
        const url = `https://intense-dusk-99657.herokuapp.com/${username}`;
        const response = await axios.delete(url);
        if (response.status === 200) {
            callapi();
        }
    }


    return (
        <>
            <div className='detail'>
                <div id='head'>
                    <h2>Employer Details</h2>

                    <input type="text" placeholder='Select by email or username' onChange={handleChange} />


                </div>

                {currentItems.length > 0 ? (
                    <>
                        <table class="table table-dark table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    {/* <th scope="col">Profile Pic</th> */}
                                    <th scope="col">UserName</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Contact Number</th>
                                    <th scope="col">Gender</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems && currentItems.filter(item => {
                                    const searchTerm = search.toLowerCase();
                                    const getDetail = item.username || item.email;
                                    return getDetail.startsWith(searchTerm);
                                })
                                    .map((item, index) => (
                                        <tr key={item.phone}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.username}</td>
                                            <td>{item.email}</td>
                                            <td>{item.status}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.gender}</td>
                                            {/* <td></td> */}
                                            <td id='icons'>
                                                <Link to='/add'><i class="fa fa-plus-circle" ></i></Link>
                                                {/* <button onclick={() => handleUpdate(item.username)}><i class="fa fa-pencil" ></i></button> */}
                                                <i class="fa fa-pencil" onClick={() => handleUpdate(item.username)}></i>
                                                <i class="fa fa-trash" onClick={() => handleDelete(item.username)}></i>
                                            </td>
                                        </tr>
                                    ))}

                            </tbody>
                        </table>
                        <div className='add'>
                            <div id='add'>
                                <Link to='/add'><i class="fa fa-plus-circle" >&nbsp; ADD</i></Link>
                            </div>


                            <ReactPaginate
                                breakLabel="..."
                                nextLabel="Next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                pageCount={pageCount}
                                previousLabel="< Previous"
                                renderOnZeroPageCount={null}
                                containerClassName="pagination"
                                pageLinkClassName='page-num'
                                previousLinkClassName='page-num'
                                activeLinkClassName='active'
                            />
                        </div>
                    </>
                ) : (
                    <div>Their no such Employee....</div>
                )
                }

            </div>

        </>
    )
}

export default Details