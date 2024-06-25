export async function getFollowRecommends() {
  const res = await fetch(`http://localhost:9090/api/posts/followings`, {
    next: {
      tags: ["users", "followRecommends"],
    },
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
