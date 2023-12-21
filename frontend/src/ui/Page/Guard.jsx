import './Guard.css';
import React, { useState, useEffect } from 'react';
import { Spinner } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import Header, { TOGGLER_TYPE } from '../Component/Header';
import SubHeader, { INFO_TYPE } from '../Component/SubHeader';
import LocationList, { LOCATION_LIST_MODE } from '../Component/LocationList';
import ProgressBar from '../Component/ProgressBar';

// Production API
import { API } from '../Api';

function Guard() {
  const navigate = useNavigate();

  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.parking_lots.get()
      .then((res) => {
        setLocations(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);


  const onPKLotClick = (location) => {
    const PKLotName = location.name
    const PKLotId = location.parkinglot_id
    navigate('/guard/monitor', { state: { PKLotName: PKLotName, PKLotId: PKLotId } })
  }

  const onAnalysisClick = () => {
    navigate('/guard/analysis', { state: { locations: locations } });
  }

  return (
    <>
      <Header togglerType={TOGGLER_TYPE.COLLAPSE_GUARD} />
      <SubHeader BACK_ICON={false} LEFT_STR="Dashboard" RHS_INFO={INFO_TYPE.ANALYSIS} onAnalysisClick={onAnalysisClick} />
      {
        loading ?
          (
            <div style={{
              height: "100vmin",
              width: "100vmin",
              justifyContent: "center",
              display: "flex",
            }}>
              <Spinner color='warning' style={{ height: "45vmin", width: "45vmin" }} />
            </div>
          )
          :
          (<> 
            <ProgressBar locations={locations} />
            <LocationList mode={LOCATION_LIST_MODE.FRACTION} 
                          locations={locations} 
                          setCurrentLocation={onPKLotClick} />
          </>)
      }
    </>
  );
}

export default Guard;