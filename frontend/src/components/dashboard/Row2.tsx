//import BoxHeader from "../components/BoxHeader";
import DashboardBox from "./DashboardBox";
//import DataEntry from "@/components/DataEntry";
import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import BoxHeader from "./BoxHeader";
type Props = {}

const Row2 = (props: Props) => {
    const { palette } = useTheme();
    const [dataEntries, setDataEntries] = useState([]);

    useEffect(() => {
      const fetchDataEntries = async () => {
        const response = await fetch("/api/dataEntries");
        const data = await response.json();
        setDataEntries(data);
      };
      fetchDataEntries();
    }, []);

    return (
        <>
        <DashboardBox gridArea="d">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={dataEntries}
                margin={{
                  top: 15,
                  right: 25,
                  left: -10,
                  bottom: 60,
                }}
              >
              <XAxis dataKey="name" tickLine={false} />
              <YAxis tickLine={false} domain={[0, 10]} />
              <Tooltip />
              <Legend />
              <Line 
                  type="monotone" 
                  dataKey="overallFeeling" 
                  stroke={palette.primary[100]} 
                  activeDot={{ r: 8 }} 
              />
              <Line 
                  type="monotone" 
                  dataKey="waterIntake" 
                  stroke={palette.tertiary.main} 
                  activeDot={{ r: 8 }} 
              />
              <Line 
                  type="monotone" 
                  dataKey="sleep" 
                  stroke={palette.primary[700]} 
                  activeDot={{ r: 8 }} 
              />
              </LineChart>
            </ResponsiveContainer>
        </DashboardBox>
        <DashboardBox gridArea="e"></DashboardBox>
        </>
    )
}

export default Row2;