import classes from './TabContent.module.css'

import { Box } from '@mui/material';

function TabContent(props) {

    const { children, value, index } = props;  
    
    return (
      <div role="tabpanel" hidden={value !== index} className={classes.content}>
        {value === index && (
          <Box>
            {children}
          </Box>
        )}
      </div>
    );
}

export default TabContent;