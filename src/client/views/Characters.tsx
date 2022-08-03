import * as React from 'react';

const Characters = () => {
    return(
        <div className="container vh-100">
            <h1 className='text-center mt-5'>Characters</h1>
            <div className="row justify-content-around mt-5">
                    <div className="card shadow-lg col-12 col-md-3">
                        <div className="card-title text-center">
                            <h3>Character A</h3>
                            <div className="card-subtitle">
                                Scum
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="card-text text-center">
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae recusandae provident, ut repellendus beatae quis, error reprehenderit commodi dicta dolores eaque doloremque.</p>
                            </div>
                        </div>
                    </div>  

                    <div className="card shadow-lg col-12 col-md-3">
                        <div className="card-title text-center">
                            <h3>Character B</h3>
                            <div className="card-subtitle">
                                Scum
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="card-text text-center">
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae recusandae provident, ut repellendus beatae quis, error reprehenderit commodi dicta dolores eaque doloremque.</p>
                            </div>
                        </div>
                    </div>  

                    <div className="card shadow-lg col-12 col-md-3">
                        <div className="card-title text-center">
                            <h3>Character C</h3>
                            <div className="card-subtitle">
                                Scum
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="card-text text-center">
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae recusandae provident, ut repellendus beatae quis, error reprehenderit commodi dicta dolores eaque doloremque.</p>
                            </div>
                        </div>
                    </div>  
            </div>
        </div>
    )
}

export default Characters;