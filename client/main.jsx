import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { App } from '/imports/ui/App';
import { PrimeReactProvider } from 'primereact/api';
import { CrudProvider } from '../imports/ui/Providers/CRUD';

Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container);

  root.render(
    <PrimeReactProvider>
      <CrudProvider>
        <App />
      </CrudProvider> 
    </PrimeReactProvider>
  );
});
