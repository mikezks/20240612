import { provideMockStore } from '@ngrx/store/testing';
import { TicketEffects } from './../../projects/flight/src/app/booking/logic-flight/+state/effects';
/* eslint-disable @typescript-eslint/no-namespace */

// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import { provideState, provideStore } from '@ngrx/store';
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/angular';
import { ticketFeature } from '../../projects/flight/src/app/booking/logic-flight/+state/reducer';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

// This is necessary as mount takes a generic for it's first two arguments
type MountParams = Parameters<typeof mount>

Cypress.Commands.add(
  'mount',
  (component: MountParams[0], config: MountParams[1] = {}) => {
    return mount(component, {
      ...config,
      providers: [
        provideRouter([]),
        provideMockStore({
          initialState: {
            tickets: {
              flights: [
                {
                  id: 111,
                  from: 'Innsbruck',
                  to: 'LA',
                  date: new Date().toISOString(),
                  delayed: true
                }
              ]
            }
          },
          selectors: [
            {
              selector: ticketFeature.selectFlights,
              value: [
                {
                  id: 999,
                  from: 'Wien',
                  to: 'NYC',
                  date: new Date().toISOString(),
                  delayed: true
                }
              ]
            }
          ]
        })
      ]
    });
  }
)

// Example use:
// cy.mount(MyComponent)
