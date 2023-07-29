import React from "react";
import { render, screen, waitFor, debug} from "@testing-library/react";
import { MemoryRouter } from "react-router";
import * as rrd from 'react-router-dom';
import FavoriteList from "./FavoriteList";
import { UserProvider } from "../testUtils";
import PodApi from "../api/PodApi";


it('renders', () => {
    render(
        <MemoryRouter>
            <UserProvider>
                <FavoriteList />
            </UserProvider>
        </MemoryRouter>
    ) 
})

it('matches snapshot', () => {
    const { asFragment } = render(
        <MemoryRouter>
        <UserProvider>
            <FavoriteList />
        </UserProvider>
    </MemoryRouter>
    ) 
    expect(asFragment()).toMatchSnapshot();
})


