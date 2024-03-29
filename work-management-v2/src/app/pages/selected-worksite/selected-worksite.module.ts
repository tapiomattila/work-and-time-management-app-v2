import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SelectedWorksiteComponent } from './selected-worksite.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [],
  declarations: [SelectedWorksiteComponent],
  providers: [],
})
export class SelectedWorksiteModule {}
