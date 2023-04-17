import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ENDPOINT = 'http://localhost:3001';

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessageList, setErrorMessageList] = useState([]);

  const handleLogin = async (event) => {
    event.preventDefault();
    const dto = { email, password };

    try {
      const { data } = await axios.post(`${ENDPOINT}/auth/signup`, dto);
      localStorage.setItem('token', data);
      setErrorMessageList([]);
      navigate(`/user/${data.id}`);
      console.log(data);
    } catch (error) {
      const { data } = error.response;
      const { message } = data;

      if (typeof message === 'object') {
        setErrorMessageList([...data.message]);
      } else {
        setErrorMessageList([data.message]);
      }

      console.error(data);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Entrar</button>
      </form>

      {errorMessageList.length > 0 && (
        <div>
          {errorMessageList.map((message) => (
            <p key={message}>{message}</p>
          ))}
        </div>
      )}

      <div>
        <a href="#">Esqueci minha senha</a>
      </div>
    </div>
  );
}
