import React, {useCallback} from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TimeTracker from './components/TimeTracker';

const App = () => {
    const [value, setValue] = React.useState('1');
    const handleChange = useCallback((event, newValue) => {
        setValue(newValue);
    }, []);
    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Time Management" value="1" />
                        <Tab label="Graph" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1"><TimeTracker/></TabPanel>
                <TabPanel value="2">Component2</TabPanel>
            </TabContext>
        </Box>

    );
}
export default App;

