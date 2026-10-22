// import {
//   useNavigate,
//   //  useNavigate
//   useSearchParams,
// } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../context/useCities";
import { useGeolocation } from "../../../hooks/useGeolocation";
import Button from "../../../components/ui/Button";
import Flag from "../../../components/ui/Flag";
import { useUrlPosition } from "../../../hooks/useUrlPosition";
import { useNavigate } from "react-router-dom";

const Map = () => {
  const { cities } = useCities();
  // useUrlPosition returns a tuple [lat, lng]
  const [mapLat, mapLng] = useUrlPosition();
  // programmatic Navigation => move to new url without the use having to click on any link => the common case after submitting a form | u can navigate back that is something that we can do not do with just link
  // u must name the variable with navigate it is rule
  // const navigate = useNavigate();

  // state for remember the coordinates for better UX
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();
  // sync the url with the UI => sync two systems
  //  useEffect is mostly a synchronization mechanism.
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng],
  );
  // sync mapPosition with geoLocation
  // note that you should avoid having many effects each effect will render the component
  useEffect(
    function () {
      if (geoLocationPosition)
        setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    },
    [geoLocationPosition],
  );

  return (
    <div
      className={styles.mapContainer}
      // onClick={() =>
      //   // imperative way we can not use the link in this situation
      //   navigate("form")
      // }
    >
      {!geoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use Your Position"}
        </Button>
      )}
      {/* <h1>Map</h1>
      <h2>
        Position: {lat},{lng}
      </h2>
      <button
        onClick={() =>
          // the state has updated everywhere
          setSearchParams({
            // pass object with entire new query string
            lat: 40,
            lng: 60,
          })
        }>
        Chang Position
      </button> */}

      <MapContainer
        // center={[mapLat, mapLng]}
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}>
            <Popup>
              <span>
                <Flag emoji={city.emoji} />
              </span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClickOnMap />
      </MapContainer>
    </div>
  );
};

// any functionality in this library we need it in component shape
//  this component is own component not in leaflet
function ChangeCenter({ position }) {
  // that hook leaflet gives us
  const map = useMap(); // get the current instance of the map that is currently being displayed
  // if (position[0] && position[1]) {
  map.setView(position);
  // }
  // it is component so we need to return some jsx ==> we can return null it is valid in jsx rules
  return null;
}
// this function will help us when we click on the map and open the form
function DetectClickOnMap() {
  const navigate = useNavigate();
  useMapEvents({
    // properties accepts callback function
    click: (e) => {
      // console.log(e);
      // wrap() normalizes lng to [-180, 180] when clicking a repeated copy of the world
      const { lat, lng } = e.latlng.wrap();
      navigate(`form?lat=${lat}&lng=${lng}`);
    },
  }); // on leaflet => pass the object and define some properties for different types of events
}
export default Map;
