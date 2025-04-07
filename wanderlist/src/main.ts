import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { RouterModule } from '@angular/router';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component'; 

const appConfig = {
  providers: [
    importProvidersFrom(
      HttpClientModule,  
      RouterModule.forRoot(routes)  
    )
  ]
};

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
