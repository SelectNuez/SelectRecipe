import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponent } from './components/alert/alert.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { MenuComponent } from './components/menu/menu.component';
import { AboutComponent } from './components/about/about.component';
import { RouterModule } from '@angular/router';
import { CalculatorComponent } from './components/calculator-container/calculator/calculator.component';
import { RecipesListComponent } from './components/recipes/recipes-list/recipes-list.component';
import { ErrorComponent } from './components/error/error.component';
import { CalculatorIngredientsComponent } from './components/calculator-container/calculator-ingredients/calculator-ingredients.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalculatorIngredientsCalculatedComponent } from './components/calculator-container/calculator-ingredients-calculated/calculator-ingredients-calculated.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { HttpClientModule } from '@angular/common/http';
import { RecipesFormComponent } from './components/recipes/recipes-form/recipes-form.component';
import { RecipesFormIngredientsComponent } from './components/recipes/recipes-form-ingredients/recipes-form-ingredients.component';
import { RecipeIndividualComponent } from './components/recipes/recipe-individual/recipe-individual.component';
import { GuideComponent } from './components/guide/guide.component';

const routes = [
  { path: 'about', component: AboutComponent },
  { path: '', component: MenuComponent },
  { path: 'calculator', component: CalculatorComponent },
  {
    path: 'recipes',
    component: RecipesListComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/'])),
  },
  { path: 'calculator-ingredients', component: CalculatorIngredientsComponent },
  {
    path: 'calculator-ingredients-calculated',
    component: CalculatorIngredientsCalculatedComponent,
  },
  { path: 'guide', component: GuideComponent },
  { path: 'recipes-form', component: RecipesFormComponent },
  { path: 'recipes-form-ingredients', component: RecipesFormIngredientsComponent },
  { path: 'recipe-individual/:name', component: RecipeIndividualComponent },
  { path: '**', component: ErrorComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    FooterComponent,
    LogoComponent,
    MenuComponent,
    AboutComponent,
    CalculatorComponent,
    RecipesListComponent,
    CalculatorIngredientsComponent,
    CalculatorIngredientsCalculatedComponent,
    ErrorComponent,
    RecipesFormComponent,
    RecipesFormIngredientsComponent,
    RecipeIndividualComponent,
    GuideComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
