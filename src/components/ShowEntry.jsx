import React from 'react'

const ShowEntry = ({ entry }) => {
  return entry ? (
    <>
      <h3>{entry.content}</h3>
      <p>Posted in {entry.category?.name}</p>
    </>
  ) : (
    <h3>Entry not found!</h3>
  )
}

// ShowEntry is used in the App(). It's used in a function
// ShowEntryWrapper() which is called outside of the BrowserRoutes.
// The reason for this is that App() is not a child of BrowserRoutes.
// useParams cannot pass props to other chldren becuase it is declared
// in App() 
export default ShowEntry