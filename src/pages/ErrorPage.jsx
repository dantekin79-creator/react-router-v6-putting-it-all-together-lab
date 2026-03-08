import { Link } from "react-router-dom"

function ErrorPage() {
  return (
    <div className="error-page">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/">Go Home</Link>
    </div>
  )
}

export default ErrorPage
