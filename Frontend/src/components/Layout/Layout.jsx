import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0B1120" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <main style={{ padding: "20px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;