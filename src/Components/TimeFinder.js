import * as React from 'react';
import moment from 'moment';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import InputAdornment from '@mui/material/InputAdornment';
import CardContent from '@mui/material/CardContent';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TimePicker from '@mui/lab/TimePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';

export const TimeFinder = () => {
    const [timeValue, setTimeValue] = React.useState(moment());
    const [minutesValue, setMinutesValue] = React.useState(0);
    const [difference, setDifference] = React.useState('before');
    const [result, setResult] = React.useState(null);

    React.useEffect(() => {
        if (difference === 'before') {
            setResult(moment(timeValue).subtract(minutesValue, 'minutes').format("hh:mm A"))
        } else if (difference === 'after') {
            setResult(moment(timeValue).add(minutesValue, 'minutes').format("hh:mm A"))
        }
    }, [difference, minutesValue, timeValue])

    return (
        <Card variant="outlined" sx={{ maxWidth: '15em', color: 'primary.main', mt: '10em', mx: 'auto' }} >
            <CardHeader 
                avatar={<AccessTimeIcon />} 
                title="Time Finder"
                subheader="Enter time and minutes"
            />
            <CardContent>
                <TextField
                    type="number"
                    label="Minutes"
                    margin="dense"
                    value={minutesValue}
                    onChange={ev => setMinutesValue(ev.target.value)}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">min</InputAdornment>,
                    }} 
                />
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Difference</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={difference}
                            onChange={ev => setDifference(ev.target.value)}
                        >
                        <FormControlLabel value="before" control={<Radio />} label="Before" />
                        <FormControlLabel value="after" control={<Radio />} label="After" />
                    </RadioGroup>
                </FormControl>
                <TimePicker
                    label="Time"
                    value={timeValue}
                    onChange={time => setTimeValue(moment(time))}
                    renderInput={(params) => <TextField {...params} />}
                />
                <Typography variant="h5" align="center" sx={{ mt: '1em' }}>
                    {result}
                </Typography>
            </CardContent>
        </Card>
    );
};
