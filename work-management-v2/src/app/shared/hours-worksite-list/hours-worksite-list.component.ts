import { Component, Input } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { Hour } from 'src/app/state/hours/hour.model';
import { HourQuery } from 'src/app/state/hours/hour.query';
import { Worksite } from 'src/app/state/worksites/worksite.model';
import { WorksiteService } from 'src/app/state/worksites/worksite.service';
import { MINUTESINHOUR } from 'src/app/utils/configs/app.config';
import { formatHoursTotal } from 'src/app/utils/functions';

@Component({
  selector: 'app-hours-worksite-list',
  templateUrl: './hours-worksite-list.component.html',
  styleUrls: ['./hours-worksite-list.component.scss']
})
export class HoursWorksiteListComponent {

  worksite$: Observable<Worksite> | undefined;
  sortedHours$: Observable<Hour[]> | undefined;

  @Input()
  set setWorksite(value: Worksite) {
    if (!value?.info) return;
    this.sortedHours$ = this.hourQuery.selectHoursByWorksite(value.id).pipe(
      map(hours => hours.sort((a, b) => {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      })),
      delay(1000)
    );

    this.worksite$ = this.wsService.mapHoursToWorksites([value], this.hourQuery.selectAll()).pipe(
      map(els => els[0]),
      delay(500),
    );
  }

  constructor(
    private hourQuery: HourQuery,
    private wsService: WorksiteService
  ) { }


  getAddresss(worksite: Worksite) {
    return `${worksite.info.streetAddress}, ${worksite.info.postalCode} ${worksite.info.city}`;
  }

  getFormatHours(marked: number | undefined) {
    if (!marked) return;
    return formatHoursTotal(marked / MINUTESINHOUR);
  }
}