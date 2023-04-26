'use client';

import { Inter } from '@next/font/google';
import SearchBar from './components/SearchBar';

const inter = Inter({ subsets: ['latin'] });

import { useEffect, useState, useCallback } from 'react';

export default function Home() {
  const [location, setLocation] = useState('');
  const [lon, setLon] = useState(null);
  const [lat, setLat] = useState(null);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLocation(e.currentTarget.value);
  }

  async function getCoordinates() {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      const data = await response.json();
      console.log(data);

      if (data) {
        setLon(data[0].lon);
        setLat(data[0].lat);
        console.log(data[0].lon);
        console.log(data[0].lat);
        // setIsLoading(true);
      }
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  const getWeatherData = useCallback(() => {
    async function getWeather() {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      const weatherData = await response.json();
      console.log(weatherData);
      console.log(weatherData.clouds.all);
      console.log(weatherData.main.humidity);
      console.log(weatherData.main.temp);
      return weatherData;
    }
    getWeather();
  }, [lat, lon]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    getCoordinates();
  }

  useEffect(() => {
    getWeatherData();
  }, [getWeatherData]);

  return (
    <div className='w-full text-center py-8'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          required
          placeholder='Enter a location'
          onChange={onChange}
          className='text-slate-700 focus:outline-none rounded-md py-1 px-2'
        />
        <button
          className='ml-4 rounded-md py-2 px-4 bg-slate-700'
          type='submit'
        >
          Search
        </button>
      </form>
      <h1>{location}</h1>
      <p>{lon}</p>
      <p>{lat}</p>
    </div>
  );
}
