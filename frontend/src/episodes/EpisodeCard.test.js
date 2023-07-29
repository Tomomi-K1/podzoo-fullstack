import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import EpisodeCard from "./EpisodeCard";
import { UserProvider } from "../testUtils";

const episode ={
    id: 1,
    image: 'test-image-url',
    title: 'test title',
    datePublishedPretty:'test-date',
    enclosureUrl: 'test-link-to-audio',
    enclosureType: 'audio/mp3',
    description:'test-description'
    }
it('renders', () => {
    render(
        <MemoryRouter>
            <EpisodeCard episode={episode}/>
        </MemoryRouter>
    ) 
})

it('matches snapshot', () => {
    const { asFragment } = render(
        <MemoryRouter>
            <EpisodeCard episode={episode}/>
        </MemoryRouter>
    ) 
    expect(asFragment()).toMatchSnapshot();
})

it('has correctly renders', () => {
    render(
        <MemoryRouter>
            <EpisodeCard episode={episode} />
        </MemoryRouter>
        )
    expect(screen.getByText('test title')).toBeInTheDocument();
})
