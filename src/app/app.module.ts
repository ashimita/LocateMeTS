import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { UserService } from './user.service';
//import { WelcomeUserComponent } from './welcome-user.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent],
  bootstrap:    [ AppComponent ],
  providers: [ UserService ]
})
export class AppModule { }
