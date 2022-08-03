import * as React from 'react';

const Writing = () => {
    return(
        <div className="container vh-100">
            <div className="row mt-5">
                <div className="col-12">
                    <form className="form-control">
                        <div className='row mt-5'>
                            <textarea 
                            className="form-control shadow-lg" 
                            name="" 
                            id="writing-input" 
                            rows={10} 
                            placeholder="In a hole in the ground, there lived a hobbit..."
                            >
                            </textarea>
                        </div>
                        <div className='row justify-content-end my-2 me-3'>
                            <button className='btn btn-dark col-1'>Publish</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Writing;