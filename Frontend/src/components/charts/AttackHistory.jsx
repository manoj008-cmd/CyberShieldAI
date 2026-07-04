import { useEffect, useState } from "react";
import api from "../../services/api";
import {
    Line
} from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
);

function AttackHistory() {

    const [history, setHistory] = useState([]);

    useEffect(() => {

        const load = async () => {
            const res = await api.get("/history");
            setHistory(res.data);
        };

        load();

    }, []);

    return (

        <Line
            data={{
                labels: history.map(h => h.time),
                datasets: [
                    {
                        label: "Attacks",
                        data: history.map((_, i) => i + 1)
                    }
                ]
            }}
        />

    );

}

export default AttackHistory;