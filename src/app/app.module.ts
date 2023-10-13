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
import { CalculatorComponent } from './components/calculator/calculator.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { CalculatorIngredientsComponent } from './components/calculator-ingredients/calculator-ingredients.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalculatorIngredientsCalculatedComponent } from './components/calculator-ingredients-calculated/calculator-ingredients-calculated.component';
import { RegisterComponent } from './components/register/register.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { provideDatabase,getDatabase } from '@angular/fire/database';

const routes = [
  { path: 'about', component: AboutComponent },
  { path: '', component: MenuComponent },
  { path: 'calculator', component: CalculatorComponent },
  {
    path: 'ingredients',
    component: IngredientsComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'calculator-ingredients', component: CalculatorIngredientsComponent },
  {
    path: 'calculator-ingredients-calculated',
    component: CalculatorIngredientsCalculatedComponent,
  },
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
    IngredientsComponent,
    RecipesComponent,
    LoginComponent,
    CalculatorIngredientsComponent,
    CalculatorIngredientsCalculatedComponent,
    ErrorComponent,
    RegisterComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
