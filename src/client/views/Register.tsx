import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';

const Register = () => {
	const nav = useNavigate();
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

	const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		apiService('/auth/register', 'POST', { name: name, username: username, email: email, password: password })
		.then(register => {
			localStorage.setItem('token', register.token);
			nav('/books');
		})
		.catch(err => console.log(err))
    };

	return (
		<main className="container">
			<section className="row justify-content-center">
                <h1 className='text-center text-light'>Register</h1>
				<div className="col-md-6 mt-5">
					<form className="bg-light px-3 py-4 border rounded shadow">
                    <label className='text-dark'>Name</label>
						<input
							type="text"
							name="name"
							autoComplete="current-name"
							className="form-control"
							value={name || ''}
							onChange={e => setName(e.target.value)}
						/>
                        <label className='text-dark'>Username</label>
						<input
							type="text"
							name="username"
							autoComplete="current-name"
							className="form-control"
							value={username || ''}
							onChange={e => setUsername(e.target.value)}
						/>
						<label className='text-dark'>Email</label>
						<input
							type="email"
							name="email"
							autoComplete="current-email"
							className="form-control"
							value={email || ''}
							onChange={e => setEmail(e.target.value)}
						/>
						<label className='text-dark'>Password</label>
						<input
							type="password"
							name="password"
							autoComplete="current-password"
							className="form-control"
							value={password || ''}
							onChange={e => setPassword(e.target.value)}
						/>
						<div className="mt-3 d-flex justify-content-end">
							<button className="btn btn-primary" onClick={handleRegister}>
								Register
							</button>
						</div>
					</form>
				</div>
			</section>
		</main>
	);
};

export default Register;