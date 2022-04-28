import { Autocomplete, Button, Checkbox, CircularProgress, InputLabel, MenuItem, Popover, Select, TextField } from "@mui/material";
import { makeStyles } from '@mui/styles'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { City } from 'country-state-city';
import { useState, useEffect } from "react";
import './search.scss';
import { categories } from "../../models/filters";
import { ProfessionalsList } from "./professionals-list/professionals-list";
import store from "../../store";
import { getAllProfessionals } from "../../services/user.service";
import { getClients } from "../../services/professional.service";
import { getProfileData } from "../../services/profile.service";
export function Search() {
    const [gender, setGender] = useState('Any');
    const [category, setCategory] = useState(categories[0]);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [searchFor, setSearchFor] = useState('Professional')
    const [searchInput, setSearchInput] = useState('');
    const [results, setResults] = useState([]);
    const [searchResults, setSearchResuts] = useState();
    const [filters, setFilters] = useState({
        name: '',
        professional_type: 'All',
        gender: 'Any'
    });
    const user = store.getState().userDetails;
    const isCustomer = user.user_type==='Customer';
    const isProfessional = user.user_type==='Professional'
    useEffect(() => {
        getProfessionals();
    }, [])

    

    async function getProfessionals() {
        const { data } = await (isCustomer ? getAllProfessionals() : getClients(user._id));
        if(isProfessional) {
            console.log(data.professional_info.customers_enrolled);
            setResults(data.professional_info.customers_enrolled);
            setSearchResuts(data.professional_info.customers_enrolled);
        }
        else {
            setResults(data);
            setSearchResuts(data);
        }
       
    }

    const filterSearchResults = (filters) => {
        if (!filters) {
            setSearchResuts(results);
            return;
        }

        const filterWithNames = results.filter(data => {
            
            return data.professional_info?.name?.toLowerCase().includes(filters.name?.toLowerCase())
        });

        const filterWithType = filterWithNames.filter(data => {

            if (filters.professional_type === 'All') {
                return true;
            }
            return data.professional_info.professional_type === filters.professional_type
        });

        const filterWithGender = filterWithType.filter(data => {
            if (filters.gender === 'Any') {
                return true;
            }
            return data.professional_info.gender === filters.gender;
        });

        setSearchResuts(filterWithGender);
    }


    const useCustomStylesByIds = () => {
        const myStyles = makeStyles((theme) => {
            const stylesObj = {
                'search-for-filters': {
                    display: 'flex'
                },
                'search-by-filters': {
                    display: 'flex',
                    height: '100px'
                },
                'filter': {
                    margin: '20px'
                }
            };
            return stylesObj;
        });

        return myStyles();
    };

    const updateFilters = (filter) => {

        setFilters(prev => {
            const newFilters = { ...prev, ...filter };
            filterSearchResults(newFilters);
            return newFilters
        });
    }
    const [anchorEl, setAnchorEl] = useState(null)

    const classes = useCustomStylesByIds();
    return (
        <div className="search-container">
            <div className="search-header" style={{ marginBottom: '30px', display: 'flex', fontWeight: 'bold' }}>{ user.user_type==='Customer' ? 'Explore Fitness Professionals.' : 'Explore your clients'}</div>
            {user.user_type === 'Customer' && <div className="search-filters" style={{ display: 'flex', marginBottom: '30px' }}>
                <Button id='filters-button' variant="text" startIcon={<FilterAltIcon />} onClick={(e) => { setAnchorEl(e.currentTarget); setFiltersOpen(!filtersOpen) }}>
                    Filters
                </Button>
                <Popover
                    open={filtersOpen}
                    anchorEl={anchorEl}
                    classes={{ paper: "MuiPopover-paper" }}
                    onClose={() => { setFiltersOpen(false); setAnchorEl(null) }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <div className={classes['search-for-filters']}>
                        <div className={classes['filter']}>
                            <InputLabel sx={{ fontSize: '14px' }} >Search For</InputLabel>
                            <Select size="small"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={searchFor}
                                label="Search For"
                                onChange={(e) => setSearchFor(e.target.value)}
                            >

                                <MenuItem value='Professional'>Professional</MenuItem>
                                <MenuItem value='Content'>Content</MenuItem>
                            </Select>
                        </div>
                    </div>
                    <div className={classes['search-by-filters']}>
                        <div className={classes['filter']}>
                            <InputLabel sx={{ fontSize: '14px' }} >Categories</InputLabel>
                            <Select size="small"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={category}
                                label="Category"
                                onChange={(e) => { setCategory(e.target.value); updateFilters({ professional_type: e.target.value }) }}
                            >
                                {categories.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
                            </Select>
                        </div>
                        <div className={classes['filter']}>
                            <InputLabel sx={{ fontSize: '14px' }} >Instructor</InputLabel>
                            <Select size="small"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={gender}
                                label="Instructor"
                                onChange={(e) => { setGender(e.target.value); updateFilters({ gender: e.target.value }) }}
                            >
                                <MenuItem value='Any'>Any</MenuItem>
                                <MenuItem value='Male'>Male</MenuItem>
                                <MenuItem value='Female'>Female</MenuItem>
                            </Select>
                        </div>
                        {/* <div className={classes['filter']}>
                        <CheckboxesTags/>
                        </div> */}
                    </div>
                </Popover>

            </div>}
            <div className="search-input">
                <TextField sx={{ width: '500px' }} onChange={(e) => { setSearchInput(e.target.value); updateFilters({ name: e.target.value }) }} placeholder="Search" size="small"></TextField>
            </div>

            <div className="professionals-list" style={{ marginTop: '2em' }}>
                {searchResults ? (searchResults.length ? <ProfessionalsList professionalsData={searchResults} /> : 'No matching results found' ) : <CircularProgress />}
            </div>
        </div>
    )
}

export function CheckboxesTags() {
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    const cities = (City.getCitiesOfCountry('US')).slice(0, 1000);
    return (
        <>
            <label htmlFor="checkboxes" style={{ fontSize: '14px' }}>Location</label>
            <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                limitTags={2}
                options={cities}
                size="small"
                disableCloseOnSelect
                getOptionLabel={(option) => `${option.name}, ${option.stateCode}`}
                renderOption={(props, option, { selected }) => (
                    <li {...props}>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option.name}
                    </li>
                )}
                sx={{ width: '350px' }}
                renderInput={(params) => (
                    <TextField {...params} />
                )}

            />
        </>
    );
}