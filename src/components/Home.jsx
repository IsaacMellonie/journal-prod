import React from "react"
import { Link } from 'react-router-dom'

const Home = ({ entries }) => {
    return (
        <>
            <h3>Journal Entries</h3>
            <ul>
                {/* Map over the entries and for each entry we will render JSX which will be a
                list item with a Link component*/}
                {entries.map((entry, index) => (
                    <li key={index}>
                        <Link to={`/entry/${index}`}>{entry.content}</Link>
                    </li>
                    )
                )}
            </ul>
        </>
    )
}

export default Home