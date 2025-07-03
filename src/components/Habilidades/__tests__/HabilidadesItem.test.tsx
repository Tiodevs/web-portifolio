import React from 'react';
import { render, screen } from '@testing-library/react';
import { HabilidadesList } from '../HabilidadesList';

describe("Habilidades List", () => {
    beforeEach(() => {
        render(
        <HabilidadesList 
        titulo="Habilidades" 
        habilidades={["HTML", "CSS", "JavaScript", "React", "Node.js", "Express", "MongoDB", "MySQL", "Git", "GitHub", "Docker", "Linux", "Windows", "macOS", "iOS", "Android", "Windows", "macOS", "iOS", "Android"]} 
        />
    )
    })

    it("Deve renderizar o componente", () => {
        expect(screen.getByTestId("habilidades-list")).toBeInTheDocument()
    })

})