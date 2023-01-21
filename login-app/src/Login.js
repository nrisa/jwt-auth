import logo from './logo.svg';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = (props) => {
    const nav = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let masuk = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/login', {
                email, password 
            }, { withCredentials: true })
          .then(() => {
                nav('/')
            })
    }

    return (
        <>        
        <h1 style={{display:'flex', AlignItems:"center"}}><img src={logo} className="App-logo" alt="logo" />Login.</h1>
        <form onSubmit={masuk}>
          <input type="text" onInput={(e) => setEmail(e.target.value)} placeholder='Masukan username' /> 
          <input type="password" onInput={(e) => setPassword(e.target.value)} placeholder='Masukan password' /> 
          <button>Login</button>
        </form>
        </>
    )
}

export default Login