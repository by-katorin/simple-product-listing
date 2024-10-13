import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

export default function Update() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useContext(AppContext);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const [errors, setErrors] = useState({});

  async function getProduct() {
    const res = await fetch(`/api/products/${id}`);
    const data = await res.json();

    if (res.ok) {
      if (data.product.user_id !== user.id) {
        navigate("/");
      }

      setFormData({
        title: data.product.title,
        body: data.product.body,
      });
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();

    const res = await fetch(`/api/products/${id}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      navigate("/");
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <h1 className="title">Update Product</h1>

      <form onSubmit={handleUpdate} className="w-1/2 mx-auto space-y-6">
        <div>
          <input
            type="text"
            placeholder="Product Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          {errors.title && <p className="error">{errors.title[0]}</p>}
        </div>

        <div>
          <textarea
            rows="6"
            placeholder="Product Content"
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          ></textarea>
          {errors.body && <p className="error">{errors.body[0]}</p>}
        </div>

        <button className="primary-btn">Update</button>
      </form>
    </>
  );
}
