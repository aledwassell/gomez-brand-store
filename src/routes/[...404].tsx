import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";

export default function NotFound() {
  return (
    <>
      <Title>Not Found</Title>
      <HttpStatusCode code={404} />
      <div class="flex flex-col gap-5 w-2xs">
        <h1 class="text-7xl font-bold">404</h1>
        <p class="text-right">Not Found</p>
      </div>
    </>
  );
}
