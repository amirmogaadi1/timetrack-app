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

import {uuidv} from "../utils/uuidv";

const TimeTracker = () => {

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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [updateElementId, setUpdateElementId] =  useState(null);

    // get the actualData from localStorage or initiate it to []
    const [data, setData] = useState(JSON.parse(localStorage.getItem('data')) || []);


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
                            id: uuidv(),
                            startDate: moment(startDate).toISOString(),
                            endDate: moment(endDate).toISOString(),
                            durationString,
                            duration,
                        });
                    localStorage.setItem('data', JSON.stringify(data));
                    alert('Time frame added');
                    setUpdateElementId(null);
                    resetFields();
                    setIsModalOpen(false);
            }
        }
    }

    const handleSave = () => {
        if (!startDate || !endDate) {
            alert('Start & end dates are required');
        } else {
            const duration = moment.duration(moment(endDate).diff(moment(startDate))).asHours();
            const durationString = extractDurationString(moment.duration(moment.duration(moment(endDate).diff(moment(startDate)))._milliseconds));
            if (duration <= 0) {
                alert('Start/end date not valid');
            } else {
                const updateIndex = data.findIndex(
                    (e) => e.id === updateElementId
                );
                const newData = [
                    ...data.slice(0, updateIndex),
                    {
                        id: updateElementId,
                        startDate: moment(startDate).toISOString(),
                        endDate: moment(endDate).toISOString(),
                        duration,
                        durationString,
                    },
                    ...data.slice(updateIndex + 1),
                ];
                setData(newData);
                localStorage.setItem('data', JSON.stringify(newData));
                alert('Time frame updated');
                setIsModalOpen(false);
                setUpdateElementId(null);
                resetFields();
            }
        }
    };


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
                    {
                        updateElementId ? (
                            <Button variant="outlined" color="primary" onClick={() => {
                                handleSave();
                            }}>Save</Button>
                        ) : (
                            <Button variant="outlined" color="primary" onClick={() => {
                                handleAdd();
                            }}>Add</Button>
                        )
                    }
                        <Button onClick={() => {
                            setIsModalOpen(false);
                            resetFields();
                        }}>
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
                    <th scope="col"></th>
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
                                <td>
                                    <Button  variant="outlined" color="primary" style={{ marginRight: 10}} onClick={() => {
                                        setUpdateElementId(value.id);
                                        setStartDate(value.startDate);
                                        setEndDate(value.endDate);
                                        setIsModalOpen(true);
                                    }}>Update</Button>
                                    <Button  variant="outlined" color="error" onClick={() => {
                                        setData(data.filter((e) => e.id !== value.id));
                                        localStorage.setItem('data', JSON.stringify(data.filter((e) => e.id !== value.id)));
                                    }}>Delete</Button>
                                </td>
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
