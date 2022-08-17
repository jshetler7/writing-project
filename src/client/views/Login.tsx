import * as React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { apiService } from '../services/apiService';

interface LoginProps {}

const Login = (props: LoginProps) => {
	const nav = useNavigate();
	const location = useLocation();
	const [values, setValues] = useState<{ [key: string]: string }>({});
	const [error, setError] = useState<string>((location.state as string) || '');

	const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValues(pre => ({ ...pre, [e.target.name]: e.target.value }));
	};

	const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		apiService('/auth/login', 'POST', values)
		.then(login => {
			localStorage.setItem('token', login.token);
			nav('/');
		})
		.catch(e => setError(e.message));
	};

	return (
		<main className="container">
			<section className="row justify-content-center mt-5">
				<div className="col-md-6">
					<form className="px-3 py-4 border rounded shadow-lg bg-light">
						<label>Email</label>
						<input
							type="email"
							name="email"
							autoComplete="current-email"
							className="form-control"
							placeholder="percy@derolo.com"
							value={values.email || ''}
							onChange={handleChanges}
						/>
						<label>Password</label>
						<input
							type="password"
							name="password"
							autoComplete="current-password"
							className="form-control"
							placeholder="badnews"
							value={values.password || ''}
							onChange={handleChanges}
						/>
						<div className="mt-3 d-flex justify-content-end">
							<button className="btn btn-success text-light" onClick={handleLogin}>
								Login
							</button>
						</div>
					</form>
				</div>
				<div className="row justify-content-center">
					<div className="col-10 col-md-6 bg-light border rounded-3 shadow-lg">
						<p className='col-12 text-center'>Need an acount? Register here!</p>
						<div className="row justify-content-center">
							<Link to={'/register'} style={{textDecoration: 'none'}}className='btn btn-warning col-4 col-md-3 text-light'>Register</Link>
						</div>
					</div>
				</div>
			</section>
			<section className="row justify-content-center">
				<div className="col-md-6">
					{error && (
						<div className="alert alert-danger" role="alert">
							{error}
						</div>
					)}
				</div>
			</section>
		</main>
	);
};

export default Login;
