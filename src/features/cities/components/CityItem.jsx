import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../context/useCities";
import Flag from "../../../components/ui/Flag";
import { formatDate } from "../../../utils/formatDate";

const CityItem = ({ city }) => {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;
  const { lat, lng } = position;

  const handleDeleteCity = (e) => {
    // avoid click on the link and do not choose the city by mistaking
    e.preventDefault();
    deleteCity(id);
  };
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${id === currentCity.id ? styles["cityItem--active"] : ""}`}
        to={`${id}?lat=${lat}&lng=${lng}`}>
        <span className={styles.emoji}>
          <Flag emoji={emoji} />
        </span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>( {formatDate(date)} )</time>
        <button
          className={styles.deleteBtn}
          onClick={handleDeleteCity}
          aria-label={`Delete ${cityName}`}>
          &times;
        </button>
      </Link>
    </li>
  );
};
export default CityItem;
