import React, { useEffect, useState } from "react"
import Home from "./Home"
import CategorySelection from "./CategorySelection"
import NewEntry from "./NewEntry"
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom"
import NavBar from "./NavBar"
import ShowEntry from './ShowEntry'

const App = () => {
    // lift state up to the common parent component so that CategorySelection
    // and NewEntry can recieve categories as a prop.
    // State can be updated at any point while the app is running and it 
    // will auto update to reflect the new categories.
    const [categories, setCategories] = useState([])
    // useState for entries is set to as default empty array
    const [entries, setEntries] = useState([])

        //useEfect is sending a fetch request to the URL which returns the categories
        // Then the same again for entries. 
        // Make sure the URL port number matches the port used by the API. In this case 4001
        useEffect(() => {
            fetch("https://journal-api-prod-mbbl.onrender.com/categories")
                .then((res) => res.json())
                .then((data) => setCategories(data))
    
            fetch("https://journal-api-prod-mbbl.onrender.com/entries")
                .then((res) => res.json())
                .then((data) => setEntries(data))
        }, []) // Empty array so they both only happen on mounting 

    ///addEntry needs to be declared in App,
    // then passed as a prop to NewEntry where it's used to get
    // cat_id and content. That info is then shared to setEntry

    // We need to cache the index id first because setEntries() is async
    // and hasn't posted the entry to the DB yet. The reason we don't -1
    // from the entries.length is because the indexing will be based on
    // original length of the entries array before updating the length.

    // 1. Create a entry object from user input and assign it to
    // newEntry variable

    // the parsed json gets added to the end of entries

    // 2. Add new entry to the entries list. Becuase the API isn't connected yet
    // the set entry holds the new entry in memory. This newEntry is lifted up 
    // to a useState. 
    // The expanse operator gets all of the current entries and
    // adds newEntry to the end of the array. Simulates a push to the array.
    // await can't be used for setEntries() because it has no return value.
    async function addEntry(cat_id, content) {
        const newId = entries.length
        // 1. Create a entry object from user input
        const newEntry = {
            category: categories[cat_id]._id,
            content: content,
        }
        // POST new entry to API
        const res = await fetch('https://journal-api-prod-mbbl.onrender.com/entries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEntry)
        })
        const data = await res.json()
        setEntries([...entries, data])
        // 2. Add new entry to the entries list
        return newId
    }

    // -- HOV - Higher Order Component --
    // The component is wrapped in another component ShowEntryWrapper
    // so that the user params can be passed from one component to another
    // outside of App()
    function ShowEntryWrapper() {
        const { id } = useParams()
        return <ShowEntry entry={entries[id]} />
    }

    return (
        <>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home entries={entries}/>} />
                    <Route path="/category" element={<CategorySelection categories={categories} />} />
                    <Route path="/entry">
                        {/* harcoded data to test initially */}
                        <Route path=":id" element={<ShowEntryWrapper />} />
                        {/* gets addEntry from outside the return() */}
                        <Route path="new/:cat_id" element={<NewEntry categories={categories} addEntry={addEntry} />} />
                    </Route>
                    <Route path="*" element={<h3>Page not found</h3>} />
                </Routes>
            </BrowserRouter>
            {/* <Home />
            <CategorySelection />
            <NewEntry /> */}
        </>
    )
}

export default App