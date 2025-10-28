import React, { useState, useEffect } from "react";
import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_URL;
const API = `${apiBaseUrl}/api/awards`;

export default function AdminPanel() {
    const [awards, setAwards] = useState([]);
    const [form, setForm] = useState({
        location: "",
        category: "",
        type: "",
        year: "",
        competition: "",
        awardName: "",
        school: "",
        rank: "",
        participants: "",
        additionalInfo: "",
        comments: "",
    });

    // Fetch awards
    const loadData = async () => {
        const res = await axios.get(API);
        setAwards(res.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    // Add award
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(API, form);
        setForm({
            location: "",
            category: "",
            type: "",
            year: "",
            competition: "",
            awardName: "",
            school: "",
            rank: "",
            participants: "",
            additionalInfo: "",
            comments: "",
        });
        loadData();
    };

    // Delete award
    const handleDelete = async (id) => {
        await axios.delete(`${API}/${id}`);
        loadData();
    };

    return (
        <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
            <h1>Temple Law Trophy Admin Dashboard</h1>

            <form
                onSubmit={handleSubmit}
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "10px",
                    marginBottom: "30px",
                }}
            >
                {Object.keys(form).map((key) => (
                    <input
                        key={key}
                        placeholder={key}
                        value={form[key]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
                    />
                ))}
                <button
                    type="submit"
                    style={{
                        gridColumn: "span 2",
                        padding: "12px",
                        border: "none",
                        borderRadius: "8px",
                        background: "#8c1515",
                        color: "white",
                        fontWeight: "bold",
                    }}
                >
                    ➕ Add Award
                </button>
            </form>

            <h2>Existing Awards</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ background: "#eee" }}>
                        <th>Award</th>
                        <th>Competition</th>
                        <th>Year</th>
                        <th>Rank</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {awards.map((a) => (
                        <tr key={a._id}>
                            <td>{a.awardName}</td>
                            <td>{a.competition}</td>
                            <td>{a.year}</td>
                            <td>{a.rank}</td>
                            <td>
                                <button
                                    onClick={() => handleDelete(a._id)}
                                    style={{
                                        background: "red",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "5px",
                                        padding: "5px 10px",
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
