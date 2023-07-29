import React from "react";
import { render, screen, waitFor, debug} from "@testing-library/react";
import { MemoryRouter } from "react-router";
import * as rrd from 'react-router-dom';
import PodcastCard from "./PodcastCard";
import { UserProvider } from "../testUtils";

const podcast ={
    author:'test-author',
    title:'test-title',
    artwork:'test-artwork',
    feedId: 1
}

it('renders', () => {
    render(
        <MemoryRouter>
                <PodcastCard podcast={podcast}/>
        </MemoryRouter>
    ) 
})

it('matches snapshot', () => {
    const { asFragment } = render(
        <MemoryRouter>
            <PodcastCard podcast={podcast}/>
        </MemoryRouter>
    ) 
    expect(asFragment()).toMatchSnapshot();
})

it('renders podcast information', () => {
    render(
        <MemoryRouter>
                <PodcastCard podcast={podcast}/>
        </MemoryRouter>
    ) 
    expect(screen.getByText('test-title')).toBeInTheDocument();
})


