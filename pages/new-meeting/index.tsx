import axios from 'axios';
import { useState } from 'react';

const CreateMeeting = () => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', {
        topic: title,
        type: 2,
        start_time: startTime,
        duration: duration,
      }, {
        headers: {
          'Authorization': `Bearer $CLIENT_SECRET`
        }
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Meeting Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Start Time (YYYY-MM-DDTHH:MM:SSZ)"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <input
        type="text"
        placeholder="Duration (minutes)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <button type="submit">Create Meeting</button>
    </form>
  );
};

export default CreateMeeting;