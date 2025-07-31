import {range} from 'd3-array';
import {scaleQuantile} from 'd3-scale';

import type GeoJSON from 'geojson';

export function updatePercentiles(
  featureCollection: GeoJSON.FeatureCollection<GeoJSON.Geometry>,
  type,scaler,
  accessor: (f: GeoJSON.Feature<GeoJSON.Geometry>) => number): [GeoJSON.FeatureCollection<GeoJSON.Geometry>, number[]] {
  const {features} = featureCollection;

 let scale = scaleQuantile().domain(features.flatMap(accessor)).range(range(12));
 if( type ==='pop'){
  scale = scaleQuantile().domain([4000,160000,200000000]).range(range(13))
 } 


  return [{
    type: 'FeatureCollection',
    features: features.map(f => {
      const value = scaler(f);
      const properties = {
        ...f.properties,
        value,
        percentile: scale(value)
      };
      return {...f, properties};
    })
  }, scale.domain()];
}