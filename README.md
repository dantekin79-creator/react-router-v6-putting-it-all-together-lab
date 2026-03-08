# React Router v6 Movie Directory Lab

## Lab Overview
This completed Movie Directory application showcases the implementation of React Router v6 with nested routing, programmatic navigation, and state management. The application allows users to:

* View a curated list of directors in a responsive grid layout.
* Add new directors with name and bio.
* Click on a director to see their detailed profile and list of movies.
* Click on a movie to view its specific details (duration, genres).
* Add new movies to a director's filmography and automatically navigate to the movie's detail page.
* Navigate seamlessly between pages with active link highlighting.
* Handle invalid routes with a custom 404 error page.

![Completed Movie Directory Application](public/Screenshot%202026-03-08%20214118.png)

## Completed Implementation

All components and routing functionality have been successfully implemented:

1. **React Router v6 Setup**: Installed and configured with BrowserRouter, Routes, and Route components.
2. **Nested Routing Structure**: Implemented hierarchical routes for directors and their movies.
3. **Outlet Context Sharing**: Used useOutletContext to pass state between parent and child routes without prop drilling.
4. **Navigation Components**: Implemented NavLink for main navigation and Link for internal page links.
5. **Programmatic Navigation**: Used useNavigate hook for automatic redirects after form submissions.
6. **Modern Styling**: Added responsive CSS with gradient backgrounds, card layouts, and hover effects.
7. **Error Handling**: Created a 404 page for invalid routes.

## Application Structure

### Routing Hierarchy
```
/ : Home
/about : About
/directors : DirectorContainer
    / : DirectorList (index route)
    /new : DirectorForm
    /:id : DirectorCard
        /movies/new : MovieForm
        /movies/:movieId : MovieCard
* : ErrorPage (404)
```

### Key Components

- **App.jsx**: Central routing configuration with nested routes
- **DirectorContainer**: Manages directors state and provides context to children
- **DirectorCard**: Displays director details and nests movie routes
- **DirectorForm/MovieForm**: Handle creation with programmatic navigation
- **DirectorList**: Responsive grid of director cards
- **MovieCard**: Individual movie details
- **NavBar**: Navigation with active link styling

## Technologies Used

- React 18
- React Router v6
- Vite (build tool)
- JSON Server (mock API)
- Vitest (testing)
- CSS3 with modern features

## Setup Instructions

1. Install dependencies: `npm install`
2. Start JSON server: `npm run server`
3. Start dev server: `npm run dev`
4. Run tests: `npm run test`

## Features Demonstrated

- Client-side routing with React Router v6
- Nested routes and outlet rendering
- Context sharing between routes
- Programmatic navigation
- Responsive design
- Form handling with API integration
- Error boundary handling

The application successfully demonstrates advanced React Router patterns and provides a polished user experience for browsing and managing a movie director database.
