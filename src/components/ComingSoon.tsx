import { Title } from "@solidjs/meta";
import { Instagram } from "lucide-solid";

export default function ComingSoon() {
  return (
    <>
      <Title>Coming Soon - Gomez Brand Store</Title>
      <div class="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <div class="max-w-2xl">
          <h1 class="text-6xl font-black mb-8 text-white tracking-tight uppercase">
            Coming Soon
          </h1>
          <div class="h-1 w-24 bg-white mx-auto mb-8"></div>
          <p class="text-xl text-gray-300 mb-8 leading-tight font-medium">
            Our store is under construction and will be launching soon!
          </p>
          <div class="space-y-6">
            <p class="text-lg text-gray-400 font-light">
              Stay tuned for updates and be the first to know when we launch.
            </p>
            <div class="mt-12">
              <a
                href="https://www.instagram.com/iamgomez_theblackandwhitecat?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center space-x-2 text-white px-6 py-3 hover:bg-white hover:text-black transition-colors duration-200 font-bold uppercase tracking-wide"
              >
                <Instagram />
                <span>Follow @iamgomez_theblackandwhitecat</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
