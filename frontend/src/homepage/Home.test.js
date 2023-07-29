import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Home from "./Home";
import { UserProvider } from "../testUtils";

it('renders', () => {
    render(
    <MemoryRouter>
        <Home />
    </MemoryRouter>
    );
})

it('matches snapshot: user logged in', () => {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <Home />
            </UserProvider>
        </MemoryRouter>
    ) 
    expect(asFragment()).toMatchSnapshot();
})

it('matches snapshot when no user', () => {
    const { asFragment } = render(
        <MemoryRouter>
                <Home />
        </MemoryRouter>
    ) 
    expect(asFragment()).toMatchSnapshot();
})

