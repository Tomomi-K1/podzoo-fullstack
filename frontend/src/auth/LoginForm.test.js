import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import LoginForm from "./LoginForm";
import { UserProvider } from "../testUtils";

it('renders', () => {
    render(
        <MemoryRouter>
            <LoginForm />
        </MemoryRouter>
    ) 
})

it('matches snapshot', () => {
    const { asFragment } = render(
        <MemoryRouter>
            <LoginForm />
        </MemoryRouter>
    ) 
    expect(asFragment()).toMatchSnapshot();
})

it('has correctly renders login form', () => {
    render(
        <MemoryRouter>
            <LoginForm />
        </MemoryRouter>
        )
    expect(screen.getByText('Login Form')).toBeInTheDocument();
})
