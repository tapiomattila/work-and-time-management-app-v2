import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HoursChartComponent } from './hours-chart/hours-chart.component';
import { SmallCardComponent } from './small-card/small-card.component';
import { WorksiteInfoCardComponent } from './worksite-info-card/worksite-info-card.component';
import { HeaderComponent } from './header/header.component';
import { BackBtnComponent } from './back-btn/back-btn.component';
import { WorksiteListElementComponent } from './worksite-list-element/worksite-list-element.component';
import { HeaderProfileComponent } from './header-profile/header-profile.component';
import { MarkedHoursCardComponent } from './marked-hours-card/marked-hours-card.component';
import { MarkedHourInfoCardComponent } from './marked-hour-info-card/marked-hour-info-card.component';

@NgModule({
  imports: [CommonModule],
  exports: [
    HeaderProfileComponent,
    HeaderComponent,
    WorksiteInfoCardComponent,
    HoursChartComponent,
    SmallCardComponent,
    BackBtnComponent,
    WorksiteListElementComponent,
    MarkedHoursCardComponent,
    MarkedHourInfoCardComponent,
  ],
  declarations: [
    HeaderProfileComponent,
    HeaderComponent,
    WorksiteInfoCardComponent,
    HoursChartComponent,
    SmallCardComponent,
    BackBtnComponent,
    WorksiteListElementComponent,
    MarkedHoursCardComponent,
    MarkedHourInfoCardComponent,
  ],
  providers: [],
})
export class SharedModule { }
