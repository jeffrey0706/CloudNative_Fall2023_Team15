import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends React.Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 25.0330, lng: 121.5654 }} // Example coordinates (Taipei)
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: '[API_KEY]'
})(MapContainer);
