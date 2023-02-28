import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Hi = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://api.zoom.us/v2/users/me', {
          headers: {
            'Authorization': `Bearer ${process.env.CLIENT_SECRET}`
          }
        });
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    if (process.env.CLIENT_SECRET) {
      getUserData();
    }
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          <h2>{`${userData.first_name} ${userData.last_name}`}</h2>
          <p>{userData.role_name}</p>
          <p>{userData.company}</p>
        </>
      )}
    </div>
  );
};

export default Hi;
