import CircularProgress from '@mui/material/CircularProgress';

export const LoaderBar = ({ content = "Loading",...rest }) => (
        <CircularProgress className='position-absolute loader' />
)
