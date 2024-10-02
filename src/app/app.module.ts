import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { AppRoutingModule }from './app.routes';
import { AppComponent } from './app.component';
import { ListaComponent } from './lista/lista.component';

    @NgModule({
        declarations:[
            AppComponent,
            ListaComponent
        ],

        imports:[
            BrowserModule,
            AppRoutingModule,
            HttpClient
        ],
        providers: [],
        bootstrap: [AppComponent]
        
    })
    export class AppModule{ }