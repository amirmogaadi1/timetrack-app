import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import Box from '@mui/material/Box';
import moment from "moment";
import {Button} from "@mui/material";

const Graph = () => {
    const [dataChart, setDataChart] = useState({});

    let [data] = useState(JSON.parse(localStorage.getItem('data')) || []);

    const [type, setType] = useState("monthly");


    const handleSwitchChart = () => {
        type === 'monthly' ? setType('daily') : setType('monthly');
    }

    useEffect(() => {
            const reducedData = data.reduce( ( a, item ) => {
                let key = moment(item.startDate).format(type === "monthly" ? 'DD.MM.YYYY' : 'MMMM');
                ( a[ key ] ) ? a[ key ].push( item.duration ): ( a[ key ] = [ item.duration ] );
                return a;
            }, {} );
            let workHours = [];
            let dates = [];
            Object.keys(reducedData).map((key) => {
                let sum = 0;
                reducedData[key].forEach((element) => {
                    sum+=element;
                });
                workHours.push(sum);
                dates.push(key);
                return true;
            });
            setDataChart({
                labels: dates,
                datasets: [{
                    label: 'Hours',
                    data: workHours,
                    fill: true,
                    backgroundColor: '#4BC0C033',
                    borderColor: '#4BC0C0FF',
                }]
            });
        },[data, type]
    );
    return(
        <Box sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <Box sx={{
                width: '70%',
            }}>
                <Line
                    data={ dataChart }
                    options={{
                        plugins: {
                            title: {
                            display: true,
                            text: 'Time Tracker',
                            },
                        },
                        responsive: true,
                    }}
                />
            </Box>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSwitchChart}
            >
                Trigger {type}
            </Button>
        </Box>
    );
};

export default Graph;
