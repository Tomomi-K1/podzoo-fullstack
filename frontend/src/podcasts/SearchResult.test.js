import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router";
import SearchResult from "./SearchResult";
import { UserProvider } from "../testUtils";
import PodApi from "../api/PodApi";

it('renders', () => {
    render(
    <MemoryRouter>
        <UserProvider>
            <SearchResult />
        </UserProvider>
    </MemoryRouter>
    );
})

it('matches snapshot: user logged in', () => {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <SearchResult />
            </UserProvider>
        </MemoryRouter>
    ) 
    expect(asFragment()).toMatchSnapshot();
})

