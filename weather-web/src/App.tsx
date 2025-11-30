import { useWeather } from "./hooks/useWeather";
import { Form } from "./components/form/Form";
import { WeatherDetail } from "./components/weatherDetail/WeatherDetail";
import { Alert } from "./components/alert/Alert";
import styles from "./styles/App.module.css";

function App() {
  const { loading, notFound, weather, hasWeatherData, fetchWeather } =
    useWeather();

  return (
    <>
      <h1 className={styles.title}>App de clima</h1>

      <div className={styles.container}>
        <Form fetchWeather={fetchWeather} />
        {hasWeatherData && (
          <WeatherDetail loading={loading} weather={weather} />
        )}

        {notFound && (
          <div className={styles.containerAlert}>
            <Alert>
              <p>Ciudad no encontrada</p>
            </Alert>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
