import { useNavigate } from "react-router-dom";

export default function useAccessDbHook() {
  const navigate = useNavigate();

  function useAccessDb(updatedData, url, method, authenticatedUserToken, nextPath) {
    // console.log(`accessDb -- method: ${method}`);
    const request = new Request(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${authenticatedUserToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    fetch(request)
      .then((res) => {
        if (res.status === 401) throw new Error("Unauthorized access to API.");
        if (!res.ok) throw new Error("Failed to update person data in database");
        // console.log(`${method} was successful`);
      })
      .then(() => {
        // console.log("navigating");
        navigate(nextPath);
      })
      .catch(console.warn);
  }

  return useAccessDb;
}
