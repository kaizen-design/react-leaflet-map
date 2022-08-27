import './App.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import nationalParks from './national-parks.json';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

function MagicKingdom() {
  const map = useMap();
  const parksGeoJSON = new L.GeoJSON(nationalParks, {
    onEachFeature: (feature = {}, layer) => {
      const { properties = {} } = feature;
      const { Name } = properties;
      if (!Name) return;
      layer.bindPopup(`<p>${Name}</p>`)
    }
  });
  parksGeoJSON.addTo(map);
  console.log(parksGeoJSON)  
}

function App() {
  const location = [39.50, -98.35];
  const zoom = 4;  
  return (
    <div className="App">
      <MapContainer center={location} zoom={zoom} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />     
        <MagicKingdom />   
        <Marker position={location}>
          <Popup>
            This is a popup example.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default App;
