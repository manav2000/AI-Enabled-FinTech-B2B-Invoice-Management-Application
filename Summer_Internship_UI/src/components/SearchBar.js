import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import {searchAPI} from '../services/services';
import {searchInvoice} from '../actions/invoiceAction';
import {useDispatch} from 'react-redux';

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

function SearchBar({search, setSearch}) {

    // const [search, setSearch] = React.useState('');
    // const searchValue = useSelector(state => state.search);

    const dispatch = useDispatch();

    // React.useEffect(() => {
    //     dispatch(setSearchValue(search));
    // }, [search])

    const getData = () => {
        console.log("Fetching Data ..");
        if(search.length > 0) {
            searchAPI(search)
            .then((res) => {
                dispatch(searchInvoice(res.data));
            })
            .catch((err) => console.log(err));
        }
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

    // const handleOnChange = (e) => {
    //     // const value = e.target.value
    //     setSearch(e.target.value)
    //     // dispatch(setSearchValue(value))
    // }

    return (
        <>
         <CustomSearchBar
            placeholder="Search by Invoice Number"
            endAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
            value={search}
            onKeyUp={handleSearch}
            onChange={(e) => setSearch(e.target.value)}
        />   
        </>
    )
}

export default React.memo(SearchBar);
