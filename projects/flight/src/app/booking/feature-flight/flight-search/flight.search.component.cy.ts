import { Store } from "@ngrx/store";
import { FlightCardComponent, FlightFilterComponent } from "../../ui-flight";
import { FlightSearchComponent } from "./flight-search.component";

describe('FlightSearchComponent', () => {
  it('can mount', () => {
    cy.mount(FlightSearchComponent, {
      imports: [
        FlightCardComponent,
        FlightFilterComponent
      ],
    });
    cy.get('.row').find('app-flight-card').should('have.length', 0);
    cy.get('input[id=from]').clear().type('Graz');
    cy.get('input[id=to]').clear().type('Hamburg');
    cy.get('button').contains('Search').click();
    cy.get('.row').find('app-flight-card').should('have.length', 10);
  })
})
