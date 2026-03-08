
import { Link, Outlet, useParams, useOutletContext } from "react-router-dom";

/**
 * Component for displaying individual director details and their movies.
 * Uses URL params to identify the director and Outlet context for state management.
 * Renders nested movie routes via Outlet.
 */
function DirectorCard() {
    // Extract director ID from URL parameters
    const { id } = useParams()
    // Access shared directors state from parent context
    const { directors } = useOutletContext()
    // Find the specific director by ID
    const director = directors.find(d => d.id === id)

    // Handle case where director is not found
    if (!director) {
        return <h2>Director not found.</h2>
    }

    return (
        <div className="director-card">
            {/* Display director information */}
            <h2>{director.name}</h2>
            <p>{director.bio}</p>
            <h3>Movies:</h3>
            {/* List of movies with links to individual movie pages */}
            <ul className="movie-list">
                {director.movies.map((movie) => (
                <li key={movie.id}>
                    {/* Link to nested movie route */}
                    <Link to={`movies/${movie.id}`}>{movie.title}</Link>
                </li>
                ))}
            </ul>
            {/* Link to add a new movie for this director */}
            <Link to={`movies/new`}>Add New Movie</Link>
            {/* Outlet renders nested movie components (MovieCard, MovieForm) */}
            <Outlet context={{ director, directors, setDirectors: useOutletContext().setDirectors }} />
        </div>
    )
}

export default DirectorCard
