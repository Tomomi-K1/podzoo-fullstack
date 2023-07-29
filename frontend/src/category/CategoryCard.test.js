import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CategoryCard from "./CategoryCard";
import { UserProvider } from "../testUtils";

const category ={
    id: 1,
    name: 'test category'
    }
it('renders', () => {
    render(
        <MemoryRouter>
            <CategoryCard category={category}/>
        </MemoryRouter>
    ) 
})

it('matches snapshot', () => {
    const { asFragment } = render(
        <MemoryRouter>
            <CategoryCard category={category}/>
        </MemoryRouter>
    ) 
    expect(asFragment()).toMatchSnapshot();
})

it('has correctly renders', () => {
    const category ={
        id: 1,
        name: 'test category'
    }
    render(
        <MemoryRouter>
            <CategoryCard category={category} />
        </MemoryRouter>
        )
    expect(screen.getByText('test category')).toBeInTheDocument();
})
