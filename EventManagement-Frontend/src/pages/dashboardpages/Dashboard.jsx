import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { User, Users, Calendar } from "lucide-react";

export default function DashboardPage() {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/users");
        const data = await res.json();
        if (data.status) {
          setUsers(data.users || []);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- Counts ---
  const totalUsers = users.length;
  const totalAttendees = users.filter((u) => u.role === "attendee").length;
  const totalExhibitors = users.filter((u) => u.role === "exhibitor").length;
  const totalOrganizers = users.filter((u) => u.role === "organizer").length;
  const totalEvents = events.length || 17;

  // --- Chart Data ---
  const roleData = [
    { name: "Attendees", value: totalAttendees, color: "#34d399" }, // green
    { name: "Exhibitors", value: totalExhibitors, color: "#a855f7" }, // purple
    { name: "Organizers", value: totalOrganizers, color: "#6366f1" }, // indigo
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-8">
        {loading ? (
          <p className="text-gray-600">Loading dashboard...</p>
        ) : (
          <>
            {/* --- Stats Cards --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <Card title="Total Users" value={totalUsers} color="from-indigo-500 to-indigo-700" icon={<Users />} />
              <Card title="Attendees" value={totalAttendees} color="from-green-500 to-emerald-600" icon={<User />} />
              <Card title="Exhibitors" value={totalExhibitors} color="from-purple-500 to-fuchsia-600" icon={<User />} />
              <Card title="Events" value={totalEvents} color="from-orange-400 to-red-500" icon={<Calendar />} />
            </div>

            {/* --- Charts Section --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              {/* Bar Chart */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h2 className="text-lg font-semibold mb-4 border-b pb-2">
                  📊 Users by Role
                </h2>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={roleData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {roleData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h2 className="text-lg font-semibold mb-4 border-b pb-2">
                  🥧 Role Distribution
                </h2>
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={roleData}
                      dataKey="value"
                      outerRadius={100}
                      label
                    >
                      {roleData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* --- Recent Users Table --- */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h2 className="text-lg font-semibold mb-4 border-b pb-2">
                👥 Recent Users
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700">
                      <th className="p-3 rounded-tl-lg">User</th>
                      <th className="p-3">Email</th>
                      <th className="p-3 rounded-tr-lg">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.slice(-5).map((user, idx) => (
                      <tr
                        key={user._id}
                        className={`${
                          idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-indigo-50 transition`}
                      >
                        <td className="p-3 flex items-center space-x-3">
                          <img
                            src={`http://localhost:3000${user.image}` || "https://i.pravatar.cc/40"}
                            alt={user.username}
                            className="w-9 h-9 rounded-full border shadow-sm"
                          />
                          <span className="font-medium">{user.username}</span>
                        </td>
                        <td className="p-3 text-gray-600">{user.email}</td>
                        <td className="p-3 capitalize font-semibold text-indigo-600">
                          {user.role}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

/* --- Stat Card --- */
function Card({ title, value, color, icon }) {
  return (
    <div
      className={`flex items-center justify-between p-6 rounded-2xl text-white shadow-lg bg-gradient-to-r ${color} transform hover:scale-105 transition`}
    >
      <div>
        <h3 className="text-sm opacity-90">{title}</h3>
        <p className="text-3xl font-extrabold">{value}</p>
      </div>
      <div className="opacity-80">{icon}</div>
    </div>
  );
}
