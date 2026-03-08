import { useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"

/**
 * Form component for adding new directors.
 * Handles form submission, updates global state, and navigates to the new director's page.
 */
function DirectorForm() {
  // Form state for director name and bio
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  // Access setDirectors function from parent context
  const { setDirectors } = useOutletContext()
  // Hook for programmatic navigation
  const navigate = useNavigate()

  /**
   * Handles form submission by posting new director to API,
   * updating local state, and navigating to the director's page.
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    // Create new director object with default movies array
    const newDirector = { name, bio, movies: [] }
    // Post to API
    fetch("http://localhost:4000/directors", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newDirector)
    })
    .then(r => {
        if (!r.ok) { throw new Error("failed to add director")}
        return r.json()
    })
    .then(data => {
        // Update global directors state by adding new director
        setDirectors(prev => [...prev, data])
        // Navigate to the newly created director's page
        navigate(`/directors/${data.id}`)
    })
    .catch(console.log)
  }

  return (
    <div>
      <h2>Add New Director</h2>
      <form onSubmit={handleSubmit}>
        {/* Input for director name */}
        <input
          type="text"
          placeholder="Director's Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {/* Textarea for director bio */}
        <textarea
          placeholder="Director's Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          required
        />
        {/* Submit button */}
        <button type="submit">Add Director</button>
      </form>
    </div>
  )
}

export default DirectorForm
