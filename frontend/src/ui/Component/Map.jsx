import React from 'react';
import { GoogleMap, LoadScript, OverlayView, OverlayViewF } from '@react-google-maps/api';
import './Map.css';

const containerStyle = {
  width: '100vw',
  height: '60vh',
  // overflow: 'visible !important'
};

const CustomMarker = ({ position, available_num, selectedPKLot, onClick = () => { } }) => {
  const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height / 2),
  });

  return (
    <OverlayViewF
      key={position.name}
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={getPixelPositionOffset}
    >
      <div className={`markerContainerOuter ${selectedPKLot === position.name ? 'selectedPKLotOuter' : ''}`} onClick={onClick} >
        <div className={`markerContainerInner ${selectedPKLot === position.name ? 'selectedPKLotInner' : ''}`} >
          {available_num}
        </div>
      </div>
    </OverlayViewF>
  );
};


const MapContainer = (props) => {
  // console.log('MapContainer props:', props);

  return (
    <LoadScript googleMapsApiKey={props.API_KEY}>
      <GoogleMap
        onLoad={props.onGoogleApiLoaded}
        mapContainerStyle={containerStyle}
        center={props.center}
        zoom={15}
        options={{
          styles: [
            {
              "featureType": "transit",
              "stylers": [
                { "visibility": "off" }
              ]
            },
            {
              "featureType": "landscape.man_made",
              "stylers": [
                { "visibility": "off" }
              ]
            },
            {
              "featureType": "water",
              "stylers": [
                { "visibility": "off" }
              ]
            },
            {
              "featureType": "poi",
              "stylers": [
                { "visibility": "off" }
              ]
            },
            {
              "featureType": "poi.business",
              "stylers": [
                { "visibility": "on" }
              ]
            },
            {
              "featureType": "road.highway",
              "stylers": [
                { "color": "#ffffff" }
              ]
            },
          ],
          disableDoubleClickZoom: true,
          clickableIcons: false,
          disableDefaultUI: true // This will disable the default UI including the search box
        }}
      >
        {props.fakeLocations_coordinate.map(({ lat, lng, name, maximum_capacity, current_capacity }, index) => (
          <CustomMarker
            key={name}
            id={name}
            position={{ lat, lng, key: name, name }}
            available_num={maximum_capacity - current_capacity}
            selectedPKLot={props.selectedPKLot}
            onClick={() => {
              props.onMarkerClick(name, lat, lng);
            }}
          />
        ))}
        {/* Child components, like markers, info windows, etc. */}
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MapContainer);