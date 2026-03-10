import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import DirectorContainer from "./pages/DirectorContainer"
import DirectorCard from "./pages/DirectorCard"
import DirectorForm from "./pages/DirectorForm"
import MovieCard from "./pages/MovieCard"
import MovieForm from "./pages/MovieForm"
import DirectorList from "./pages/DirectorList"
import About from "./pages/About"
import ErrorPage from "./pages/ErrorPage"

/**
 * Main App component that defines the routing structure for the Movie Directory application.
 * Uses React Router v6 for client-side routing with nested routes.
 */
const App = () => {
    return (
        <BrowserRouter>
            {/* Routes component wraps all route definitions */}
            <Routes>
                {/* Root route renders the Home page */}
                <Route path="/" element={<Home />} />

                {/* Directors section with nested routes */}
                <Route path="/directors" element={<DirectorContainer />}>
                    {/* Index route shows the list of directors */}
                    <Route index element={<DirectorList />} />
                    {/* Route for adding a new director */}
                    <Route path="new" element={<DirectorForm />} />
                    {/* Nested routes for individual directors and their movies */}
                    <Route path=":id" element={<DirectorCard />}>
                        {/* Route for viewing a specific movie */}
                        <Route path="movies/:movieId" element={<MovieCard />} />
                        {/* Route for adding a new movie to a director */}
                        <Route path="movies/new" element={<MovieForm />} />
                    </Route>
                </Route>

                {/* Static routes for About and 404 error page */}
                <Route path="/about" element={<About />} />
                {/* Catch-all route for invalid URLs */}
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
