import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { journalContext } from '../reducer'

const CategorySelection = ({ categories }) => {

    const state = useContext(journalContext)
    
    return (
        <>
            <h3>Please select a category:</h3>
            <ul>
                {
                    categories.map((cat, index) => (
                        <li key={index}>
                            <Link to={`/entry/new/${index}`}>{cat.name}</Link>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

export default CategorySelection