import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Alert } from "../alert/Alert";
import type { SearchType } from "../../types";
import { countries } from "../../data";
import styles from "./Form.module.css";

type FormProps = {
  fetchWeather: (data: SearchType) => Promise<void>;
};

export const Form = ({ fetchWeather }: FormProps) => {
  const [search, setSearch] = useState<SearchType>({
    city: "",
    country: "",
  });

  const [alert, setAlert] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(search).includes("")) {
      setAlert("Todos los campos son obligatorios");
      return;
    }

    const payload = {
      city: search.city,
      country: search.country,
      limit: 5,
    };

    fetchWeather(payload);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="city">Ciudad:</label>
          <input
            type="text"
            name="city"
            id="city"
            placeholder="Ej: Miami"
            value={search.city}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="country">País:</label>
          <select
            name="country"
            id="country"
            value={search.country}
            onChange={handleChange}
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {alert && <Alert>{alert}</Alert>}

        <input
          type="submit"
          value="Consultar clima"
          className={styles.submit}
        />
      </form>
    </div>
  );
};
