import styles from "./CountryList.module.css";

import Spinner from "../../../components/ui/Spinner";
import Message from "../../../components/ui/Message";
import CountryItem from "./CountryItem";
import { useCities } from "../context/useCities";

const CountryList = () => {
  const { cities, isLoading, error } = useCities();

  if (isLoading) return <Spinner />;
  if (error) return <Message message={error} />;
  if (!cities.length)
    return (
      <Message message="Add Your First City By Clicking On A City On The Map" />
    );

  // filtering the redundant countries
  const countries = cities.reduce((array, city) => {
    if (!array.map((element) => element.country).includes(city.country))
      return [...array, { country: city.country, emoji: city.emoji }];
    else return array;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
};
export default CountryList;
