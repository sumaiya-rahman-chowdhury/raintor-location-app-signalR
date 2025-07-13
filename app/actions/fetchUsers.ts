export const fetchUsers = async ({ pageParam = 0 }) => {
  const res = await fetch(
    `https://tech-test.raintor.com/api/users/GetUsersList?take=10&skip=${pageParam}`
  );
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};
