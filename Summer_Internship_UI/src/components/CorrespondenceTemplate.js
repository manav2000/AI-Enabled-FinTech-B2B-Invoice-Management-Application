import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TemplateOne from './TemplateOne';
import { getCorrespondenceData } from '../services/services';
import TemplateTwo from './TemplateTwo';
import { tablePDF } from '../utils/pdfGenerator';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    template_main: {
        background: '#2A3E4C',
        display: 'flex',
        flexDirection: 'column',
        width: '86vw',
        height: 'fit-content',
        top: '50%',
        left: '50%',
        position: 'absolute',
        transform: 'translate(-50%,-50%)',
        color: '#FFFFFF',
        borderRadius: '10px',
    },
    template_header: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        alignItems: 'center',
        borderBottom: '1.5px solid #283A46'
    },
    template_header_dropdown_div: {
        display:'flex',
        alignItems: 'center'
    },
    formControl: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    template_body: {
        display: 'flex',
        flexDirection: 'column',
        borderBottom: '1.5px solid #283A46',
        color: '#C0C6CA',
        fontSize: '0.85rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        height: '50vh',
        overflow: 'auto'
    },
    template_footer_btns: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '1rem',
        alignItems: 'center',
    },
    closeIcon: {
        cursor: 'pointer',
        fontSize: '1.3rem',
        paddingLeft: '2rem',
    },
    cancelBtn: {
        borderColor: '#14AFF1',
        color: '#ffffff',
        fontSize: '0.85rem',
        textTransform: 'None',
        borderRadius: '10px',
        marginRight: '1rem',
    },
    downloadBtn: {
        color: '#ffffff',
        fontSize: '0.85rem',
        textTransform: 'None',
        borderRadius: '10px',
        background: '#14AFF1',
        "&:hover": {
            background: '#14AFF1',
        }
    },
    selectOutlined: {
        background: '#283A46',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        fontSize: '0.85rem',
        color: '#ffffff', 
    },
    selectIcon: {
        color: '#C0C6CA'
    },
    selectMenu: {
        background: '#283A46',
        color: '#ffffff',
        "& ul": {
            border: '1px solid #14AFF1',
            borderRadius: '10px'
        },
        "& li": {
            fontSize:'0.85rem',
        },
        "& li:hover": {
            background:'#2A5368'
        },
    },
    selected: {
        backgroundColor: '#283A46 !important',
        "&:hover": {
            background:'#2A5368 !important'
        }
    },
    selectOutline: {
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: '#14AFF1 !important'
        }
    }
}))

const CorrespondenceTemplate = React.forwardRef(({handleClose}, ref) => {
    const classes = useStyles();

    const [templateData, setTemplateData] = React.useState([]);

    const [template, setTemplate] = React.useState(1);

    const selected = useSelector(state => state.checked);

    React.useEffect(() => {
        getCorrespondenceData(selected)
        .then((res) => {
            setTemplateData(res.data);
            console.log(res.data)
        })
    }, [])

    const handleDropdownChange = (event) => {
        setTemplate(event.target.value);
    };

    const handleDownload = () => {
        tablePDF(templateData,template,total);
    }

    const total = 
        templateData.length > 0 ? 
        templateData.reduce((total, invoice) => total + invoice.total_open_amount,0)
        : 0;

    return (
        <div className={classes.template_main}>
            <div className={classes.template_header}>
                <h3 style={{fontWeight: '400'}}>View Correspondence ({selected.length})</h3>
                <div className={classes.template_header_dropdown_div}>
                    <FormControl variant="outlined" className={classes.formControl}>
                    <label style={{color:'#C0C6CA',fontSize:'0.85rem',marginRight:'1rem'}}>View: </label>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={template}
                            onChange={handleDropdownChange}
                            className={classes.selectOutline}
                            classes={{
                                outlined: classes.selectOutlined,
                                icon: classes.selectIcon,
                            }}
                            MenuProps={{
                                classes:{
                                    paper: classes.selectMenu,
                                },
                                anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "left"
                                },
                                transformOrigin: {
                                    vertical: "top",
                                    horizontal: "left"
                                },
                                getContentAnchorEl: null
                            }}
                        >
                            <MenuItem classes={{selected: classes.selected}} value={1}>Template 1</MenuItem>
                            <MenuItem classes={{selected: classes.selected}} value={2}>Template 2</MenuItem>
                        </Select>
                    </FormControl>
                    <CloseIcon className={classes.closeIcon} onClick={handleClose}/>
                </div>
            </div>
            <div className={classes.template_body}>
                {
                    template === 1 ?
                    <>
                        <TemplateOne templateData={templateData} total={total}/>
                    </>
                    :
                    <>
                        <TemplateTwo templateData={templateData}/>
                    </>
                }
            </div>
            <div className={classes.template_footer_btns}>
                <Button 
                    className={classes.cancelBtn} 
                    variant="outlined"
                    onClick={handleClose}
                >
                    Cancel
                </Button>
                <Button 
                    className={classes.downloadBtn} 
                    variant="contained"
                    onClick={handleDownload}
                >
                    Download
                </Button>
            </div>
        </div>
    )
})

export default CorrespondenceTemplate
