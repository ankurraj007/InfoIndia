

import Map, { Source, Layer, Popup, } from 'react-map-gl';
import { useState, Fragment, useMemo } from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { dataLayer1, dataLayer2, dataLayer3, dataLayer4 } from './MapStyles';
import classes from './MainMap.module.css'
import AttributeSelector from './AttributeSelector.js';
import Scale from '../components/MapScale'
import { updatePercentiles } from '../utils.ts';
import { Alert, Popper, Snackbar, Slide } from '@mui/material';

const MAP_TOKEN = 'pk.eyJ1IjoiYW5rdXJyYWpzYWh1IiwiYSI6ImNtZG9maTU4bDAxYzEyanM5eml1anJua3UifQ.KdgmhbWSdzHE4xJOGytmQQ'
let style = dataLayer2

let open = true

function MainMap() {

  const [district, setDistrict] = useState(null);
  const [popup, setPopup] = useState(false);
  const [attribute, setAttribute] = useState({ prop: 'lit', year: 2011 })
  const [allData, setAllData] = useState(useLoaderData())

  if (!allData) {
    setAllData(require('../Data/Map_fin.json'))
  }

  const [data, scale] = useMemo(() => {

    let new_prop = attribute.prop + '_' + attribute.year
    let curr_prop = attribute.prop + '_2011'
    let old_prop = attribute.prop + '_1961'

    return allData && updatePercentiles(allData, attribute.prop, f => {
      if (f.properties[new_prop] === '-') {
        return;
      }
      return Number(f.properties[new_prop])
    }
      , (f) => {
        if (f.properties[curr_prop] === '-') {
          return;
        }
        return [Number(f.properties[curr_prop]), Number(f.properties[old_prop])]
      })

  }, [allData, attribute]);


  function onChange(event) {
    const { features,
      lngLat: { lng, lat } } = event;

    if (features[0]) {
      const hoveredFeatures = features[0].properties
      setDistrict({ features: hoveredFeatures, lng, lat })
      setPopup(true)
    }
    else {
      setPopup(false)
      setDistrict(null)
    }
  }

  const navigate = useNavigate()

  function clickHandler(event) {
    const { features } = event;
    if (features[0]) {
      navigate(features[0].properties.st_nm.replace(/\s/g, ""), { state: features[0] })
    }
  }

  function attributeChangeHandler(event) {
    if (event.target.value === 'pop') {
      style = dataLayer1
    } else if (event.target.value === 'den') {
      style = dataLayer4
    } else if (event.target.value === 'sratio') {
      style = dataLayer3
    }
    else {
      style = dataLayer2
    }
    setAttribute({ prop: event.target.value, year: attribute.year })
  }

  const bounds = [[55, -3], [116, 45]]

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  function loadingdone() {

    setTimeout(() => {

      open = false
    }, 2000)
  }

  return (
    <Fragment>

      <div className={classes.mapContainer}>
        <div className={classes.map}>
          <Scale range={scale} attribute={attribute.prop} />
          <Map
            initialViewState={{
              longitude: 80.3,
              latitude: 23.2,
              zoom: 4,
              maxPitch: 1,
              dragRotate: false,
              maxZoom: 6.5,
              minZoom: 3.5

            }}

            onLoad={loadingdone}
            maxBounds={bounds}
            onMouseMove={onChange}
            onClick={clickHandler}

            mapboxAccessToken={MAP_TOKEN}
            interactiveLayerIds={['MapData']}
          >

            {popup && <Popup longitude={district.lng} latitude={district.lat} className={classes.Popup}
              anchor="top-left" closeButton={false} closeOnClick={false}>


              <div className={classes.state}><h3>{district.features.st_nm}</h3></div>
              <div><p className={classes.Attribute}>{district.features[attribute.prop + '_' + attribute.year]}</p></div>

            </Popup>
            }

            <Source type="geojson" data={data}>
              <Layer {...style} />
            </Source>
          </Map>
        </div>
      </div>

      <div className={classes.warn}>
        <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
          <Alert severity="info">The Box Below Is Movable, Try Grabbing it Around!</Alert>
        </Snackbar>
      </div>
      <AttributeSelector onSelect={setAttribute} attribute={attribute} ach={attributeChangeHandler} />
    </Fragment>
  )
}

export function loader() {
  return require('../Data/Map_fin.json')
}

export default MainMap;

