import React, { useState, useEffect } from 'react';
import { GoogleMap, OverlayView, OverlayViewF } from '@react-google-maps/api';
import './Map.css';

const containerStyle = {
  width: '100vw',
  height: '60vh',
  // overflow: 'visible !important'
};

const CustomMarker = ({ position, available_num, selectedPKLot, onClick = () => { console.log("function not passed") } }) => {
  const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height / 2),
  });
  let pos = { lat: position.latitude, lng: position.longitude };

  return (
    <OverlayViewF
      key={position.id}
      position={pos}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={getPixelPositionOffset}
    >
      <div className={`markerContainerOuter ${selectedPKLot === position.id ? 'selectedPKLotOuter' : ''}`} onClick={onClick} >
        <div className={`markerContainerInner ${selectedPKLot === position.id ? 'selectedPKLotInner' : ''}`} >
          {available_num}
        </div>
      </div>
    </OverlayViewF>
  );
};


const MapContainer = (props) => {
  // console.log('MapContainer props:', props);

  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const googleMapsScriptId = 'google-maps-script';
    let script;
    if (!window.google && !document.getElementById(googleMapsScriptId)) {
      script = document.createElement('script');
      script.id = googleMapsScriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${props.API_KEY}`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      script.onload = () => setScriptLoaded(true);
    } else {
      setScriptLoaded(true);
    }

    return () => {
      // Unmount cleanup
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, [props.API_KEY]);

  return (
    // <LoadScript googleMapsApiKey={props.API_KEY}>
    scriptLoaded && <GoogleMap
      onLoad={props.onGoogleApiLoaded}
      mapContainerStyle={containerStyle}
      center={props.center}
      zoom={14}
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
      {props.locations.map(({ latitude, longitude, name, current_capacity, parkinglot_id }, index) => (
        <CustomMarker
          key={name}
          id={name}
          position={{ latitude, longitude, key: name, id: parkinglot_id }}
          available_num={current_capacity}
          selectedPKLot={props.selectedPKLot}
          onClick={() => {
            props.onMarkerClick(parkinglot_id, latitude, longitude);
          }}
        />
      ))}
      {/* Child components, like markers, info windows, etc. */}
    </GoogleMap>
    // </LoadScript >
  )
}

export default React.memo(MapContainer);