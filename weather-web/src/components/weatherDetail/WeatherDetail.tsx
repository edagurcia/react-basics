import type { Weather } from "../../hooks/useWeather";
import { formatTemp } from "../../helpers";
import { Spinner } from "../spinner/Spinner";
import styles from "./WeatherDetail.module.css";

type WeatherDetailProps = {
  loading: boolean;
  weather: Weather;
};

export const WeatherDetail = ({ loading, weather }: WeatherDetailProps) => {
  if (loading) return <Spinner />;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{weather.name}</h2>

      <p className={styles.current}>{formatTemp(weather.main.temp)} &deg;C</p>
      <div className={styles.temps}>
        <p>
          Min: <span>{formatTemp(weather.main.temp_min)} &deg;C</span>
        </p>
        <p>
          Max: <span>{formatTemp(weather.main.temp_max)} &deg;C</span>
        </p>
      </div>
    </div>
  );
};
