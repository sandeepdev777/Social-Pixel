import {Box} from '@mui/material';
import {styled} from '@mui/system';

// it is an self created css component which can be used styling throughout the application 
const FlexBetween=styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

export default FlexBetween;