import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { FormControlValidatorDirective } from '../directives/form-control-validator.directive';
import { InputSwitchModule } from 'primeng/inputswitch';


@NgModule({
  declarations: [
    // AuthorizationDirective,
    // IsRenderedDirective,
    // IsAllowedDirective,
    // ColumnParsePipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    FormControlValidatorDirective
  ],
  exports: [
    // AuthorizationDirective,
    // IsRenderedDirective,
    // IsAllowedDirective,
    // ColumnParsePipe,
    // // BusyIndicatorModule,
    // ProgressBarModule,
    // PanelModule,
    CommonModule,
    ToastModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    SidebarModule,
    DialogModule,
    FormControlValidatorDirective,
    DropdownModule,
    TooltipModule,
    InputSwitchModule,
    TableModule,
        // PasswordModule,
    // CardModule,
    // SidebarModule,
   
    // CalendarModule,
    // ButtonModule,
    // 
    // ConfirmDialogModule,
    // CheckboxModule,
    // InputNumberModule,
    // InputTextModule,
    // InputTextareaModule,
    // MultiSelectModule,
    // TreeSelectModule,
    // TreeTableModule,
    // TableModule,
    // MenuModule,
    // RadioButtonModule,
    // OverlayPanelModule,
    // FileUploadModule,
    // SkeletonModule,
    // TooltipModule,
    // InputSwitchModule,
    // PaginatorModule,
    // SplitterModule,
    // ListboxModule,
    // TreeModule,
  ],
  providers: [DatePipe, CurrencyPipe],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
