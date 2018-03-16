import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from "./auth-routing.module";
import { SharedModule } from "../shared/shared.module";
import { MessageComponent } from "../components/message/message.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    AuthRoutingModule
  ],
  declarations: [LoginComponent, SignupComponent, MessageComponent]
})
export class AuthModule { }
