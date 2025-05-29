import { createResource } from "solid-js";
import { useParams } from "@solidjs/router";

async function fetchProduct(id) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return response.json();
}

function Product() {
  const params = useParams();
  const [data] = createResource(() => params.id, fetchProduct); // Pass the id parameter to createResource

  return (
    <div class="flex justify-center items-center text-white">
      [{params.id}]
      <Show when={!data.loading} fallback={<p>Loading...</p>}>
        <div>
          <p>Name: {data().name}</p>
          <p>Email: {data().email}</p>
          <p>Phone: {data().phone}</p>
        </div>
      </Show>
    </div>
  );
}

export default Product;
