import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { HomeRoutingModule } from '../pages/home/home-routing.module';
import { AppRoutingModule } from '../app-routing.module';
import { SideMenuComponent } from './side-menu/side-menu.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SideMenuComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    HomeRoutingModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SideMenuComponent
  ]
})
export class CoreModule { }
