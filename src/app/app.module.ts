import { HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatabaseService } from './services/database.service';

import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { ListCategoryComponent } from './components/category/list-category/list-category.component';
import { UpdateCategoryComponent } from './components/category/update-category/update-category.component';
import { DeleteCategoryComponent } from './components/category/delete-category/delete-category.component';
import { PipeUppercasePipe } from './pipes/uppercase/pipe-uppercase.pipe';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddEventComponent } from './components/event/add-event/add-event.component';
import { DeleteEventComponent } from './components/event/delete-event/delete-event.component';
import { ListEventComponent } from './components/event/list-event/list-event.component';
import { UpdateEventComponent } from './components/event/update-event/update-event.component';
import { FooterComponent } from './components/footer/footer.component';
import { StatsG1Component } from './components/operations/stats-g1/stats-g1.component';
import { StatsG2Component } from './components/operations/stats-g2/stats-g2.component';
import { LanguageBotComponent } from './components/translator/language-bot/language-bot.component';
import { SpeechBotComponent } from './components/translator/speech-bot/speech-bot.component';
import { InvalidDataComponent } from './components/invalid-data/invalid-data.component';
import { CategoryDetailsComponent } from './components/category/category-details/category-details.component';
import { PipeDateFormatPipe } from './pipes/date-format/pipe-date-format.pipe';
import { EventDetailsComponent } from './components/event/event-details/event-details.component';
import { PipeDurationFormatPipe } from './pipes/duration-format/pipe-duration-format.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';

const appRoutes: Routes = [
  { path: "api/v1/category/32693974/list-category", component: ListCategoryComponent }, 
  { path: "api/v1/category/32693974/add-category", component: AddCategoryComponent }, 
  { path: "api/v1/category/32693974/update-category", component: UpdateCategoryComponent },  
  { path: "api/v1/category/32693974/delete-category", component: DeleteCategoryComponent }, 
  { path: "api/v1/category/32693974/category-details/:categoryId", component: CategoryDetailsComponent }, 
  { path: "speech-bot", component: SpeechBotComponent }, 
  { path: "stats-g1", component: StatsG1Component }, 
  { path: "list-events", component: ListEventComponent }, 
  { path: "add-event", component: AddEventComponent }, 
  { path: "update-event", component: UpdateEventComponent }, 
  { path: "delete-event", component: DeleteEventComponent }, 
  { path: "event-detail/:eventId", component: EventDetailsComponent }, 
  { path: "language-bot", component: LanguageBotComponent }, 
  { path: "stats-g2", component: StatsG2Component }, 
  { path: "invalid-data", component: InvalidDataComponent }, 
  { path: "", redirectTo: "api/v1/category/32693974/list-category", pathMatch: "full" }, 
  { path: "**", component: PageNotFoundComponent }, 
]; 


@NgModule({
  declarations: [
    AppComponent,
    AddCategoryComponent,
    ListCategoryComponent,
    UpdateCategoryComponent,
    DeleteCategoryComponent,
    PipeUppercasePipe,
    PageNotFoundComponent,
    AddEventComponent,
    DeleteEventComponent,
    ListEventComponent,
    UpdateEventComponent,
    FooterComponent,
    StatsG1Component,
    StatsG2Component,
    LanguageBotComponent,
    SpeechBotComponent,
    InvalidDataComponent,
    CategoryDetailsComponent,
    PipeDateFormatPipe,
    EventDetailsComponent,
    PipeDurationFormatPipe,
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true}),
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule, 
    FormsModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
}),
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
