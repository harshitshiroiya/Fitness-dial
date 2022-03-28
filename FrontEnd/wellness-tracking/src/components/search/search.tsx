import { Autocomplete, Button, Checkbox, InputLabel, MenuItem, Popover, Select, TextField } from "@mui/material";
import { makeStyles } from '@mui/styles'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { City } from 'country-state-city';
import { useState } from "react";
import './search.scss';
import { categories } from "../../models/filters";
export function Search() {
    const [gender, setGender] = useState('Male');
    const [category, setCategory] = useState<string>(categories[0]);
    const [filtersOpen, setFiltersOpen] = useState(false);

    const useCustomStylesByIds = () => {
        const myStyles = makeStyles((theme: any) => {
            const stylesObj = {
                'search-by-filters': {
                    display: 'flex',
                    width: '800px',
                    height: '100px',
                    padding: '30px'
                },
                'filter': {
                    margin: '20px'
                }
            };
            return stylesObj;
        });

        return myStyles();
    };
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

    const classes = useCustomStylesByIds();
    return (
        <div className="search-container">
            <div className="search-header" style={{ marginBottom: '30px', display: 'flex', fontWeight: 'bold' }}>Explore Fitness Professionals.</div>
            <div className="search-filters" style={{ display: 'flex', marginBottom: '30px' }}>
                <Button id='filters-button' variant="text" startIcon={<FilterAltIcon />} onClick={(e: any) => { setAnchorEl(e.currentTarget); setFiltersOpen(!filtersOpen) }}>
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
                    <div className={classes['search-by-filters']}>
                        <div className={classes['filter']}>
                            <InputLabel sx={{ fontSize: '14px' }} >Specialty</InputLabel>
                            <Select size="small"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={category}
                                label="Category"
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {categories.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
                            </Select>
                        </div>
                        <div className={classes['filter']}>
                            <InputLabel sx={{ fontSize: '14px' }} >Gender</InputLabel>
                            <Select size="small"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={gender}
                                label="Gender"
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <MenuItem value='Male'>Male</MenuItem>
                                <MenuItem value='Female'>Female</MenuItem>
                            </Select>
                        </div>
                        <div className={classes['filter']}>
                        <CheckboxesTags/>
                        </div>
                    </div>
                </Popover>

            </div>
            <div className="search-input">
                <TextField sx={{width:'500px'}} placeholder="Search" size="small"></TextField>
            </div>
        </div>
    )
}

export function CheckboxesTags() {
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    const cities = (City.getCitiesOfCountry('US') as any[]).slice(0,1000);
    return (
        <>
        <label htmlFor="checkboxes" style={{fontSize:'14px'}}>Location</label>
        <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            limitTags={2}
            options={cities as any[]}
            size="small"
            disableCloseOnSelect
            getOptionLabel={(option:any) => `${option.name}, ${option.stateCode}`}
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
            sx={{width:'350px'}}
            renderInput={(params) => (
                <TextField {...params} />
            )}

        />
        </>
    );
}