import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { UserService } from './user.service';
import { StorageService } from './storage.service';
import { UserInfoComponent } from './userinfo.component';
import { AppRoutingModule }     from './app-routing.module';

@NgModule({
  imports:      [ BrowserModule, AppRoutingModule ],
  declarations: [ AppComponent, UserInfoComponent],
  bootstrap:    [ AppComponent ],
  providers: [ UserService, StorageService ]
})
export class AppModule { }
