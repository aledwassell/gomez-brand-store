import { Title } from "@solidjs/meta";
import { Instagram } from "lucide-solid";
import { Motion } from "solid-motionone";
import { createSignal, onMount, For } from "solid-js";

export default function ComingSoon() {
  const [showCursor, setShowCursor] = createSignal(true);
  const titleText = "Coming Soon";
  const letters = titleText.split("");

  // Cursor blinking effect
  onMount(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  });

  return (
    <>
      <Title>Coming Soon - Gomez Brand Store</Title>
      <Motion.div class="flex flex-col items-center justify-center min-h-screen min-w-screen text-center px-4 relative overflow-hidden">
        {/* Floating Particles */}
        <Motion.div
          class="absolute w-2 h-2 bg-white rounded-full opacity-30"
          style={{ top: "20%", left: "10%" }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <Motion.div
          class="absolute w-1 h-1 bg-white rounded-full opacity-40"
          style={{ top: "30%", right: "15%" }}
          animate={{
            y: [15, -15, 15],
            x: [10, -10, 10],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <Motion.div
          class="absolute w-3 h-3 bg-white rounded-full opacity-25"
          style={{ bottom: "25%", left: "20%" }}
          animate={{
            y: [10, -25, 10],
            opacity: [0.25, 0.7, 0.25],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <Motion.div
          class="absolute w-3 h-3 bg-white rounded-full opacity-25"
          style={{ bottom: "45%", left: "70%" }}
          animate={{
            y: [15, -75, 40],
            x: [15, -35, 10],
            opacity: [0.25, 0.7, 0.25],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <Motion.div
          class="max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Staggered Title */}
          <div
            class="flex justify-center items-center mb-8"
            style="perspective: 1000px"
          >
            <For each={letters}>
              {(letter, index) => (
                <Motion.span
                  class="text-4xl lg:text-6xl font-black text-white tracking-tight uppercase inline-block"
                  initial={{
                    opacity: 0,
                    y: 100,
                    rotateX: -90,
                    scale: 0.5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: index() * 0.1 + 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  style="transform-origin: bottom center"
                >
                  {letter === " " ? "\u00A0" : letter}
                </Motion.span>
              )}
            </For>

            {/* Animated Cursor */}
            <Motion.span
              class="text-4xl lg:text-6xl font-black text-white ml-2"
              animate={{ opacity: showCursor() ? 1 : 0 }}
              transition={{ duration: 0.1 }}
            >
              |
            </Motion.span>
          </div>

          {/* Animated Divider */}
          <Motion.div
            class="h-1 bg-white mx-auto mb-8"
            initial={{ width: 0, scaleY: 0 }}
            animate={{
              width: "6rem",
              scaleY: [0, 1, 1.5, 1],
            }}
            transition={{
              delay: 2.5,
              duration: 1.2,
              ease: [0.68, -0.55, 0.265, 1.55],
            }}
          />

          {/* Main Description */}
          <Motion.p
            class="text-xl text-gray-300 mb-8 leading-tight font-medium"
            initial={{
              opacity: 0,
              y: 30,
              clipPath: "inset(0 100% 0 0)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              clipPath: "inset(0 0% 0 0)",
            }}
            transition={{
              delay: 3.2,
              duration: 1,
              ease: "easeOut",
            }}
          >
            Our store is under construction and will be launching soon!
          </Motion.p>

          <div class="space-y-6">
            {/* Sub Text */}
            <Motion.p
              class="text-lg text-gray-400 font-light"
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: [0.9, 1.05, 1],
              }}
              transition={{
                delay: 4,
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              Stay tuned for updates and be the first to know when we launch.
            </Motion.p>

            {/* Instagram Button */}
            <Motion.div class="mt-12">
              <Motion.a
                href="https://www.instagram.com/iamgomez_theblackandwhitecat?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center lg:space-x-2 text-white px-6 py-3 hover:bg-white hover:text-black transition-colors duration-600 font-bold uppercase tracking-wide"
                initial={{
                  opacity: 0,
                  y: 20,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: [0.9, 1.05, 1],
                }}
                transition={{
                  delay: 4.5,
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <Instagram class="hidden lg:block" />
                <Instagram class="lg:hidden" size={72} />
                <span class="hidden lg:block">
                  Follow @iamgomez_theblackandwhitecat
                </span>
              </Motion.a>
            </Motion.div>
          </div>
        </Motion.div>

        {/* Background Orbs */}
        <Motion.div
          class="absolute w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none"
          style={{
            background: "radial-gradient(circle, white 0%, transparent 70%)",
            top: "-10%",
            left: "-10%",
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -30, 40, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <Motion.div
          class="absolute w-80 h-80 rounded-full opacity-5 blur-3xl pointer-events-none"
          style={{
            background: "radial-gradient(circle, white 0%, transparent 70%)",
            bottom: "-10%",
            right: "-10%",
          }}
          animate={{
            x: [0, -40, 20, 0],
            y: [0, 30, -20, 0],
            scale: [1, 0.8, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </Motion.div>
    </>
  );
}
