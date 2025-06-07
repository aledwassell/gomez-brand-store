import { Title } from "@solidjs/meta";

export default function Lab() {
  return (
    <>
      <Title>Lab Page</Title>
      <button
        class="bg-amber-400 p-6 text-black"
        onClick={() => {
          console.log(import.meta.env);
        }}
      >
        log env
      </button>
    </>
  );
}
