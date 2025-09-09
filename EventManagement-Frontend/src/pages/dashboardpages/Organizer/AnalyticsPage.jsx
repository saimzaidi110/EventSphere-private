import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function AnalyticsPage() {
  const [expoData, setExpoData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Reference for PDF export
  const reportRef = useRef();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/expos")
      .then((response) => {
        setExpoData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching expo data", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <h2 className="text-3xl font-bold text-gray-700 animate-pulse">
          Loading Analytics...
        </h2>
      </div>
    );
  }

  // Prepare datasets
  const eventTitles = expoData.map((event) => event.title);
  const attendeeCounts = expoData.map(
    (event) => event.attendeeList?.length || 0
  );
  const exhibitorCounts = expoData.map(
    (event) => event.exhibitorList?.length || 0
  );
  const boothCounts = expoData.map((event) => event.booths || 0);

  // Dynamic colors
  const generateColors = (count) => {
    return Array.from({ length: count }, (_, i) => 
      `hsl(${(i * 50) % 360}, 70%, 55%)`
    );
  };

  // Attendee Engagement (Horizontal Bar Chart)
  const attendeeChart = {
    labels: eventTitles,
    datasets: [
      {
        label: "Attendees",
        data: attendeeCounts,
        backgroundColor: "rgba(75, 192, 192, 0.7)",
      },
    ],
  };
  const attendeeOptions = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Attendee Engagement",
        font: { size: 22, weight: "bold" },
      },
    },
  };

  // Booth Traffic
  const boothChart = {
    labels: eventTitles,
    datasets: [
      {
        label: "Booth Count",
        data: boothCounts,
        backgroundColor: "rgba(239, 68, 68, 0.7)",
      },
    ],
  };

  // Exhibitor Distribution (Pie Chart)
  const exhibitorChart = {
    labels: eventTitles,
    datasets: [
      {
        label: "Exhibitors",
        data: exhibitorCounts,
        backgroundColor: generateColors(eventTitles.length),
      },
    ],
  };

  // === PDF EXPORT ===
  const downloadPDF = () => {
    const input = reportRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("expo-analytics.pdf");
    });
  };

  // === EXCEL EXPORT ===
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      expoData.map((e) => ({
        Title: e.title,
        Attendees: e.attendeeList?.length || 0,
        Exhibitors: e.exhibitorList?.length || 0,
        Booths: e.booths || 0,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expo Data");
    XLSX.writeFile(workbook, "expo-analytics.xlsx");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <h1 className="text-5xl font-extrabold mb-6 text-center text-gray-800">
        Expo Analytics Dashboard
      </h1>

      {/* Export Buttons */}
      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={downloadPDF}
          className="px-6 py-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
        >
          📄 Download PDF
        </button>
        <button
          onClick={downloadExcel}
          className="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
        >
          📊 Download Excel
        </button>
      </div>

      <div ref={reportRef} className="flex flex-col gap-10 max-w-6xl mx-auto">
        {/* Attendee Engagement */}
        <div className="bg-white w-full p-8 rounded-3xl shadow-2xl">
          <div className="h-[450px]">
            <Bar data={attendeeChart} options={attendeeOptions} />
          </div>
        </div>

        {/* Booth Traffic */}
        <div className="bg-white w-full p-8 rounded-3xl shadow-2xl">
          <div className="h-[450px]">
            <Bar data={boothChart} options={{ responsive: true }} />
          </div>
        </div>

        {/* Exhibitor Distribution */}
        <div className="bg-white w-full p-8 rounded-3xl shadow-2xl">
          <div className="h-[450px] flex justify-center items-center">
            <Pie data={exhibitorChart} options={{ responsive: true }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
