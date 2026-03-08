import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

/**
 * Container component for the directors section.
 * Manages the global state for directors and provides it to child components via Outlet context.
 * Fetches directors data from the JSON server on mount.
 */
const DirectorContainer = () => {
    // State to hold the array of directors fetched from the API
    const [directors, setDirectors] = useState([])

    // Fetch directors data when component mounts
    useEffect(() => {
        fetch("http://localhost:4000/directors")
        .then(r => {
            if (!r.ok) { throw new Error("failed to fetch directors") }
            return r.json()
        })
        .then(setDirectors) // Update state with fetched data
        .catch(console.log) // Log any errors to console
    }, []) // Empty dependency array means this runs once on mount

    return (
        <>
            {/* Navigation bar shared across the app */}
            <NavBar />
            <main>
                {/* Page title */}
                <h1>Welcome to the Director's Directory!</h1>
                {/* Outlet renders child routes and passes directors state as context */}
                {/* This allows nested components to access and modify the directors list */}
                <Outlet context={{ directors, setDirectors }} />
            </main>
        </>
    );
}

export default DirectorContainer;
