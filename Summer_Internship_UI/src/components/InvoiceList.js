import React, {useState} from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import {searchAPI} from '../services/services';
import {useDispatch} from 'react-redux';
import {searchInvoice} from '../actions/invoiceAction';
import MainTable from './MainTable';
// import SearchResultTable from './SearchResultTable';
import AddButton from './Buttons/AddButton';
import EditButton from './Buttons/EditButton';
import DeleteButton from './Buttons/DeleteButton';
import TemplateButton from './Buttons/TemplateButton';
import PredictButton from './Buttons/PredictButton';


const useStyles = makeStyles((theme) => ({
    button: {
        color: '#FFFFFF',
        background: 'transparent',
        borderRadius: '10px',
        borderColor: '#14AFF1',
        textTransform: 'none',
        padding: '0.2rem 1rem',
        marginRight: '0.6rem',
        "&:hover": {
            background: '#14AFF1'
        },
        "&:disabled": {
            background: 'transparent',
            color: '#97A1A9',
            borderColor: '#97A1A9'
        }
    },
    predictButton: {
        color: '#FFFFFF',
        background: '#14AFF1',
        borderRadius: '10px',
        borderColor: '#14AFF1',
        textTransform: 'none',
        padding: '0.2rem 1rem',
        marginRight: '0.6rem',
        "&:hover": {
            background: '#14AFF1'
        },
        "&:disabled": {
            background: '#97A1A9',
            color: '#FFFFFF',
            borderColor: '#97A1A9'
        }
    },
    actionAreaRight: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    searchBar: {
        padding: '0.4rem',
        paddingRight: '3rem',
        fontFamily: theme.typography.fontFamily,
        borderRadius: '10px',
        border: '1px solid #356680',
        background: 'transparent',
        color: '#FFFFFF',
        "&:focus": {
            border: '1px solid #14AFF1',
            outline: 'none'
        }
    },
    searchBtn: {
        display: 'inline-block', 
        position: 'relative',
        left: '-2rem',
        bottom: '-0.3rem',
        color: '#97A1A9',
        cursor: 'pointer'
    },
}))

const CustomSearchBar = withStyles({
    root: {
        borderRadius: '10px',
        background: '#283A46',
    },
    input: {
        color: '#ffffff',
        paddingLeft: '0.5rem',
        padding: '0px',
        fontSize: '0.85rem',
    },
    adornedEnd: {
        paddingRight: '0px',
        color: '#97A1A9'
    },
    notchedOutline: {
        borderColor: '#356680 !important',
    },
    focused: {}
})(OutlinedInput);

function InvoiceList() {
    const classes = useStyles();
    
    const dispatch = useDispatch();

    const [search, setSearch] = useState('');

    const getData = () => {
        console.log("Fetching Data ..");
        // if(search.length > 0) {
            searchAPI(search)
            .then((res) => {
                dispatch(searchInvoice(res.data));
            })
            .catch((err) => console.log(err));
        // }
    }

    const debounce = (func, delay) => {
        let inDebounce
        return function() {
          const context = this
          const args = arguments
          clearTimeout(inDebounce)
          inDebounce = setTimeout(() =>
            func.apply(context, args)
          , delay)
        }
    }

    const handleSearch = debounce(getData, 300);

    return (
        <>
            <Grid container direction="row" style={{paddingBottom: '0.7rem'}}>
                <Grid item xs={5}>
                    <PredictButton />
                    <TemplateButton 
                        modelMode='template'
                    />
                </Grid>
                <Grid item xs={7} className={classes.actionAreaRight}>
                    <AddButton 
                        modelMode='add'
                    />
                    <EditButton 
                        modelMode='edit'
                    />
                    <DeleteButton 
                        modelMode='delete'
                    />
                    <CustomSearchBar
                        placeholder="Search by Invoice Number"
                        endAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
                        value={search}
                        onKeyUp={handleSearch}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Grid>
            </Grid>
            <Grid container>
                <MainTable 
                    search={search}
                    setSearch={setSearch}
                />
            </Grid>
        </>
    )
}

export default InvoiceList;