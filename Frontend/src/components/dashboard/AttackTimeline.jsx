import { useEffect, useState } from "react";
import api from "../../services/api";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
);

function AttackTimeline() {

    const [timeline,setTimeline]=useState([]);

    const load=async()=>{

        try{

            const res=await api.get("/timeline");

            setTimeline(res.data.reverse());

        }

        catch(err){

            console.log(err);

        }

    };

    useEffect(()=>{

        load();

    },[]);

    return(

        <div
        style={{
            background:"#1E293B",
            padding:"20px",
            borderRadius:"12px",
            marginTop:"20px"
        }}
        >

            <h2 style={{color:"white"}}>
                📈 Attack Timeline
            </h2>

            <Line
                data={{
                    labels:timeline.map(t=>t.time),

                    datasets:[
                        {
                            label:"Detected Attacks",

                            data:timeline.map((_,i)=>i+1),

                            borderColor:"#3B82F6",

                            backgroundColor:"#3B82F6",

                            tension:0.4
                        }
                    ]
                }}
            />

        </div>

    );

}

export default AttackTimeline;