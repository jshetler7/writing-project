import * as React from 'react';

const Home = () => {
    return(
        <div className="container">
            <h1 className='text-center mt-5'>Calessia</h1>
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <div className="card bg-dark shadow-lg mt-5">
                            <div className="card-body">
                                <div className="card-text text-light text-center">
                                    <h5>Welcome to your new home for your literary endeavors!</h5>
                                    <h5 className='mt-3'>New Here? Check out the instructions below!</h5>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center mt-5">
                <button className='btn btn-light col-6 col-md-2'>Overview:</button>
                <h5 className='col-12 text-center text-light'>A comprehensive collection of your work</h5>
            </div>

            <div className="row justify-content-center mt-2">
                <button className='btn btn-light col-6 col-md-2'>Articles:</button>
                <h5 className='col-12 text-center text-light'>The home for your blog posts, articles, books, chapters, etc.</h5>
            </div>

            <div className="row justify-content-center mt-2">
                <button className='btn btn-light col-6 col-md-2'>Characters:</button>
                <h5 className='col-12 text-center text-light'>View a comprehensive collection of your work</h5>
            </div>

            <div className="row justify-content-center mt-2">
                <button className='btn btn-light col-6 col-md-2'>Maps:</button>
                <h5 className='col-12 text-center text-light'>View a comprehensive collection of your work</h5>
            </div>
        </div>
    )
}

export default Home;