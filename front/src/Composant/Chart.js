import React from 'react';
import {Bar} from 'react-chartjs-2';
import {Chart as ChartJs,CategoryScale,BarElement,LinearScale,Tooltip,Legend} from 'chart.js';

const Chart = () => {

   ChartJs.register(
    CategoryScale,LinearScale,BarElement,Tooltip,Legend
   );
    
    const medecin=[
        {
            nom:"Hery",prestation:"1000000"
        },
        {
            nom:"Mino",prestation:"900000"
        },
        {
            nom:"Andry",prestation:"100"
        },
        {
            nom:"Feno",prestation:"300"
        },
        {
            nom:"Dina",prestation:"45680"
        },
    ]
    return (
        <div>
            <Bar data={{
                labels:medecin.map(med=>med.nom),
                datasets:[{
                    label:"prestation annuelle pour chaque médecin",
                    data:medecin.map(med=>med.prestation),
                    backgroundColor:"#1289A6",
                },]
                
            }}/>
        </div>
    );
};

export default Chart;