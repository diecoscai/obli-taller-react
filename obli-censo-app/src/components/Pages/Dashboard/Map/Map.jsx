import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Map = ({ department }) => {
    console.log('department', department);
    const departmentsWihUsers = department.map((depto, index) => ({
        ...depto
    }));
    console.log(departmentsWihUsers)
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <MapContainer
                        center={[-32.81461649853357, -55.927466908701255]}
                        zoom={7}
                        scrollWheelZoom={false}
                        style={{ width: '100%', height: '100vh' }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
                            url="https://%7Bs%7D.tile.openstreetmap.org/%7Bz%7D/%7Bx%7D/%7By%7D.png"
                        />
                        {departmentsWihUsers.map(
                            ({ id, latitud, longitud, nombre, userCount }) => (
                                <Marker key={id} position={[latitud, longitud]}>
                                    <Popup>
                                        Total censados en {nombre}: {userCount}
                                    </Popup>
                                </Marker>
                            )
                        )}
                    </MapContainer>
                </div>
            </div>
        </>
    );
};
export default Map;
