import React, { useState, useEffect, useRef, useContext } from "react";
import { Search, Paperclip, Send, UserPlus, LayoutDashboard } from "lucide-react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000";

export default function EventManagementWhatsAppUI() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [messages, setMessages] = useState([]);
  const [composerText, setComposerText] = useState("");
  const [unreadCounts, setUnreadCounts] = useState({});
  console.log("unreadCounts",unreadCounts)
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  // --- INIT SOCKET ---
  useEffect(() => {
    if (!user?._id) return;
    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL, { transports: ["websocket"] });
    }
    const socket = socketRef.current;

    socket.emit("join", user._id);

    // Prepare audio
    const notificationSound = new Audio("/notify.wav");

    socket.on("message:new", (msg) => {
      if (
        (msg.senderId === user._id && msg.receiverId === selectedUserId) ||
        (msg.receiverId === user._id && msg.senderId === selectedUserId)
      ) {
        // Active chat → show directly
        setMessages((prev) => [...prev, { ...msg, outgoing: msg.senderId === user._id }]);
      } else if (msg.receiverId === user._id) {
        // Not active chat → bump unread
        setUnreadCounts((prev) => ({
          ...prev,
          [msg.senderId]: (prev[msg.senderId] || 0) + 1,
        }));
      }

      // 🔔 Play sound only if message is from someone else
      if (msg.senderId !== user._id) {
        notificationSound.play().catch(() => {
          console.warn("Autoplay prevented, user must interact first.");
        });
      }
    });

    return () => {
      socket.off("message:new");
    };
  }, [user?._id, selectedUserId]);

  // Fetch users
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setUsers(data.users);
          const firstOther = data.users.find((u) => u._id !== user?._id) || data.users[0];
          if (firstOther) setSelectedUserId(firstOther._id);
        }
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, [user?._id]);

  // Fetch messages when selectedUserId changes
  useEffect(() => {
    if (!selectedUserId || !user?._id) return;

    axios.get(`http://localhost:3000/messages/${user._id}/${selectedUserId}`)
      .then((res) => {
        if (res.data.status) {
          const formatted = res.data.messages.map((m) => ({
            ...m,
            outgoing: m.senderId === user._id,
          }));
          setMessages(formatted);
        }
      })
      .catch((err) => console.error("Error fetching messages:", err));

    // Reset unread for this user
    setUnreadCounts((prev) => {
      const newCounts = { ...prev };
      delete newCounts[selectedUserId];
      return newCounts;
    });
  }, [selectedUserId, user?._id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  async function handleSend() {
    if (!composerText.trim() || !selectedUserId) return;

    const newMsg = {
      senderId: user?._id,
      receiverId: selectedUserId,
      text: composerText.trim(),
      time: new Date().toISOString(),
    };

    try {
      await fetch("http://localhost:3000/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMsg),
      });
      // ⚡ will be delivered by socket
      setComposerText("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  }

  const filtered = users.filter(
    (u) =>
      u._id !== user?._id &&
      (roleFilter === "all" || u.role === roleFilter) &&
      (u.username.toLowerCase().includes(query.toLowerCase()) ||
        u.email.toLowerCase().includes(query.toLowerCase()))
  );

  const selectedUser = users.find((u) => u._id === selectedUserId);

  function selectUserChat(userId) {
    setSelectedUserId(userId);
    // Reset unread for that chat
    setUnreadCounts((prev) => {
      const newCounts = { ...prev };
      delete newCounts[userId];
      return newCounts;
    });
  }

  return (
    <div className="h-screen bg-gray-100 text-gray-800">
      <div className="h-full flex flex-col md:grid md:grid-cols-12 mx-auto shadow-lg bg-white rounded-lg overflow-hidden">
        {/* LEFT SIDEBAR */}
        <aside className="w-full md:col-span-4 lg:col-span-3 flex flex-col max-h-screen bg-[#1E2939] text-white">
          <div className="px-4 py-3 flex items-center gap-3 border-b border-gray-700 sticky top-0 bg-[#1E2939] z-10">
            <div className="flex-1">
              <h1 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-[#625FFF] to-[#9813FA] bg-clip-text text-transparent">
                Users Hub
              </h1>
              <p className="text-xs md:text-sm text-gray-400">Manage & chat with users</p>
            </div>
            <button className="p-2 rounded-full hover:bg-gray-700">
              <UserPlus size={18} className="text-[#625FFF]" />
            </button>
          </div>

          {/* Search */}
          <div className="px-3 py-3 sticky top-[64px] bg-[#1E2939] z-10">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search users"
                className="w-full pl-10 pr-3 py-2 border rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#625FFF]"/>
              <Search className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            {/* Role Filter Chips */}
            <div className="flex gap-2 mt-3 flex-wrap">
              {["all", "organizer", "exhibitor", "attendee"].map((role) => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  className={`px-3 py-1 rounded-full text-xs md:text-sm border ${
                    roleFilter === role
                      ? "bg-gradient-to-r from-[#625FFF] to-[#9813FA] text-white border-transparent"
                      : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
                  }`}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* User List */}
          <div className="flex-1 overflow-y-auto">
            <ul>  
              {filtered.map((u) => (
                <li key={u._id}
                  onClick={() => selectUserChat(u._id)}
                  className={`cursor-pointer px-4 py-3 flex items-start gap-3 hover:bg-gray-700 ${
                    u._id === selectedUserId
                      ? "bg-gradient-to-r from-[#625FFF]/20 to-[#9813FA]/20 border-l-4 border-[#625FFF]"
                      : unreadCounts[u._id]
                      ? "bg-gray-700/40"
                      : ""
                  }`}>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-md flex items-center justify-center bg-gradient-to-r from-[#625FFF] to-[#9813FA] text-white font-semibold">
                    {u.username.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-sm md:text-base">{u.username}</h3>
                      <p className="text-xs md:text-sm text-gray-400 truncate">{u.email}</p>
                    </div>
                    {unreadCounts[u._id] && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {unreadCounts[u._id]}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="px-4 py-3 border-t border-gray-700 text-xs md:text-sm text-gray-400">
            <div className="flex justify-between">
              <span>Logged in as</span>
              <strong>{user?.username?.toUpperCase()}</strong>
            </div>
          </div>
        </aside>

        {/* MAIN CHAT AREA */}
        <main className="flex-1 md:col-span-8 lg:col-span-9 flex flex-col max-h-screen">
          {selectedUser ? (
            <>
              <div className="px-4 py-3 border-b flex items-center justify-between sticky top-0 bg-white z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-md bg-gradient-to-r from-[#625FFF] to-[#9813FA] flex items-center justify-center font-semibold text-white">
                    {selectedUser.username.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="font-semibold text-sm md:text-base">{selectedUser.username}</h2>
                    <p className="text-xs md:text-sm text-gray-500">{selectedUser.email}</p>
                  </div>
                </div>
                {user?.role !== "attendee" && (
                  <button onClick={() => navigate("/dashboard")}
                    className="p-2 rounded-full bg-gradient-to-r from-[#625FFF] to-[#9813FA] text-white hover:opacity-90 flex items-center gap-2"
                    title="Go to Dashboard">
                    <LayoutDashboard size={18} />
                  </button>
                )}
              </div>

              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                <div className="max-w-3xl mx-auto space-y-3">
                  {messages.map((m) => (
                    <MessageBubble key={m._id || Math.random()} message={m} senderId={user._id} />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <div className="px-4 py-3 border-t sticky bottom-0 bg-white">
                <div className="max-w-3xl mx-auto flex items-center gap-3">
               
                  <input value={composerText}
                    onChange={(e) => setComposerText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Message user..."
                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none"/>
                  <button onClick={handleSend}
                    className="ml-2 bg-gradient-to-r from-[#625FFF] to-[#9813FA] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90">
                    <Send size={16} /> Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">Select a user to start chatting</div>
          )}
        </main>
      </div>
    </div>
  );
}

function MessageBubble({ message, senderId }) {
  const base = "max-w-[70%] px-4 py-2 rounded-lg shadow-sm break-words";
  let displayTime = "";

  if (message.time && /\d/.test(message.time) && message.time.includes("T")) {
    displayTime = new Date(message.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else if (message.time) {
    displayTime = message.time;
  } else if (message.createdAt) {
    displayTime = new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  return (
    <div className={`flex ${message.senderId === senderId ? "justify-end" : "justify-start"}`}>
      <div className={`${base} ${
        message.senderId === senderId
          ? "bg-gradient-to-r from-[#625FFF] to-[#9813FA] text-white rounded-br-none"
          : "bg-white text-gray-800 rounded-bl-none"
      }`}>
        <div className="text-sm">{message.text}</div>
        <div className="text-[11px] text-gray-400 mt-1 text-right">{displayTime}</div>
      </div>
    </div>
  );
}
