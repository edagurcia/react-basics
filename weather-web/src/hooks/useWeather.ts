import { useMemo, useState } from "react";
import axios from "axios";
import { z } from "zod";
import type { SearchType } from "../types";

const initialState = {
  name: "",
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0,
  },
};

const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
});

export type Weather = z.infer<typeof Weather>;

export const useWeather = () => {
  const api_key = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<Weather>(initialState);
  const [notFound, setNotFound] = useState(false);

  const fetchWeather = async ({ city, country }: SearchType) => {
    setLoading(true);
    setNotFound(false);
    setWeather(initialState);

    try {
      const { data: first } = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=${5}&appid=${api_key}`
      );

      if (!first[0]) {
        setNotFound(true);
        return;
      }

      const lat = first[0].lat;
      const lon = first[0].lon;

      const { data: second } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
      );

      const res = Weather.safeParse(second);

      if (res.success) {
        setWeather(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const hasWeatherData = useMemo(() => weather.name, [weather]);

  return {
    loading,
    notFound,
    weather,
    hasWeatherData,
    fetchWeather,
  };
};
