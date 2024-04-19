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

async function getPostsByUserId(id: string) {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}/posts`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

async function getAlbumsByUserId(id: string) {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}/albums`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching albums:", error);
    return [];
  }
}

export default async function UsersPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUserById(params.id);
  const posts = await getPostsByUserId(params.id);
  const albums = await getAlbumsByUserId(params.id);

  return (
    <main className="flex min-h-screen text-black flex-col items-center justify-between p-24 bg-gray-50">
      <div className="container mx-auto p-8 bg-white rounded-lg shadow-md">
        {/* personal information */}
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 border-b-4 border-gray-300 pb-2">
          {user?.name}
        </h1>
        <div className="bg-gray-100 p-8 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                Personal Information
              </h2>
              <p className="mb-2">
                <span className="font-semibold text-gray-600">Name:</span>{" "}
                {user?.name}
              </p>
              <p className="mb-2">
                <span className="font-semibold text-gray-600">Email:</span>{" "}
                {user?.email}
              </p>
              <p className="mb-2">
                <span className="font-semibold text-gray-600">Phone:</span>{" "}
                {user?.phone}
              </p>
              <p className="mb-2">
                <span className="font-semibold text-gray-600">Website:</span>{" "}
                {user?.website}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                Company & Address
              </h2>
              <p className="mb-2">
                <span className="font-semibold text-gray-600">Company:</span>{" "}
                {user?.company?.name}
              </p>
              <p className="mb-2">
                <span className="font-semibold text-gray-600">Address:</span>{" "}
                {user?.address?.suite}, {user?.address?.street},{" "}
                {user?.address?.city}
              </p>
            </div>
          </div>
        </div>
        {/* posts section */}
        <div className="bg-gray-100 p-8 rounded-lg shadow-md mt-8">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800 border-b-4 border-gray-300 pb-2">
            Posts
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {posts.map((post: any) => (
              <li
                key={post.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300"
              >
                <h3 className="text-xl font-semibold mb-4 text-blue-600">
                  {post.title}
                </h3>
                <p className="text-gray-600">{post.body}</p>
                <div className="flex justify-end mt-4">
                  <a
                    href={`https://jsonplaceholder.typicode.com/posts/${post.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 transition duration-300"
                  >
                    Read More
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Albums Section */}
        <div className="bg-gray-100 p-8 rounded-lg shadow-md mt-8">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800 border-b-4 border-gray-300 pb-2">
            Albums
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {albums.map((album: any) => (
              <li
                key={album.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                  {album.title}
                </h3>
                <div className="flex justify-end mt-4">
                  <a
                    href={`https://jsonplaceholder.typicode.com/albums/${album.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700 transition duration-300"
                  >
                    View Album
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>{" "}
      </div>
    </main>
  );
}
