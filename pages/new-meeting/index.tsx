import React, { useState } from 'react';
import DatePicker from '@datepicker-react/styled';
import axios from 'axios';
declare module '@datepicker-react/styled' {
    export const DatePicker: any;
  }
  


const CreateMeeting = () => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [duration, setDuration] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', {
        topic: title,
        type: 2,
        start_time: startTime.toISOString(),
        duration: duration,
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.CLIENT_SECRET}`
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
      <DatePicker
        onChangeDate={(date: React.SetStateAction<Date>) => setStartTime(date)}
        selected={startTime}
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
