import React, {useState} from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import moment from "moment";

const TimeTracker = () => {

    let [data] = useState([]);

    // start & end dates used by the datePicker
    const [startDate, setStartDate] = useState(new moment());
    const [endDate, setEndDate] = useState(new moment());

    // setEndDate to startDate to force 1 day selection
    const handleStartDateTimeChange = (date) => {
        setStartDate(date);
        setEndDate(date);
    };

    const handleEndTimeChange = (date) => {
        setEndDate(date);
    };

    const extractDurationString = (time) => {
        return (Math.floor(time / (1000 * 60 * 60)) + ":" + Math.floor(time / (1000 * 60)) % 60);
    };


    const handleAdd = () => {
        // check if start & end dates are entered
        if (!startDate || !endDate) {
            alert('Start & end dates are required');
        } else {
            const duration = moment.duration(moment(endDate).diff(moment(startDate))).asHours();
            const durationString = extractDurationString(moment.duration(moment.duration(moment(endDate).diff(moment(startDate)))._milliseconds));
            // check if duration is valid
            if (duration <= 0) {
                alert('Start/end date not valid');
            } else {
                // add timeFrame to data array
                data.push(
                    {
                        startDate: moment(startDate).toISOString(),
                        endDate: moment(endDate).toISOString(),
                        durationString,
                        duration,
                    });
                localStorage.setItem('workData', JSON.stringify(data));
                alert('Time frame added');
            }
        }
    }

    return (
        <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}
        >
            <Button variant="outlined" color="success">Add Time</Button>
            <h2 id="child-modal-title">Add Time</h2>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                <DateTimePicker
                    label="Start Date&Time"
                    value={startDate}
                    onChange={handleStartDateTimeChange}
                    renderInput={(params) => <TextField {...params} />}
                />
                <TimePicker
                    label="End Time"
                    value={endDate}
                    onChange={handleEndTimeChange}
                    renderInput={(params) => <TextField {...params} />}
                />
                </Stack>
            </LocalizationProvider>
            <Button 
                variant="outlined"
                style={{ marginTop: 20 }}
                 color="primary"
                 onClick={() => handleAdd()}
            >
                Add
            </Button>
        </Box>
    );
}

export default TimeTracker;
