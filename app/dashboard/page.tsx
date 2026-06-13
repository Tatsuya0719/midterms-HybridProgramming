import React from "react";

export const dynamic = "force-dynamic";

interface DashboardUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface DashboardCart {
  id: number;
  total: number;
}

async function getUsers() {
  const res = await fetch("https://dummyjson.com/users?limit=5", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

async function getCarts() {
  const res = await fetch("https://dummyjson.com/carts?limit=5", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch carts");
  return res.json();
}

export default async function DashboardPage() {
  const usersPromise = getUsers();
  const cartsPromise = getCarts();
  const [userData, cartData] = await Promise.all([usersPromise, cartsPromise]);

  return (
    <div>
      <h1 className="page-title">User Operations Dashboard (SSR)</h1>
      <p className="page-subtitle">Real-time data fetching executed concurrently on each page refresh request.</p>

      <div className="dashboard-grid">
        {/* Users Panel */}
        <div className="dashboard-panel">
          <h2>Recent System Users</h2>
          <ul className="data-list">
            {userData.users.map((user: DashboardUser) => (
              <li key={user.id} className="data-list-item">
                <strong>{user.firstName} {user.lastName}</strong>
                <span className="data-meta">{user.email}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Carts Panel */}
        <div className="dashboard-panel">
          <h2>Active Checkouts</h2>
          <ul className="data-list">
            {cartData.carts.map((cart: DashboardCart) => (
              <li key={cart.id} className="data-list-item">
                <span>Cart #{cart.id}</span>
                <span className="data-price-tag">${cart.total.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}