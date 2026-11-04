// import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import SideBar from '../../common/SideBar';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { apiUrl, token } from '../../common/http';
import { toast } from 'react-toastify';

const Create = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const res = await fetch(apiUrl + 'service/store',  {
            'method': 'POST',
            'headers': {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token()}`

            },
            body:JSON.stringify(data)
        });
        const result = await res.json();
        if(result.status == true){
            toast.success(result.message);
            navigate('/admin/services');
        }else{
            toast.error(result.message);
        }
        console.log(result);
    }

    return (
        <>
            <Header />
            <main >
                <div className='container my-5'>
                    <div className='row'>
                        <div className='col-md-3'>
                            {/* Sidebar */}
                            <SideBar />
                        </div>
                        <div className='col-md-9 '>
                            {/* Dashboard */}
                            <div className='card shadow border-0'>
                                <div className='card-body p-4'>
                                    <div className='d-flex justify-content-between'>
                                        <h4 className='h5'>Services / Create</h4>
                                        <Link to="/admin/services" className='btn btn-primary'>Back</Link>
                                    </div>
                                    <hr />

                                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                                        <div className='mb-3'>
                                            <label htmlFor="" className='form-label'>Name</label>
                                            <input
                                                {
                                                ...register('title', {
                                                    required: "The title field is required"
                                                })
                                                }
                                                type="text" className={`form-control ${errors.title ? "is-invalid" : ""}`} />
                                            {
                                                errors.title && <p className="invalid-feedback">{errors.title?.message}
                                                </p>
                                            }
                                        </div>

                                        <div className='mb-3'>
                                            <label htmlFor="" className='form-label'>Slug</label>
                                            <input
                                                {
                                                ...register('slug', {
                                                    required: "The slug field is required"
                                                })
                                                }
                                                type="text" className={`form-control ${errors.slug ? "is-invalid" : ""}`} />
                                            {
                                                errors.slug && <p className="invalid-feedback">{errors.slug?.message}
                                                </p>
                                            }
                                        </div>

                                        <div className='mb-3'>
                                            <label htmlFor="" className='form-label'>Short Description</label>
                                            <textarea
                                                {
                                                ...register('short desc')
                                                }
                                                className='form-control' rows={3}></textarea>
                                        </div>

                                        <div className='mb-3'>
                                            <label htmlFor="" className='form-label'>Content</label>
                                            <textarea
                                                {
                                                ...register('content')
                                                }
                                                className='form-control' rows={3}></textarea>
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor="" className='form-label'>Status</label>
                                            <select className='form-control'
                                                {
                                                ...register('status')
                                                }
                                            >
                                                <option value="1">Active</option>
                                                <option value="0">Block</option>
                                            </select>
                                        </div>
                                        <button className='btn btn-primary'>Submit</button>
                                    </form>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </>
    )
}

export default Create