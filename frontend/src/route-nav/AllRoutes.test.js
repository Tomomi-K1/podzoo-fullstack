import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";
import AllRoutes from "./AllRoutes";

it('renders correct location', async () => {
    render(
        <MemoryRouter initialEntries={["/"]}>
            <UserProvider currentUser={null}>
                <AllRoutes />
            </UserProvider>
        </MemoryRouter>
    )
    expect(screen.getByText('Login')).toBeInTheDocument();
})