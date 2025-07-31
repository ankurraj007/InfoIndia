import { Slider } from "@mui/material";

import classes from "./AttributeSelector.module.css"
import { useEffect, useState, Fragment, memo, useRef } from "react";
import Draggable from "react-draggable";


function AttributeSelector(props) {

  const noderef = useRef(null)

  const [index, setIndex] = useState("Literacy Rate")

  function yearChangeHandler(event) {
    props.onSelect({ prop: props.attribute.prop, year: event.target.value })
  }

  useEffect(() => {
    if (props.attribute.prop === 'sratio') {
      setIndex('Sex Ratio (Females Per 1000 Males)')
    }
    else if (props.attribute.prop === 'lit') {
      setIndex('Literacy Rate')
    }
    else if (props.attribute.prop === 'den') {
      setIndex('Population Density (Population per Square Km)')
    }
    else {
      setIndex('Population')
    }
  }, [props.attribute.prop])


  let tp = classes.nonDrag
  return (
    <Fragment>
      <Draggable bounds={`parent`} nodeRef={noderef} handle={`.${classes.drag1}`}>
        <div className={classes.maincontainer} ref={noderef}>
          <div className={classes.drag1}>
            <h2>Select Index</h2>
            <div className={classes.info}>Indian Map showing {index} by state in the year {props.attribute.year}.
              Click on a state to see all Its details.</div>
          </div>

          <div className={tp}>
            <div className={classes.select}>
              <select
                name="attribute"
                onChange={props.ach}
                id='attri'
              >
                <option value="lit">Literacy Rate</option>
                <option value="pop">Population</option>
                <option value="den">Population Density</option>
                <option value="sratio">Sex Ratio</option>
              </select></div>
            <div className={classes.slider1}>
              <Slider min={1981} max={2025}
                defaultValue={2011} step={10}
                aria-label="Custom marks"
                valueLabelDisplay="auto"
                onChange={yearChangeHandler}
                marks
              />
            </div>
            <div className={classes.labels}>
              <p>1981</p>
              <p>1991</p>
              <p>2001</p>
              <p>2011</p>
              <p>2025</p>

            </div>
          </div>
        </div>

      </Draggable>

    </Fragment>
  );
}


export default memo(AttributeSelector);