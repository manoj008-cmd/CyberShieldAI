import api from "../../services/api";

function ExportButtons() {

    const downloadCSV = () => {
        const baseURL = api.defaults.baseURL || "http://127.0.0.1:8000";
        window.open(
            `${baseURL}/export/csv`,
            "_blank"
        );

    };

    const downloadExcel = () => {
        const baseURL = api.defaults.baseURL || "http://127.0.0.1:8000";
        window.open(
            `${baseURL}/export/excel`,
            "_blank"
        );

    };

    return (

        <div
        style={{
            marginTop:"20px",
            display:"flex",
            gap:"15px"
        }}
        >

            <button
            onClick={downloadCSV}
            style={{
                padding:"12px 25px",
                background:"#059669",
                color:"white",
                border:"none",
                borderRadius:"8px",
                cursor:"pointer"
            }}
            >
                📄 Export CSV
            </button>

            <button
            onClick={downloadExcel}
            style={{
                padding:"12px 25px",
                background:"#2563EB",
                color:"white",
                border:"none",
                borderRadius:"8px",
                cursor:"pointer"
            }}
            >
                📊 Export Excel
            </button>

        </div>

    );

}

export default ExportButtons;