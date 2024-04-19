import { Breadcrumb } from "@/components/UI/breadcrumbs/breadcrumbs";
import { CommentType, PostDetailType } from "@/lib/utils/post-type";
import { UserType } from "@/lib/utils/user-type";
import axios from "axios";

async function getPostByUserId(detail: string): Promise<PostDetailType | null> {
  try {
    const response = await axios.get<PostDetailType>(
      `https://jsonplaceholder.typicode.com/posts/${detail}`
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

async function getCommentByPostId(
  detail: string
): Promise<CommentType[] | null> {
  try {
    const response = await axios.get<CommentType[]>(
      `https://jsonplaceholder.typicode.com/posts/${detail}/comments`
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

export default async function PostDetailPage({
  params,
}: {
  params: { detail: string };
}) {
  const detailId = params.detail;
  const [postDetail, user, comments] = await Promise.all([
    getPostByUserId(detailId),
    getPostByUserId(detailId).then((post) =>
      getUserById(post?.userId?.toString() || "")
    ),
    getCommentByPostId(detailId),
  ]);

  return (
    <main className="flex min-h-screen text-black flex-col items-center p-24 bg-gray-50">
      <div className="w-full my-8 justify-start items-start ">
        <Breadcrumb
          customPaths={[
            { label: "List User", path: "/users" },
            { label: `${user?.name}`, path: `/users/${user?.id}` },
            { label: `${postDetail?.title}`, path: "" },
          ]}
          className="hidden md:block pt-4 md:pt-0"
        />
      </div>
      {/* Post Section */}
      <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          {postDetail?.title}
        </h1>
        <p className="text-lg text-gray-800 leading-relaxed">
          {postDetail?.body}
        </p>
        <div className="mt-6 flex justify-end">
          <button className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
            Delete Post
          </button>
        </div>
        {/* Comment section */}
        <div className="container mx-auto mt-12 px-8 py-6 bg-white rounded-lg">
          <h2 className="text-2xl font-bold text-black mb-6">Comments</h2>

          <ul className="divide-y divide-gray-200">
            {comments?.map((comment, index) => (
              <li key={index} className="py-4">
                <div className="flex items-center mb-2">
                  <div>
                    <h3 className="text-lg font-semibold">{comment.name}</h3>
                    <p className="text-gray-500 text-sm">{comment.email}</p>
                  </div>
                </div>

                <p className="text-gray-800">{comment.body}</p>
              </li>
            ))}
          </ul>

          {/* Comment form */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Leave a Comment</h3>

            <form className="space-y-4">
              <div>
                <label
                  htmlFor="commentName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="commentName"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>

              <div>
                <label
                  htmlFor="commentEmail"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="commentEmail"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>

              <div>
                <label
                  htmlFor="commentBody"
                  className="block text-sm font-medium text-gray-700"
                >
                  Comment
                </label>
                <textarea
                  id="commentBody"
                  rows={4}
                  className="mt-1 p-2 w-full border rounded-md"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
