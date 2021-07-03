import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import WarningSVG from '../assets/Path 18298.svg'

export default function PositionedSnackbar({open=false,handleClose,error}) {
  const [state, setState] = React.useState({
    vertical: 'bottom',
    horizontal: 'left',
  });

  const { vertical, horizontal } = state;

  return (
    <div>
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            key={vertical + horizontal}
        >
            <div 
                style={{
                    color: '#ffffff',
                    // width: 'auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.85rem',
                    background: '#21303B',
                    borderRadius: '10px',
                    borderLeft: '2px solid red',
                }}
            >
                <div style={{
                    display: 'flex',
                    width: '20rem'
                }}>
                    <img src={WarningSVG} style={{paddingLeft:'0.3rem',paddingRight:'0.3rem'}} alt="WarningSVG"/>
                    <p>{error}</p>
                </div>
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </div>
        </Snackbar>
    </div>
  );
}