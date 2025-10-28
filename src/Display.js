import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";


const apiBaseUrl = process.env.REACT_APP_API_URL;

export default function Display() {
  const [awards, setAwards] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/api/awards`)
      .then((res) => setAwards(res.data))
      .catch((err) => console.error("Error fetching awards:", err));
  }, []);

  useEffect(() => {
    if (!awards.length) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % awards.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [awards]);

  if (!awards.length)
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          fontFamily: "Open Sans, sans-serif",
        }}
      >
        <h1>Temple Law Trophy Display</h1>
        <p>Loading awards...</p>
      </div>
    );

  const total = awards.length;
  const current = awards[index];

  // Three cards on each side
  const leftCards = [
    awards[(index - 3 + total) % total],
    awards[(index - 2 + total) % total],
    awards[(index - 1 + total) % total],
  ];
  const rightCards = [
    awards[(index + 1) % total],
    awards[(index + 2) % total],
    awards[(index + 3) % total],
  ];

  const smallCardStyle = {
    width: "13%",
    minWidth: "160px",
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(3px)",
    borderRadius: "15px",
    padding: "12px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.25)",
    textAlign: "center",
    color: "#111",
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        background: `
          linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)),
          url('/temple-1.jpg') center/cover no-repeat
        `,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Open Sans, sans-serif",
        position: "relative",
      }}
    >
      {/* Main horizontal layout */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "90%",
          maxWidth: "1600px",
        }}
      >
        {/* === LEFT SIDE CARDS === */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            alignItems: "center",
            justifyContent: "center",
            flex: "0 0 15%",
          }}
        >
          {leftCards.map(
            (a, i) =>
              a && (
                <div
                  key={a._id}
                  style={{
                    ...smallCardStyle,
                    opacity: 0.9 - i * 0.15,
                    transform: `scale(${1 - i * 0.05})`,
                  }}
                >
                  <h4
                    style={{
                      color: "#8c1515",
                      fontSize: "1rem",
                      marginBottom: "4px",
                    }}
                  >
                    {a.awardName}
                  </h4>
                  <p style={{ margin: 0, fontSize: "0.8rem" }}>{a.year}</p>
                  <p style={{ margin: 0, fontSize: "0.8rem" }}>{a.rank}</p>
                </div>
              )
          )}
        </div>

        {/* === CENTER MAIN CARD === */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current._id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            style={{
              width: "45%",
              maxWidth: "850px",
              backgroundColor: "rgba(255,255,255,0.96)",
              borderRadius: "25px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
              padding: "50px 60px",
              textAlign: "left",
              zIndex: 5,
            }}
          >
            <h1
              style={{
                color: "#8c1515",
                marginBottom: 25,
                fontFamily: "'Playfair Display', serif",
                fontSize: "2rem",
              }}
            >
              {current.awardName || "Unnamed Award"}
            </h1>
            <p>
              <strong>Competition:</strong> {current.competition || "—"}
            </p>
            <p>
              <strong>Category:</strong> {current.category || "—"}
            </p>
            <p>
              <strong>Year:</strong> {current.year || "—"}
            </p>
            <p>
              <strong>School:</strong> {current.school || "—"}
            </p>
            <p>
              <strong>Rank:</strong> {current.rank || "—"}
            </p>
            <p>
              <strong>Participants:</strong> {current.participants || "—"}
            </p>
            {current.additionalInfo && (
              <p style={{ fontStyle: "italic", marginTop: "20px" }}>
                {current.additionalInfo}
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* === RIGHT SIDE CARDS === */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            alignItems: "center",
            justifyContent: "center",
            flex: "0 0 15%",
          }}
        >
          {rightCards.map(
            (a, i) =>
              a && (
                <div
                  key={a._id}
                  style={{
                    ...smallCardStyle,
                    opacity: 0.9 - i * 0.15,
                    transform: `scale(${1 - i * 0.05})`,
                  }}
                >
                  <h4
                    style={{
                      color: "#8c1515",
                      fontSize: "1rem",
                      marginBottom: "4px",
                    }}
                  >
                    {a.awardName}
                  </h4>
                  <p style={{ margin: 0, fontSize: "0.8rem" }}>{a.year}</p>
                  <p style={{ margin: 0, fontSize: "0.8rem" }}>{a.rank}</p>
                </div>
              )
          )}
        </div>
      </div>

      {/* === FOOTER === */}
      <div
        style={{
          position: "absolute",
          bottom: 25,
          width: "100%",
          textAlign: "center",
          fontSize: "1rem",
          color: "#eee",
          fontWeight: 500,
        }}
      >
        Showing {index + 1} of {total} awards
      </div>
    </div>
  );
}


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function App() {
//   const [awards, setAwards] = useState([]);
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/awards")
//       .then((res) => setAwards(res.data))
//       .catch((err) => console.error("Error fetching awards:", err));
//   }, []);

//   // Rotate every 8 seconds
//   useEffect(() => {
//     if (!awards.length) return;
//     const timer = setInterval(() => {
//       setIndex((prev) => (prev + 1) % awards.length);
//     }, 8000);
//     return () => clearInterval(timer);
//   }, [awards]);

//   if (!awards.length) {
//     return (
//       <div style={{ textAlign: "center", paddingTop: "40px", fontSize: "1.5rem" }}>
//         <h1>Temple Law Trophy Display</h1>
//         <p>Loading awards...</p>
//       </div>
//     );
//   }

//   const a = awards[index];

//   return (
//     <div
//       style={{
//         height: "100vh",
//         width: "100vw",
//         backgroundColor: "#fdfdfd",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         transition: "opacity 1s ease-in-out",
//       }}
//     >
//       <h1 style={{ fontSize: "2.5rem", marginBottom: "40px", color: "#8c1515" }}>
//         Temple Law Trophy Display
//       </h1>

//       <div
//         style={{
//           width: "65%",
//           padding: "40px",
//           borderRadius: "16px",
//           boxShadow: "0 6px 30px rgba(0,0,0,0.15)",
//           background: "white",
//           textAlign: "left",
//           fontSize: "1.3rem",
//           transition: "all 0.8s ease",
//         }}
//       >
//         <h2 style={{ color: "#8c1515", marginBottom: "20px" }}>
//           {a.awardName || "Unnamed Award"}
//         </h2>
//         <p><strong>Competition:</strong> {a.competition || "—"}</p>
//         <p><strong>Category:</strong> {a.category || "—"}</p>
//         <p><strong>Year:</strong> {a.year || "—"}</p>
//         <p><strong>School:</strong> {a.school || "—"}</p>
//         <p><strong>Rank:</strong> {a.rank || "—"}</p>
//         <p><strong>Participants:</strong> {a.participants || "—"}</p>
//         {a.additionalInfo && (
//           <p style={{ marginTop: "20px", fontStyle: "italic" }}>{a.additionalInfo}</p>
//         )}
//       </div>

//       <p style={{ marginTop: "30px", fontSize: "1rem", opacity: 0.6 }}>
//         Displaying {index + 1} of {awards.length} awards
//       </p>
//     </div>
//   );
// }

// export default App;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000");

// function App() {
//   const [awards, setAwards] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/awards")
//       .then((res) => setAwards(res.data))
//       .catch((err) => console.error("Error fetching awards:", err));

//     socket.on("new-award", (award) => {
//       setAwards((prev) => [...prev, award]);
//     });

//     return () => socket.disconnect();
//   }, []);

//   if (!awards.length) {
//     return (
//       <div style={{ textAlign: "center", paddingTop: "40px", fontSize: "1.5rem" }}>
//         <h1>Temple Law Trophy Display</h1>
//         <p>Loading awards...</p>
//       </div>
//     );
//   }

//   return (
//     <div style={{ textAlign: "center", padding: "40px" }}>
//       <h1 style={{ marginBottom: "40px" }}>Temple Law Trophy Display</h1>
//       <div
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "center",
//           gap: "25px",
//         }}
//       >
//         {awards.map((a) => (
//           <div
//             key={a._id}
//             style={{
//               width: 300,
//               background: "#f9f9f9",
//               borderRadius: 12,
//               boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//               padding: "20px",
//               textAlign: "left",
//             }}
//           >
//             <h3 style={{ color: "#8c1515", fontWeight: "bold" }}>
//               {a.awardName || "Unnamed Award"}
//             </h3>
//             <p style={{ margin: "6px 0", fontWeight: "500" }}>
//               <strong>Competition:</strong> {a.competition || "—"}
//             </p>
//             <p style={{ margin: "6px 0" }}>
//               <strong>Category:</strong> {a.category || "—"}
//             </p>
//             <p style={{ margin: "6px 0" }}>
//               <strong>Year:</strong> {a.year || "—"}
//             </p>
//             <p style={{ margin: "6px 0" }}>
//               <strong>School:</strong> {a.school || "—"}
//             </p>
//             <p style={{ margin: "6px 0" }}>
//               <strong>Rank:</strong> {a.rank || "—"}
//             </p>
//             <p style={{ margin: "6px 0" }}>
//               <strong>Participants:</strong> {a.participants || "—"}
//             </p>
//             {a.additionalInfo && (
//               <p style={{ fontStyle: "italic", marginTop: "10px" }}>
//                 {a.additionalInfo}
//               </p>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;
