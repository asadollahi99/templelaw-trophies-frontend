import React from "react";
import Display from "./Display";
import AdminPanel from "./AdminPanel";

function App() {
    const isAdmin = window.location.pathname.includes("admin");

    return isAdmin ? <AdminPanel /> : <Display />;
}

export default App;
