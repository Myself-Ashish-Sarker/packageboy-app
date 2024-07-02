import React, { useRef, useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const ShowMap = ({ booking }) => {
    const mapRef = useRef();

    // Custom marker icon to fix marker icon issue
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    useEffect(() => {
        const modal = document.getElementById('my_modal_2');
        modal.addEventListener('shown.bs.modal', () => {
            if (mapRef.current) {
                mapRef.current.invalidateSize();
            }
        });
    }, []);

    return (
        <div>
            <button className="btn" onClick={() => document.getElementById('my_modal_2').showModal()}>Show Map</button>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <div style={{ height: "400px", width: "100%" }}>
                        <MapContainer center={[booking.latitude, booking.longitude]} zoom={13} style={{ height: "100%", width: "100%" }} ref={mapRef}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={[booking.latitude, booking.longitude]}>
                                <Popup>
                                    {booking.location}
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default ShowMap;

