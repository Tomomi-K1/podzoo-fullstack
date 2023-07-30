import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import PodcastList from "./PodcastList";
import { UserProvider } from "../testUtils";

const podcasts =[{
    author:'test-author',
    title:'test-title',
    artwork:'test-artwork',
    feedId: 1
}]

it('renders', () => {
    render(
    <MemoryRouter>
        <UserProvider>
            <PodcastList podcasts={podcasts} />
        </UserProvider>
    </MemoryRouter>
    );
})

it('matches snapshot: user logged in', () => {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <PodcastList podcasts={podcasts} />
            </UserProvider>
        </MemoryRouter>
    ) 
    expect(asFragment()).toMatchSnapshot();
})

it('it has podcasts data', () => {
    render(
    <MemoryRouter>
        <UserProvider>
            <PodcastList podcasts={podcasts} />
        </UserProvider>
    </MemoryRouter>
    );
    expect(screen.getByText('test-title')).toBeInTheDocument();
})