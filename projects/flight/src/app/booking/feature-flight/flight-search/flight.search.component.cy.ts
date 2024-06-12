import { ticketFeature } from './../../logic-flight/+state/reducer';
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
    }).then(({ component, fixture }) => {
      // fixture.componentRef.setInput('id', 3);
      const store = fixture.componentRef.injector.get(Store);

      store.subscribe(console.log);
      store.select(ticketFeature.selectFlights).subscribe(console.log);
      store.select(state => (state as any).tickets.flights).subscribe(console.log);

      cy.get('.row').find('app-flight-card').should('have.length', 1);
      cy.get('input[id=from]').clear().type('Graz');
      cy.get('input[id=to]').clear().type('Hamburg');
      cy.get('button').contains('Search').click();
      cy.get('.row').find('app-flight-card').should('have.length', 1);
    });
  })
})
