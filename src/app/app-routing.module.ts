import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';

const routes: Routes = [
    {
        path: 'main',
        loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
        // canActivate: [UsuarioGuard] // No funciona bien por el lazyload
        canLoad: [UsuarioGuard] // En el arreglo pueden ir varios Guards, canLoad es para páginas cargadas mediante lazyload
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    }
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
