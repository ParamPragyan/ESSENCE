export function formatDate() {
  var d = new Date();

  return d;
}

export const updateTimeSpent = async (id, timeSpent, notified, date) => {
  const url = `${import.meta.env.VITE_API_END_POINT}/user/${id}`; // Replace this with the real API endpoint
  console.log(id, timeSpent, notified, date);
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ timeSpent, notified, date }),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error();
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

export const getUserStats = async (id) => {
  const url = `${import.meta.env.VITE_API_END_POINT}/user/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("No user Found");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    return { message: err.message, code: 0 };
  }
};
