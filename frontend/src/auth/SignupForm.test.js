import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import SignupForm from "./SignupForm";
import { UserProvider } from "../testUtils";

it('renders', () => {
    render(
        <MemoryRouter>
            <SignupForm />
        </MemoryRouter>
    ) 
})

it('matches snapshot', () => {
    const { asFragment } = render(
        <MemoryRouter>
            <SignupForm />
        </MemoryRouter>
    ) 
    expect(asFragment()).toMatchSnapshot();
})

it('has correctly renders', () => {
    render(
        <MemoryRouter>
            <SignupForm />
        </MemoryRouter>
        )
    expect(screen.getByText('Signup Form')).toBeInTheDocument();
})
