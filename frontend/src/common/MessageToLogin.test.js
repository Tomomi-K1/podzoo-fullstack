import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import MessageToLogin from "./MessageToLogin";
import { UserProvider } from "../testUtils";

it('renders favorite button', () => {
    const message = 'favorite'
    render(
        <MemoryRouter>
            <UserProvider currentUser={null}>
                <MessageToLogin message={message} />
            </UserProvider>
        </MemoryRouter>
    ) 
})

it('renders button with message prop on it', () => {
    const message = 'Write Your Review'
    render(
        <MemoryRouter>
            <UserProvider currentUser={null}>
                <MessageToLogin message={message} />
            </UserProvider>
        </MemoryRouter>
    )
    expect(screen.getByText('Write Your Review')).toBeInTheDocument(); 
})

it('matches snapshot', () => {
    const message = 'Write Your Review'
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider currentUser={null}>
                <MessageToLogin message={message} />
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot(); 
})
