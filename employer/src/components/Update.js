import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Update = (props) => {

    const initialValues = {
        username: "",
        email: "",
        phone: "",
        status: "",
        gender: "",
        profile: "",
    }


    const navigate = useNavigate();
    const [input, setInput] = useState(initialValues);

    const handleSubmit = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value })
    }


    // useEffect(() => {
    //     const username = props.match.username;
    //     const response = axios.get(`http:localhost:2000/${username}`);
    //     setInput(response.data);
    // }, [])

    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log(input);
        // const username = props.match.params.username;
        const url = "https://intense-dusk-99657.herokuapp.com/:username";
        const response = await axios.put(url, input);
        console.log(response.data);
        if (response.status === 200) {
            navigate('/');
        } else {
            window.alert("invalid details");
        }

    }


    return (
        <>
            <div className='fullcont'>
                <div className='container2' >
                    <h2>Update Employee Details</h2>
                    <div className='ui divider'></div>
                    <div className='ui form'>
                        <div className='field'>
                            <label>Username</label>
                            <input type='text' name='username' placeholder='enter your name' values={initialValues.username} onChange={handleSubmit} />
                        </div>

                        <div className='field'>
                            <label>Email</label>
                            <input type='email' name='email' placeholder='enter your email' values={initialValues.email} onChange={handleSubmit} />
                        </div>

                        <div className='field'>
                            <label>Phone</label>
                            <input type='number' name='phone' placeholder='enter your phone number' maxLength={11} values={initialValues.phone} onChange={handleSubmit} />
                        </div>

                        <div className='field' id="status">
                            <label>Status</label>
                            <input type="radio" name="status" value='active' values={initialValues.status} onChange={handleSubmit} />Active
                            <input type="radio" name="status" value='deactive' values={initialValues.status} onChange={handleSubmit} />DeActive
                        </div>

                        <div className='field'>
                            <label>Gender</label>
                            <select name="gender" values={initialValues.gender} onChange={handleSubmit}>
                                <option >Select the Gender</option>
                                <option value="male">Male</option>
                                <option value="female" >Female</option>
                                <option value="others" >Others</option>
                            </select>
                        </div>

                        <div className='field'>
                            <label>Profile Pic</label>
                            <input type="file" name="image" id="image" values={initialValues.profile} />
                        </div>

                        <button className='fluid ui button' id='btn' onClick={handleUpdate}>Update</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Update