
import { useParams, useOutletContext } from "react-router-dom"

/**
 * Displays details for a single movie nested under a specific director.
 * Relies on the parent `DirectorCard` to provide the current director via Outlet context.
 */
function MovieCard() {
  // Access the current director object from the nested route context
  const { director } = useOutletContext()
  // Read the dynamic movie ID segment from the URL
  const { movieId } = useParams()

  // If the director is missing, surface a clear error state
  if (!director) return <h2>Director not found.</h2>
  
  // Locate the requested movie in the director's filmography
  const movie = director.movies.find((m) => m.id === movieId)
  if (!movie) return <h2>Movie not found.</h2>

  return (
    <div className="movie-card">
      <h2>{movie.title}</h2>
      <p>⏱️ Duration: {movie.time} minutes</p>
      <p>🎬 Genres: {movie.genres.join(", ")}</p>
    </div>
  )
}

export default MovieCard
