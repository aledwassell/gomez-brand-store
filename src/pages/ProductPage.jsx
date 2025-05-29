import { useParams } from "@solidjs/router";

function ProductPage() {
  const params = useParams();
  return (
    <div class="h-screen w-screen flex justify-center items-center text-white">
      [{params.id}]
    </div>
  );
}

export default ProductPage;
