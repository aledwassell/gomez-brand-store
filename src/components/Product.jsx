import { createSignal } from "solid-js";

function Product(props) {
  const [isHovered, setIsHovered] = createSignal(false);

  return (
    <div
      class="flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={isHovered() ? props.hoverImage : props.defaultImage}
        alt={isHovered() ? "Hovered image" : "Default image"}
        class="lg:w-80 aspect-square cursor-pointer"
      />
      <p class="my-4 w-full flex justify-between">
        {props.name}
        <span class="text-gray-400">${props.price}</span>
      </p>
    </div>
  );
}

export default Product;
