import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "../../../components/ui/Spinner";
import Message from "../../../components/ui/Message";
import { useCities } from "../context/useCities";

const CityList = () => {
  const { cities, isLoading, error } = useCities();

  // check loading/error first so the empty-state message doesn't flash while fetching
  if (isLoading) return <Spinner />;
  if (error) return <Message message={error} />;
  if (!cities.length)
    return (
      <Message message="Add Your First City By Clicking On A City On The Map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
};
export default CityList;
