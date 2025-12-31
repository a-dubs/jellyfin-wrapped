import "@radix-ui/themes/styles.css";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SplashPage from "./components/pages/SplashPage";
import ServerConfigurationPage from "./components/pages/ServerConfigurationPage";
import Navigation from "./components/Navigation";
import StoryModePage from "./components/pages/StoryModePage";
import "./styles/toast.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
    },
  },
});

// Layout component that wraps all routes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}

function RootLayout() {
  return (
    <ErrorBoundary
      fallback={({ error }: { error: Error }) => (
        <div>Something went wrong: {error.message}</div>
      )}
    >
      <ScrollToTop />
      <QueryClientProvider client={queryClient}>
        <Theme>
          <Navigation />
          <Outlet />
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: "var(--bg-elevated)",
                color: "var(--text-primary)",
                border: "2px solid var(--accent-gold)",
              },
              success: {
                iconTheme: {
                  primary: "var(--accent-gold)",
                  secondary: "var(--bg-elevated)",
                },
              },
              error: {
                iconTheme: {
                  primary: "var(--accent-coral)",
                  secondary: "var(--bg-elevated)",
                },
              },
            }}
          />
        </Theme>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <SplashPage />,
      },
      {
        path: "/configure",
        element: <ServerConfigurationPage />,
      },
      {
        path: "/story",
        element: <StoryModePage />,
      },
      // Legacy route redirects - redirect old pages to story mode
      {
        path: "/loading",
        element: <Navigate to="/story" replace />,
      },
      {
        path: "/movies",
        element: <Navigate to="/story" replace />,
      },
      {
        path: "/oldest-show",
        element: <Navigate to="/story" replace />,
      },
      {
        path: "/oldest-movie",
        element: <Navigate to="/story" replace />,
      },
      {
        path: "/shows",
        element: <Navigate to="/story" replace />,
      },
      {
        path: "/tv",
        element: <Navigate to="/story" replace />,
      },
      {
        path: "/audio",
        element: <Navigate to="/story" replace />,
      },
      {
        path: "/critically-acclaimed",
        element: <Navigate to="/story" replace />,
      },
      {
        path: "/actors",
        element: <Navigate to="/story" replace />,
      },
      {
        path: "/music-videos",
        element: <Navigate to="/story" replace />,
      },
      {
        path: "/genres",
        element: <Navigate to="/story" replace />,
      },
      {
        path: "/minutes-per-day",
        element: <Navigate to="/story" replace />,
      },
      {
        path: "/show-of-the-month",
        element: <Navigate to="/story" replace />,
      },
      {
        path: "/unfinished-shows",
        element: <Navigate to="/story" replace />,
      },
      {
        path: "/device-stats",
        element: <Navigate to="/story" replace />,
      },
      {
        path: "/punch-card",
        element: <Navigate to="/story" replace />,
      },
      {
        path: "/TopTen",
        element: <Navigate to="/story" replace />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
