import React, {useState} from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import moment from "moment";

const TimeTracker = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    let [data] = useState([]);

    const boxStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };


    // start & end dates used by the datePicker
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

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

    const resetFields = () => {
        setStartDate(null);
        setEndDate(null);
    }

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
                setIsModalOpen(false);
                resetFields();
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
            <Button variant="outlined" color="success" onClick={() => setIsModalOpen(true)}>Add Time</Button>
            <Modal
                hideBackdrop
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...boxStyle }}
                >
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
                    <div className="buttons-container">
                        <Button 
                            variant="outlined"
                            color="primary"
                            onClick={() => handleAdd()}
                        >
                            Add
                        </Button>
                        <Button 
                            variant="outlined"
                            color="error"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Close
                        </Button>
                    </div>
                </Box>
            </Modal>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Start</th>
                    <th scope="col">End</th>
                    <th scope="col">Duration(HH:mm)</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map((value) => {
                        return(
                            <tr key={value.id}>
                                <td>{moment(value.startDate).format('DD-MM-YYYY HH:mm')}</td>
                                <td>{moment(value.endDate).format('HH:mm')}</td>
                                <td>{value.durationString}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </Box>
    );
}

export default TimeTracker;
