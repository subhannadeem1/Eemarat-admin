import { useState } from "react";
import upload_area from "../assets/upload_area.svg";
import toast, { LoaderIcon } from "react-hot-toast";
import { backend_url } from "./Navbar";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState();
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "",
    new_price: "",
    aGradePrice: "",
    bGradePrice: "",
    brand: "",
    unit: "",
    description: "",
    size: "",
  });

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const imagehandler = (e) => {
    imagesHandler(e);
    setImage(e.target.files[0]);
  };

  const imagesHandler = (e) => {
    if (e.target.files.length > 0) {
      setFiles("");

      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          if (reader.result) {
            setFiles(reader.result);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const Add_Product = async () => {
    if (
      productDetails.name === "" ||
      productDetails.category === "" ||
      productDetails.new_price === "" ||
      productDetails.aGradePrice === "" ||
      productDetails.bGradePrice === "" ||
      productDetails.brand === "" ||
      productDetails.unit === "" ||
      productDetails.description === "" ||
      productDetails.size === ""
    ) {
      return toast.error("Please fill all the fields");
    }
    // console.log(productDetails)
    let responseData;
    let product = productDetails;

    const formData = new FormData();
    formData.append("product", files);

    setIsLoading(true);

    await fetch(backend_url + "/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });
    if (responseData.success) {
      product.image = responseData.image_url;

      await fetch(backend_url + "/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          setIsLoading(false);
          data.success
            ? toast.success("Product Uploaded Successful")
            : toast.error("Upload Failed");

          setProductDetails({
            name: "",
            image: "",
            category: "",
            new_price: "",
            aGradePrice: "",
            bGradePrice: "",
            brand: "",
            unit: "",
            description: "",
            size: "",
          });
        });
    }
  };

  return (
    <div className="p-8 box-border bg-white w-full rounded-sm mt-5 lg:ml-5">
      <div className="mb-3">
        <h4 className="bold-18 pb-2">Product Name:</h4>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here.."
          className="bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md"
        />
      </div>
      <div className="mb-3">
        <h4 className="bold-18 pb-2">Price A+ Grad:</h4>
        <input
          value={productDetails.new_price}
          onChange={changeHandler}
          type="number"
          name="new_price"
          placeholder="Type here.."
          className="bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md"
        />
      </div>
      <div className="mb-3">
        <h4 className="bold-18 pb-2">Price A Grad:</h4>
        <input
          value={productDetails.aGradePrice}
          onChange={changeHandler}
          type="number"
          name="aGradePrice"
          placeholder="Type here.."
          className="bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md"
        />
      </div>
      <div className="mb-3">
        <h4 className="bold-18 pb-2">Price B Grad:</h4>
        <input
          value={productDetails.bGradePrice}
          onChange={changeHandler}
          type="number"
          name="bGradePrice"
          placeholder="Type here.."
          className="bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md"
        />
      </div>
      <div className="mb-3">
        <h4 className="bold-18 pb-2">Brand:</h4>
        <input
          value={productDetails.brand}
          onChange={changeHandler}
          type="text"
          name="brand"
          placeholder="Type here.."
          className="bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md"
        />
      </div>

      <div className="mb-3">
        <h4 className="bold-18 pb-2">Unit:</h4>
        <select
          value={productDetails.unit}
          onChange={changeHandler}
          type="text"
          name="unit"
          placeholder="Type here.."
          className="bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md"
        >
          <option value="">select</option>
          <option value="kg">kg</option>
          <option value="Sft">Sft</option>
          <option value="Item">Per item</option>
        </select>
      </div>

      <div className="mb-3">
        <h4 className="bold-18 pb-2">Description:</h4>
        <input
          value={productDetails.description}
          onChange={changeHandler}
          type="text"
          name="description"
          placeholder="Type here.."
          className="bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md"
        />
      </div>

      <div className="mb-3">
        <h4 className="bold-18 pb-2">Size:</h4>
        <input
          value={productDetails.size}
          onChange={changeHandler}
          type="text"
          name="size"
          placeholder="Type here.."
          className="bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md"
        />
      </div>

      <div className="mb-3 flex items-center gap-x-4">
        <h4>Product Category:</h4>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          id=""
          className="bg-primary ring-1 ring-slate-900/20 medium-16 rounded-sm outline-none"
        >
          <option value="">SELECT CATEGORY</option>
          <option value="Gray Structure">Gray Structure</option>
          <option value="Electrical Material">Electrical Material</option>
          <option value="Plumbing Material">Plumbing Material</option>
        </select>
      </div>
      <div>
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            alt=""
            className="w-20 rounded-sm inline-block"
          />
        </label>
        <input
          onChange={imagehandler}
          type="file"
          name="image"
          id="file-input"
          hidden
          className="bg-primary max-w-80 w-full py-3 px-4"
        />
      </div>
      <button
        disabled={isLoading}
        onClick={() => {
          Add_Product();
        }}
        className="btn-dark rounded-lg mt-4 flexCenter gap-x-1"
      >
        {isLoading ? <LoaderIcon /> : "Add Product"}
      </button>
    </div>
  );
};

export default AddProduct;
