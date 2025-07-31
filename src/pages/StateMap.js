import classes from './StateMap.module.css'

import { useState } from 'react'
import { useLoaderData, useLocation, useNavigate } from "react-router";
import Map, { Source, Layer } from 'react-map-gl';
import { center, bbox } from '@turf/turf'
import GraphTab from '../components/Graphtab';
import { Fab, Grid } from '@mui/material';

const MAP_TOKEN = 'pk.eyJ1IjoiYW5rdXJyYWpzYWh1IiwiYSI6ImNtZG9maTU4bDAxYzEyanM5eml1anJua3UifQ.KdgmhbWSdzHE4xJOGytmQQ'


const layerStyle = {
  id: 'StateMapData',
  type: 'fill',
  paint: {
    "fill-color": '#cc3900'
  }
};


function StateMap(prop) {

  const locate = useLocation()

  let d = useLoaderData();
  if (d === null) {
    d = locate.state
  }

  const navigate = useNavigate()

  const [stateData, setStateData] = useState(d);





  async function loading() {
    let tempd = require('../Data/Map_fin.json')
    // tempd = JSON.parse(tempd)
    const tempdata = tempd.features

    const state_name = window.location.pathname.slice(1)


    return await tempdata.find(obj => {
      return obj.properties.st_nm === state_name
    })
  }

  let c, bound = [1, 2]

  if (stateData !== null) {

    c = center(stateData)
    c = c.geometry.coordinates

    bound = bbox(stateData)
  }


  //   c = center(stateData)
  //   console.log(c)

  //  if(c && c.geometry){
  //  c = c.geometry.coordinates
  //  }
  //  bound = bbox(stateData)



  function fitBounds(event) {
    if (bound) {
      event.target.fitBounds(bound)
    }
    return;
  }

  function gotoMap() {
    navigate('/')
  }

  return (
    <div className={classes.container}>
      <div className={classes.backbtn}>
        <Fab color="white" aria-label="add" onClick={gotoMap}>
          <div className={classes.backarrow}>
            <img src='https://img.icons8.com/?size=2x&id=40217&format=png' width='32px'></img>
          </div>
        </Fab>
      </div>

      <div className={classes.innercontainer}>
        <Grid container spacing={0.5}>
          <Grid item lg={6} md={5} sm={12} xs={12}>
            <div className={classes.statemap}>
              <Map
                initialViewState={{
                  longitude: c[0],
                  latitude: c[1],
                  zoom: 6,
                  maxZoom: 7,
                  dragPan: false,
                  maxPitch: 1,
                  dragRotate: false,

                }}
                scrollZoom={false}
                style={{ cursor: 'default' }}
                paddingOptions={{ left: 30, right: 30, top: 30, bottom: 30 }}
                onLoad={fitBounds}
                mapboxAccessToken={MAP_TOKEN}
                interactiveLayerIds={['StateMapData']}
              >

                <Source type="geojson" data={stateData}>
                  <Layer {...layerStyle} />
                </Source>
              </Map>
              <div className={classes.label}>
                <div>{stateData.properties.st_nm}</div>
              </div>

            </div></Grid>

          <Grid item lg={6} md={5} sm={12}>
            <div className={classes.graphcontainer}>
              <GraphTab info={stateData.properties}></GraphTab>
            </div></Grid>
        </Grid>
      </div>

    </div>
  )
}

export function loader() {

  async function loading() {

    let tempd = require('../Data/Map_fin.json')
    const tempdata = tempd['features']
    const state_name = window.location.pathname.slice(1)
    if (state_name) {
      let req = null
      let top = tempdata.map((e) => {
        if ((e.properties.st_nm === state_name)) {
          req = e
        }
      })
      return req
    }
    else return null;
  }


  let kp = loading();
  return kp;
}

export default StateMap;