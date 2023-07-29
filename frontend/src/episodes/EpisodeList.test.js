import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import * as rrd from 'react-router-dom';
import { UserProvider } from "../testUtils";
import EpisodeList from "./EpisodeList";
const mockData ={ 
    count: 100 ,
    episodes:[
        {artwork:"https://image.ausha.co/P0TYweU74SHBPcq5XiSwAEa1QzMUjsXfkX8YL2fq_1400x1400.jpeg?t=1616175875",
        author:"TheBBoost",
        categories:{9: 'Business'},
        description:"Comment développer son business ? Augmenter rapidement son chiffre d'affaires ? Trouver des  clients sans prospecter ? \"Le podcast J'peux pas j'ai business\" aborde les meilleures stratégies business, expliquées pas-à-pas et vous livre le plan d'action étape par étape pour construire le business et la vie de vos rêves.\nPour qui souhaite vivre de sa passion et découvrir la liberté financière, ce podcast creuse des sujets comme le marketing, l'entrepreneuriat, la prospection, l'état d'esprit, l'organisation et bien plus encore.\nÉnergie, stratégies, astuces et conseils d'une coach business certifiée sont au rendez-vous.\nPar Aline Bartoli, coach d'affaires chez TheBBoost.",
        feedId:75761,
        language:"fr",
        link:"http://www.thebboost.fr/",
        medium:"podcast",
        title:"J'peux Pas J'ai Business par TheBBoost",
        url:"https://feed.ausha.co/blDjes1L9aWL"}
        ],
    link:'testurl'
}

jest.mock('react-router-dom');

it('render with outlet context info', async() => {
    rrd.useOutletContext.mockReturnValue(mockData);
    render(<EpisodeList />) 
})

it('matches snapshot', async () => {
    rrd.useOutletContext.mockReturnValue(mockData);
    const { asFragment } = render(
        <MemoryRouter>
            <EpisodeList />
        </MemoryRouter>
    ) 
    expect(asFragment()).toMatchSnapshot();
})

it('render information from mockData', async () => {
    rrd.useOutletContext.mockReturnValue(mockData);
    render(
        <MemoryRouter>
            <EpisodeList />
        </MemoryRouter>
    ) 
    expect(screen.getByText("J'peux Pas J'ai Business par TheBBoost")).toBeInTheDocument();
})
