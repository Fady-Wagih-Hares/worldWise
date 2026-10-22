import {
  useParams,
  //  useSearchParams
} from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../context/useCities";
import { useEffect } from "react";
import Spinner from "../../../components/ui/Spinner";
// import Button from "./Button";
import BackButton from "../../../components/ui/BackButton";
import Flag from "../../../components/ui/Flag";
import Message from "../../../components/ui/Message";
import { formatDate } from "../../../utils/formatDate";

function City() {
  // read the data from url by (usParam hook) => provided by react router | param called id because we called it id in app component

  const { id } = useParams();

  const { getCity, currentCity, isLoading, error } = useCities();

  useEffect(
    function () {
      getCity(id);
    },
    // If we add getCity here we get an infinite loop of Http request => the solution is we will add this function in useCallback hook
    [id, getCity],
  );
  // Return a loading indicator while fetching
  if (isLoading) return <Spinner />;

  if (error) return <Message message={error} />;

  // Fallback if currentCity isn't populated yet
  if (!currentCity || !currentCity.cityName) return null;
  // const [searchParams, setSearchParams] = useSearchParams();
  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");
  // TEMP DATA
  // const currentCity = {
  //   cityName: "Lisbon",
  //   emoji: "🇵🇹",
  //   date: "2027-10-31T15:59:59.138Z",
  //   notes: "My favorite city so far!",
  // };

  const { cityName, emoji, date, notes } = currentCity;

  // return (
  //   <div>
  //     <h1>City {id}</h1>;
  //     <h2>
  //       Position: {lat},{lng}
  //     </h2>
  //   </div>
  // );

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>
            <Flag emoji={emoji} />
          </span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date, { withWeekday: true })}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer">
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
