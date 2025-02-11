import Card from "../../components/card/Card";
import Filter from "../../components/filter/Filter";
import Map from "../../components/map/Map";
import "./listPage.scss";

function ListPage() {
  // const { data: posts } = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: getPosts,
  // });

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          {posts.data.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="mapContainer">
        <Map items={posts.data} />
      </div>
    </div>
  );
}

export default ListPage;
