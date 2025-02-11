import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../lib/requests";
import Card from "../card/Card";
import "./list.scss";

function PostList() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["allposts"],
    queryFn: getPosts,
  });
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="list">
      {posts.data.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}

export default PostList;
