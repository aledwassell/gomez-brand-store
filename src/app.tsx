import { Meta, MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { ErrorBoundary, onCleanup, onMount, Suspense } from "solid-js";
import "./app.css";
import QuickCart from "./components/QuickCart";
import ComingSoon from "./components/ComingSoon";
import { appTitle } from "./constants/app-title";

export default function App() {
    const showComingSoon = import.meta.env.MODE === "production";

    return (
        <Router
            root={props => (
                <MetaProvider>
                    <Meta name="google-adsense-account" content="ca-pub-4783363180748954" />
                    <Title>{appTitle}</Title>
                    <div class="flex flex-col items-center bg-blue-charcoal-950 min-h-screen text-white">
                        {!showComingSoon && (
                            <header class="flex justify-between items-center">
                                <h1 class="text-white font-bold text-3xl">
                                    IAM<span class="text-amber-500">GOMEZ</span>
                                </h1>
                                <ErrorBoundary fallback={err => err}>
                                    <QuickCart />
                                </ErrorBoundary>
                            </header>
                        )}
                        <Suspense>
                            <main class="flex-1 flex items-center justify-center">
                                {showComingSoon ? <ComingSoon /> : props.children}
                            </main>
                        </Suspense>
                        {!showComingSoon && <footer></footer>}
                    </div>
                </MetaProvider>
            )}
        >
            <FileRoutes />
        </Router>
    );
}
