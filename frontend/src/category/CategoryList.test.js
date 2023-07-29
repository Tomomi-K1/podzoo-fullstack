import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CategoryList from "./CategoryList";
import { UserProvider } from "../testUtils";
import categories from "./categories";

it('renders', () => {
    render(
        <MemoryRouter>
            <CategoryList categories={categories}/>
        </MemoryRouter>
    ) 
})

it('matches snapshot', () => {
    const { asFragment } = render(
        <MemoryRouter>
            <CategoryList categories={categories}/>
        </MemoryRouter>
    ) 
    expect(asFragment()).toMatchSnapshot();
})

it('has correctly renders', () => {
    render(
        <MemoryRouter>
            <CategoryList categories={categories} />
        </MemoryRouter>
        )
    expect(screen.getByText('Education')).toBeInTheDocument();
})