import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";
import { Bell, Users, ShoppingBag, DollarSign, AlertCircle } from "lucide-react";
import Swal from "sweetalert2";

const salesData = [
  { name: "Jan", sales: 400 },
  { name: "Feb", sales: 300 },
  { name: "Mar", sales: 500 },
  { name: "Apr", sales: 700 },
];

const userData = [
  { name: "Buyers", value: 70 },
  { name: "Sellers", value: 30 },
];

const COLORS = ["#0ea5e9", "#10b981"];

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalSales: 0,
    pendingOrders: 0,
  });

  const [userEmail, setUserEmail] = useState(""); // Add state for user email

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await fetch("http://localhost:5000/api/users/count");
        const usersData = await usersRes.json();
        console.log("Users Data:", usersData);

        const productsRes = await fetch("http://localhost:5000/api/products/count");
        const productsData = await productsRes.json();
        console.log("Products Data:", productsData);

        const ordersRes = await fetch("http://localhost:5000/all-orders");
        const ordersData = await ordersRes.json();
        console.log("Orders Data:", ordersData);

        const orders = ordersData.data;

        const pendingOrders = orders.filter(order => order.Status === "padding").length;

        const totalSales = orders.reduce((acc, order) => {
          const price = parseFloat(order.totalPrice);
          if (!isNaN(price)) {
            return acc + price;
          }
          return acc;
        }, 0);

        console.log("Pending Orders:", pendingOrders);
        console.log("Total Sales:", totalSales);

        setDashboardData({
          totalUsers: usersData.totalUsers,
          totalProducts: productsData.totalProducts,
          totalSales: totalSales,
          pendingOrders: pendingOrders,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddAdmin = async () => {
    try {
      // Make sure the endpoint matches the correct one
      const usersRes = await fetch("http://localhost:5000/users"); // Use the correct URL
      const usersData = await usersRes.json();
  
      // Proceed with finding the user by email as before
      const user = usersData.find(u => u.email === userEmail);
  
      if (user) {
        if (user.role === "Buyer") {
          const response = await fetch(`http://localhost:5000/users/${user._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ role: "admin" }),
          });
  
          if (response.ok) {
            Swal.fire({
              title: 'Success!',
              text: 'The user has been made an Admin!',
              icon: 'success',
            });
          } else {
            Swal.fire({
              title: 'Error!',
              text: 'Something went wrong!',
              icon: 'error',
            });
          }
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Sellers cannot be made Admins.',
            icon: 'error',
          });
        }
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'User not found.',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to fetch user data.',
        icon: 'error',
      });
    }
  };
  
  

  return (
    <div>
      <motion.div
        className="p-6 space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold">Welcome Back, Admin 👋</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-100 p-4 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-sm">Total Users</p>
              <p className="text-xl font-bold">{dashboardData.totalUsers}</p>
            </div>
            <Users className="text-blue-600" />
          </div>
          <div className="bg-green-100 p-4 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-sm">Shoes Listed</p>
              <p className="text-xl font-bold">{dashboardData.totalProducts}</p>
            </div>
            <ShoppingBag className="text-green-600" />
          </div>
          <div className="bg-yellow-100 p-4 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-sm">Total Sales</p>
              <p className="text-xl font-bold">${dashboardData.totalSales.toLocaleString()}</p>
            </div>
            <DollarSign className="text-yellow-600" />
          </div>
          <div className="bg-red-100 p-4 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-sm">Pending Orders</p>
              <p className="text-xl font-bold">{dashboardData.pendingOrders}</p>
            </div>
            <AlertCircle className="text-red-600" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-2">Sales Overview</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={salesData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#0ea5e9" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-2">User Role Breakdown</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={userData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {userData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl shadow space-y-2">
            <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
            <div className="bg-white p-4 rounded-xl shadow space-y-2">
              <h2 className="text-lg font-semibold mb-2">Add Admin</h2>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter User's Email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <button
                  onClick={handleAddAdmin}
                  className="bg-blue-500 text-white px-4 py-2 rounded-xl text-sm cursor-pointer hover:bg-blue-600 transition"
                >
                  Add Admin
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-2">Notifications</h2>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center gap-2"><Bell className="text-blue-500" size={16}/> New seller registered</li>
              <li className="flex items-center gap-2"><Bell className="text-red-500" size={16}/> User complaint received</li>
              <li className="flex items-center gap-2"><Bell className="text-green-500" size={16}/> 5 shoes listed today</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
