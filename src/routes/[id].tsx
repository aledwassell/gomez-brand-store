import { createResource, Show } from "solid-js";
import { useParams } from "@solidjs/router";
import { Title } from "@solidjs/meta";

async function fetchProduct(id: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return response.json();
}

export default function Product() {
  const params = useParams();
  const [data] = createResource(() => params.id, fetchProduct);

  return (
    <>
      <Title>{params.id}</Title>
      <div class="flex flex-col justify-center items-center text-white">
        <h1 class="font-bold">Product ID: [{params.id}]</h1>
        <Show when={!data.loading} fallback={<p>Loading...</p>}>
          <div>
            <p>Name: {data().name}</p>
            <p>Email: {data().email}</p>
            <p>Phone: {data().phone}</p>
          </div>
        </Show>
      </div>
    </>
  );
}
