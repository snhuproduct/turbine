import { Component, Input } from '@angular/core';

@Component({
  selector: 'toboggan-ws-form-changes-table',
  templateUrl: './form-changes-table.component.html',
  styleUrls: ['./form-changes-table.component.scss'],
})
export class FormChangesTableComponent {
  @Input() rows?: { label: string, oldValue: unknown, newValue: unknown }[] = []

  get editedRows() {
    return this.rows?.filter(row => row.newValue !== row.oldValue) || [];
  }
}
