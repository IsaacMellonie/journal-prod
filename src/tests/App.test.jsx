import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";
import App from "../components/App";
import userEvent from '@testing-library/user-event';

// takes 2 params; name of the test and a cb function.
describe('App Component', () => {
    let container 

    beforeEach(() => {
        container = render(<App/>).container
    })

    it('render the Home component', () => {
        expect(container.querySelector('h3')).toHaveTextContent('Journal Entries')
    })

    it('renders CategorySelection when Create entry menu item is clicked', async () => {

       await userEvent.click(screen.getByText('Create Entry'))

       expect(container.querySelector('h3')).not.toBeNull()
       expect(container.querySelector('h3')).toHaveTextContent('Please select a category:')
    })
}) 