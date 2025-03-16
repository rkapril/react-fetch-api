import { useState, useEffect } from "react";

export default function UserProfile() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //fetch data logic
    fetch(`https://jsonplaceholder.typicode.com/users/1`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Destructure safely
  const { name, email, address } = data ?? {};
  const { city, suite, street } = address ?? {};

  useEffect(() => {
    console.log(name, email, address);
  }, [data]); // Log when data updates

  if (loading) return <p className="px-10 py-5">Loading user data...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="px-10 py-5">
      {name && <p>Name: {name}</p>}
      {email && <p>Email: {email}</p>}
      {address && (
        <p>
          Address: {street} {suite}, {city}
        </p>
      )}
    </div>
  );
}
