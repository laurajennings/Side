import { Box, useMediaQuery } from '@mui/material';
import Row1 from '../components/dashboard/Row1'
import Row2 from '../components/dashboard/Row2'


const gridTemplateLargeScreens = `
    "a b c"
    "a b c"
    "a b c"
    "a b c"
    "d d e"
    "d d e"
    "d d e"
    "d d e"
`;

const gridTemplateSmallScreens = `
    "a"
    "a"
    "a"
    "a"
    "b"
    "b"
    "b"
    "b"
    "c"
    "c"
    "c"
    "c"
    "d"
    "d"
    "d"
    "d"
    "e"
    "e"
    "e"
    "e"
`;




const DashboardPage = () => {
    const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)")
    return (
        <Box width="100%" height="100%" display="grid" gap="1.5rem"
            sx={
                isAboveMediumScreens ? {
                gridTemplateColumns: "repeat(3, minmax(370, 1fr))",
                gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
                gridTemplateAreas: gridTemplateLargeScreens, 
            } : {
                gridAutoColumns: "1fr",
                gridAutoRows: "80px",
                gridTemplateAreas: gridTemplateSmallScreens, 
            }}
        >
        <Row1 />
        <Row2 />
        </Box>
    );
}

export default DashboardPage;