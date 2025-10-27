import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Search = lazy(() => import("./pages/Search"));
const Experiences = lazy(() => import("./pages/Experiences"));
const Bookings = lazy(() => import("./pages/Bookings"));
const Profile = lazy(() => import("./pages/Profile"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const AccommodationDetail = lazy(() => import("./pages/AccommodationDetail"));
const Booking = lazy(() => import("./pages/Booking"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminBookings = lazy(() => import("./pages/admin/AdminBookings"));
const AdminRooms = lazy(() => import("./pages/admin/AdminRooms"));
const AdminContent = lazy(() => import("./pages/admin/AdminContent"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Contact = lazy(() => import("./pages/Contact"));
const Sustainability = lazy(() => import("./pages/Sustainability"));
const CulturalHeritage = lazy(() => import("./pages/CulturalHeritage"));
const Settings = lazy(() => import("./pages/Settings"));
const Help = lazy(() => import("./pages/Help"));
const LocalArea = lazy(() => import("./pages/LocalArea"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="space-y-4 w-full max-w-md px-4">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ErrorBoundary>
          <AuthProvider>
            <Suspense fallback={<PageLoader />}>
              <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/search" element={<Search />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/accommodation/:id" element={<AccommodationDetail />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/cultural-heritage" element={<CulturalHeritage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
            <Route path="/local-area" element={<LocalArea />} />
            
            {/* Protected Routes */}
            <Route
              path="/bookings"
              element={
                <ProtectedRoute>
                  <Bookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            
            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/bookings"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminBookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/rooms"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminRooms />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/content"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminContent />
                </ProtectedRoute>
              }
            />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </AuthProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
