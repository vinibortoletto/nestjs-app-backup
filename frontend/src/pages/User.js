import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const ENDPOINT = 'http://localhost:3001';

export default function User() {
  const [file, setFile] = useState({});
  const { pathname } = useLocation();
  const userId = pathname.replace('/user/', '');

  const uploadFile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);

    try {
      const { data } = await axios.post(`${ENDPOINT}/file/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={uploadFile}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Enviar</button>
    </form>
  );
}
