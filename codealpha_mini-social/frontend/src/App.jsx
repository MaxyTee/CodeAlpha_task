import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./Root/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./Auth/Login";
import { useAuthStore } from "./Store/AuthStore";
import FirstPage from "./pages/FirstPage";
import CreatePost from "./pages/CreatePost";
import PeopleYouMayKnow from "./pages/PeoplePage";
import Profile from "./pages/ProfilePage";
import PersonalProfile from "./pages/PersonalProfilePage";
import MyPosts from "./pages/MyPostPage";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/homePage" replace />;
  }

  return children;
};

function App() {
  // const { isCheckingAuth, checkAuth } = useAuthStore();

  // useEffect(() => {
  //   checkAuth();
  // }, [checkAuth]);

  // if (isCheckingAuth) return <div>Hello...</div>;

  const Router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="homePage"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="create" element={<CreatePost />} />
        <Route path="myPost" element={<MyPosts />} />
        <Route path="peoplePage" element={<PeopleYouMayKnow />} />
        <Route path="PersonalProfile" element={<PersonalProfile />} />
      </Route>
    )
  );
  return (
    <>
      <Toaster />
      <RouterProvider router={Router} />
    </>
  );
}

export default App;
