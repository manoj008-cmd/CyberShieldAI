import { useEffect, useState } from "react";

function StatusBar() {

    const [time, setTime] = useState("");

    useEffect(() => {

        const timer = setInterval(() => {

            setTime(new Date().toLocaleString());

        }, 1000);

        return () => clearInterval(timer);

    }, []);

    return (

        <div
            style={{
                background: "#0F172A",
                color: "white",
                padding: "15px",
                borderRadius: "12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px"
            }}
        >

            <div>
                🟢 SOC Status : ACTIVE
            </div>

            <div>
                🟢 Backend Connected
            </div>

            <div>
                🟢 Database Connected
            </div>

            <div>
                🤖 AI Model Loaded
            </div>

            <div>
                🕒 {time}
            </div>

        </div>

    );

}

export default StatusBar;