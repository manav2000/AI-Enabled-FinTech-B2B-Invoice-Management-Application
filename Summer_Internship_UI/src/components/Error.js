import React from 'react';
import ErrorSVG from '../assets/error.svg';
import Button from '@material-ui/core/Button';

function Error({setSearch}) {
    return (
        <div
            style={{
                height: '64vh',
                margin: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: '1px'
            }}
        >
            <img src={ErrorSVG} alt="error.svg"/>
            <h4 style={{color:'#FFFFFF', fontWeight:'400'}}>No results found</h4>
            <p style={{color:'#C0C6CA', fontSize:'0.85rem', marginTop:'0px'}}>
                Try adjusting your search to find what you are looking for.
            </p>
            <Button 
                style={{color:'#14AFF1', background:'none'}}
                onClick={() => setSearch('')}
            >
                Clear Search
            </Button>
        </div>
    )
}

export default Error;
