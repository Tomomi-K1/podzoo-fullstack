import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import PodcastDetailLayout from "./PodcastDetailLayout";
import { UserProvider } from "../testUtils";

it('renders', () => {
    render(
    <MemoryRouter>
        <UserProvider>
            <PodcastDetailLayout />
        </UserProvider>
    </MemoryRouter>
    );
})

it('matches snapshot: user logged in', () => {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <PodcastDetailLayout />
            </UserProvider>
        </MemoryRouter>
    ) 
    expect(asFragment()).toMatchSnapshot();
})

