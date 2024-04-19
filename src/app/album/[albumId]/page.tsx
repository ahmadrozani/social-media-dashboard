import { Breadcrumb } from "@/components/UI/breadcrumbs/breadcrumbs";
import { AlbumPhotosType, AlbumType } from "@/lib/utils/album-type";
import { CommentType, PostDetailType } from "@/lib/utils/post-type";
import { UserType } from "@/lib/utils/user-type";
import axios from "axios";
import Image from "next/image";

async function getAlbumDetailByUserId(
  detail: string
): Promise<AlbumType | null> {
  try {
    const response = await axios.get<AlbumType>(
      `https://jsonplaceholder.typicode.com/albums/${detail}`
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

async function getPhotosByAlbumId(
  detail: string
): Promise<AlbumPhotosType[] | null> {
  try {
    const response = await axios.get<AlbumPhotosType[]>(
      `https://jsonplaceholder.typicode.com/albums/${detail}/photos`
    );
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return null;
  }
}

export default async function AlbumDetailPage({
  params,
}: {
  params: { albumId: string };
}) {
  const detailId = params.albumId;
  const [albumDetail, user, photos] = await Promise.all([
    getAlbumDetailByUserId(detailId),
    getAlbumDetailByUserId(detailId).then((album) =>
      getUserById(album?.userId.toString() || "")
    ),
    getPhotosByAlbumId(detailId),
  ]);

  return (
    <main className="flex min-h-screen text-black flex-col items-center p-24 bg-gray-50">
      <div className="w-full my-8 justify-start items-start ">
        <Breadcrumb
          customPaths={[
            { label: "List User", path: "/users" },
            { label: `${user?.name}`, path: `/users/${user?.id}` },
            { label: `${albumDetail?.title}`, path: "" },
          ]}
          className="hidden md:block pt-4 md:pt-0"
        />
      </div>
      {/* Album Section */}
      <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-blue-600 mb-6">
            {albumDetail?.title}
          </h1>
          <div className="my-6 flex justify-end">
            <button className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
              Delete Album
            </button>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-600 mb-4">Photos</h2>
        {/* photos section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos?.map((photo, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={photo.thumbnailUrl}
                  alt={photo.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600">{photo.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
