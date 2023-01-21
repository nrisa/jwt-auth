import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.svg';

const Home = (props) => {
    const nav = useNavigate()
    const [token, setToken] = useState('');
    const [name, setName] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
 
    useEffect(() => {
        refreshToken();
        getUsers();
        console.log(users);
    }, []);

    const refreshToken = async () => {
      try {
          const response = await axios.get('http://localhost:4000/token', { withCredentials: true });
          setToken(response.data.accessToken);
          const decoded = jwt_decode(response.data.accessToken);
          setName(decoded.name);
          setExpire(decoded.exp);
      } catch (error) {
          if (error.response) {
              nav("/login");
          }
      }
    }

    const axiosJWT = axios.create();
 
    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:4000/token', { withCredentials: true });
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const getUsers = async () => {
      const response = await axiosJWT.get('http://localhost:4000/users', {
          headers: {
              Authorization: `Bearer ${token}`
          }
      }, { withCredentials: true });
      setUsers(response.data);
    }

    const Logout = () => {
        axios.delete('http://localhost:4000/logout', {withCredentials:true})
        .then(() => {
            alert('Ok Keluar!')
            nav('/login')})
    }
    
    return (
        <>        
        <h1 style={{display:'flex', AlignItems:"center"}}><img src={logo} className="App-logo" alt="logo" />Hai {name}.</h1>
        <button onClick={Logout}>Logout</button>
        </>
    )
}

export default Home