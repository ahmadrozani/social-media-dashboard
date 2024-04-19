import { UserType } from "@/lib/utils/user-type";
import axios from "axios";

async function getUserById(id: string): Promise<UserType | null> {
  try {
    const response = await axios.get<UserType>(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export default async function UserDetail({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUserById(params.id);

  return (
    <main className="flex min-h-screen text-black flex-col items-center justify-between p-24 bg-gray-100">
      <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">User Detail</h1>
        <div className="bg-gray-200 p-8 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">
                Personal Information
              </h2>
              <p className="mb-2">
                <span className="font-semibold">Name:</span> {user?.name}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Email:</span> {user?.email}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Phone:</span> {user?.phone}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Website:</span> {user?.website}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Company & Address</h2>
              <p className="mb-2">
                <span className="font-semibold">Company:</span>{" "}
                {user?.company?.name}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Address:</span>{" "}
                {user?.address?.suite}, {user?.address?.street},{" "}
                {user?.address?.city}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
