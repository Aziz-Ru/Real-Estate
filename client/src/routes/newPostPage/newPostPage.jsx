import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { addPost } from "../../lib/requests";
import { supabase } from "../../lib/supabase";
import "./newPostPage.scss";

function NewPostPage() {
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);
  const formRef = useRef(null);
  const [images, setImages] = useState([]);
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["newPost"],
    mutationFn: addPost,
    onError: (error) => {
      console.log(error.response.data.errors);
      setError(error.response.data.errors.message);
    },
    onSuccess: () => {
      formRef.current.reset();
      setImages([]);
      // navigate("/profile");
    },
  });
  const uploadImage = async () => {
    const uploads = images.map(async (image) => {
      const fileName = `images/${new Date()}-${image.file.name}`;
      const { error } = await supabase.storage
        .from("sms")
        .upload(fileName, image.file);
      if (error) throw error;
      const { data } = await supabase.storage
        .from("sms")
        .getPublicUrl(fileName);

      return data.publicUrl;
    });

    const uploadPaths = await Promise.all(uploads);
    return uploadPaths;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const imagePaths = await uploadImage();
    // console.log({ ...data, description: value, img: imagePaths });
    await mutateAsync({
      ...data,
      description: value,
      img: imagePaths,
      price: parseInt(data.price),
      bedroom: parseInt(data.bedroom),
      bathroom: parseInt(data.bathroom),
      size: parseInt(data.size),
      school: parseInt(data.school),
      bus: parseInt(data.bus),
      restaurant: parseInt(data.restaurant),
      latitude: parseFloat(data.latitude),
      longitude: parseFloat(data.longitude),
    });
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <p>{error}</p>
        <div className="wrapper">
          <form ref={formRef} method="post" onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                required
                placeholder="Title"
              />
            </div>

            <div className="item">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                name="price"
                type="number"
                required
                min={1}
                placeholder="Price"
              />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                name="address"
                type="text"
                required
                placeholder="Address"
              />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill
                onChange={(e) => setValue(e.target.value)}
                value={value}
              />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                type="text"
                required
                placeholder="City"
              />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input
                min={1}
                id="bedroom"
                name="bedroom"
                type="number"
                required
                placeholder="Bedroom Number"
              />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input
                min={1}
                id="bathroom"
                name="bathroom"
                type="number"
                placeholder="BathRoom Number"
              />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input
                id="latitude"
                name="latitude"
                type="text"
                required
                placeholder="Latitude"
              />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input
                id="longitude"
                name="longitude"
                type="text"
                required
                placeholder="Longitude"
              />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type">
                <option value="RENT" defaultChecked>
                  Rent
                </option>
                <option value="SALE">Sale</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Property</label>
              <select name="propertyType">
                <option value="APARTMENT">Apartment</option>
                <option value="HOUSE">House</option>
                <option value="COMMERCIAL">Commercial</option>
                <option value="LAND">Land</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="utility">Utilities Policy</label>
              <select name="utility">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="petPolicy">Pet Policy</label>
              <select name="petPolicy">
                <option value="YES">Allowed</option>
                <option value="NO">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="parking">Income Policy</label>
              <select name="parking">
                <option value="YES">Available</option>
                <option value="NO">Not Available</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" />
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input min={0} id="school" name="school" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bus">bus</label>
              <input min={0} id="bus" name="bus" type="number" />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input min={0} id="restaurant" name="restaurant" type="number" />
            </div>
            <button className="sendButton" disabled={isPending}>
              {isPending ? "Loading..." : "Add"}
            </button>
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.length > 0 && (
          <div className="">
            {images.map((image, index) => (
              <img key={index} src={image.url} alt="" />
            ))}
          </div>
        )}
        <h1>Upload Image</h1>
        <input
          type="file"
          onChange={(e) => {
            const fl = e.target.files[0];
            if (
              (fl.type == "image/jpeg" || fl.type == "image/png") &&
              fl.size < 1000000 &&
              images.length < 6
            ) {
              setImages([
                ...images,
                {
                  file: e.target.files[0],
                  url: URL.createObjectURL(e.target.files[0]),
                },
              ]);
            }
          }}
        />
      </div>
    </div>
  );
}

export default NewPostPage;
