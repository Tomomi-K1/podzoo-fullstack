import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import FavoriteButton from "./FavoriteButton";
import { UserProvider } from "../testUtils";

const data = {  
    feedId: 1,
    author: 'test-author',
    title: 'test-title',
    artwork: 'test-url'};
const feedId = '1'

it('renders', () => {
    render(
        <MemoryRouter>
            <UserProvider>
                <FavoriteButton podcastData={data} feedId={feedId} />
            </UserProvider>
        </MemoryRouter>
    ) 
})

it('matches snapshot', () => {
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
            <FavoriteButton podcastData={data} feedId={feedId} />
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot(); 
})
