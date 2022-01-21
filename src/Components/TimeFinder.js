import * as React from 'react';
import moment from 'moment';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import InputAdornment from '@mui/material/InputAdornment';
import CardContent from '@mui/material/CardContent';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TimePicker from '@mui/lab/TimePicker';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';

export const TimeFinder = () => {
    const [timeValue, setTimeValue] = React.useState(moment());
    const [minutesValue, setMinutesValue] = React.useState(0);
    const [hoursValue, setHoursValue] = React.useState(0);
    const [difference, setDifference] = React.useState('before');
    const [result, setResult] = React.useState(null);

    const handleReset = React.useCallback(() => {
        setTimeValue(moment())
        setMinutesValue(0);
        setHoursValue(0)
    }, [])

    React.useEffect(() => {
        if (difference === 'before') {
            setResult(
                moment(timeValue)
                    .subtract(hoursValue, 'hours')
                    .subtract(minutesValue, 'minutes')
                    .format("hh:mm A"))
        } else if (difference === 'after') {
            setResult(
                moment(timeValue)
                .add(hoursValue, 'hours')
                .add(minutesValue, 'minutes')
                .format("hh:mm A"))
        }
    }, [difference, hoursValue, minutesValue, timeValue])

    return (
        <Card variant="outlined" sx={{ maxWidth: '15em', mt: '10%', mx: 'auto' }} >
            <CardHeader 
                avatar={<AccessTimeIcon />} 
                title="Time Finder"
                subheader="Enter time, then hours, minutes, and difference to find the resulting time"
            />
            <CardContent>
                <TimePicker
                    label="Starting Time"
                    value={timeValue}
                    onChange={time => setTimeValue(moment(time))}
                    renderInput={(params) => <TextField margin="dense" {...params} />}
                />
                <TextField
                    type="number"
                    label="Hours"
                    margin="dense"
                    value={hoursValue}
                    onChange={ev => setHoursValue(ev.target.value)}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">hr</InputAdornment>,
                    }} 
                />
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
                <ToggleButtonGroup
                    color="primary"
                    value={difference}
                    fullWidth
                    exclusive
                    onChange={ev => setDifference(ev.target.value)}
                >
                    <ToggleButton value="before">Before</ToggleButton>
                    <ToggleButton value="after">After</ToggleButton>
                </ToggleButtonGroup>
                <Typography variant="h5" align="center" sx={{ mt: '1em' }}>
                    {result}
                </Typography>
                <CardActions>
                    <Button 
                        variant="contained" 
                        sx={{ margin: 'auto' }}
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
};
