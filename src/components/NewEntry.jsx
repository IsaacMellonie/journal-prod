import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const NewEntry = ({ categories, addEntry }) => {
    // useParams can't be accessed if declared outside of the BrowserRouter
    // so we need to include it in the Component. Only children of BrowserRouter
    // can access useParams
    const params = useParams()
    // Setup the initial state as an empty string for the form > text area.
    const [entry, setEntry] = useState('')
    const nav = useNavigate()

    // Function which is called for the <form> element onSubmit.
    async function createEntry(e) {
        // This prevents the default behaviour of the browser reloding onSubmit of form
        e.preventDefault()
        // Create a new entry
        // We need the id (array index) from the entry so it can be used in the nav() function URL
        const id = await addEntry(params.cat_id, entry)
        // 3. Clear input textarea
        setEntry('')
        nav(`/entry/${id}`)
    }
        // 1. The user types into the <textarea>.
        // 2. The onChange event is triggered, calling the arrow function with the current event object.
        // 3. The arrow function uses e.target.value to get the value typed by the user.
        // 4. setEntry is called with the new value, updating the entry state.
        // 5. React re-renders the component with the updated state, ensuring that the <textarea> displays the current value the user has typed.
        // This mechanism allows the React component to be a "controlled component", 
        // meaning its value is controlled by React state, enabling an interactive user 
        // experience where the application's UI stays in sync with the underlying state.

    return (
        <> 
            <h3>New entry in category {categories[params.cat_id]?.name}</h3>
            {/* the ? is stating that if categories[params.cat_id] is truthy, try to get .name */}
            <form className="section" onSubmit={createEntry}>
                <div className="field">
                    <label className="label">Content</label>
                    <div className="control">
                        <textarea 
                            className="textarea" 
                            // Here the entry is assigned to value and lifted up to useState 
                            value={entry} 
                            // This arrow function receives an event object (e) as its argument, 
                            // from which it extracts the current value of the <textarea> using 
                            // e.target.value. This value is then passed to the setEntry function, 
                            // which updates the entry state with the new value from the text area.
                            onChange={e => setEntry(e.target.value)} 
                            placeholder="Type your journal entry here"
                        ></textarea>
                    </div>
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link">Create Entry</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default NewEntry