export const updateTicket = async ({
  id,
  status,
}: {
  id: string;
  status: string;
}) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}/api/tickets/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json", // Explicitly set Content-Type
    },
    credentials: "include",
    body: JSON.stringify({ status: status }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to update ticket");
  }

  return response.json();
};
