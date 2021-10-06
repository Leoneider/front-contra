import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";
import { AppRoutingModule } from "src/app/app-routing.module";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { AuthLayoutComponent } from "./auth-layout/auth-layout.component";

@NgModule({
  declarations: [AdminLayoutComponent, AuthLayoutComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [AdminLayoutComponent, AuthLayoutComponent],
})
export class LayoutModule {}
