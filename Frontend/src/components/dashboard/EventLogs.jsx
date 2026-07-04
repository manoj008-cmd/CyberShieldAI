import { useEffect, useState } from "react";
import api from "../../services/api";

function EventLogs() {

    const [events,setEvents]=useState([]);

    const load=async()=>{

        try{

            const res=await api.get("/events");

            setEvents(res.data);

        }

        catch(err){

            console.log(err);

        }

    };

    useEffect(()=>{

        load();

        const timer=setInterval(load,5000);

        return ()=>clearInterval(timer);

    },[]);

    const color=(level)=>{

        if(level==="CRITICAL") return "#DC2626";

        if(level==="WARNING") return "#F59E0B";

        return "#22C55E";

    };

    return(

        <div
        style={{
            background:"#1E293B",
            color:"white",
            padding:"20px",
            borderRadius:"12px",
            marginTop:"20px"
        }}
        >

            <h2>📜 SIEM Event Logs</h2>

            <table
            style={{
                width:"100%",
                marginTop:"15px"
            }}
            >

                <thead>

                    <tr>

                        <th align="left">Time</th>

                        <th align="left">Event</th>

                        <th align="left">Level</th>

                    </tr>

                </thead>

                <tbody>

                    {events.map((e,index)=>(

                        <tr key={index}>

                            <td>{e.time}</td>

                            <td>{e.event}</td>

                            <td
                            style={{
                                color:color(e.level),
                                fontWeight:"bold"
                            }}
                            >
                                {e.level}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default EventLogs;