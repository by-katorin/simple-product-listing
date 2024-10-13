import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Show() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useContext(AppContext);

  const [product, setProduct] = useState(null);

  async function getProduct() {
    const res = await fetch(`/api/products/${id}`);
    const data = await res.json();

    if (res.ok) {
      setProduct(data.product);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();

    if (user && user.id === product.user_id) {
      const res = await fetch(`/api/products/${id}`, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/");
      }
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      {product ? (
        <div
          key={product.id}
          className="mt-4 p-4 border rounded-md border-dashed border-slate-400"
        >
          <div className="mb-2 flex items-start justify-between">
            <div>
              <h2 className="font-bold text-2xl">{product.title}</h2>
              <small className="text-xs text-slate-600">
                Created by {product.user.name} on{" "}
                {new Date(product.created_at).toLocaleTimeString()}
              </small>
            </div>
          </div>
          <p>{product.body}</p>

          {user && user.id === product.user_id && (
            <div className="flex items-center justify-end gap-4">
              <Link
                to={`/products/update/${product.id}`}
                className="bg-green-500 text-white text-sm rounded-lg px-3 py-1"
              >
                Update
              </Link>

              <form onSubmit={handleDelete}>
                <button className="bg-red-500 text-white text-sm rounded-lg px-3 py-1">
                  Delete
                </button>
              </form>
            </div>
          )}
        </div>
      ) : (
        <p className="title">Product not found!</p>
      )}
    </>
  );
}
