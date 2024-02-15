import { useContext } from "react"
import { Link } from 'react-router-dom'
import { journalContext } from '../reducer'




const Home = () => {
    const state = useContext(journalContext)

    return (
        <>
            <h3>Journal Entries</h3>
            <ul>
                {/* Map over the entries and for each entry we will render JSX which will be a
                list item with a Link component*/}
                {state.entries.map((entry, index) => (
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