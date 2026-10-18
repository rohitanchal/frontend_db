import { Component } from '@angular/core';
import { BackupPanelComponent } from '../../shared/backup-panel/backup-panel.component';

@Component({
  selector: 'app-get-started',
  imports: [BackupPanelComponent],
  templateUrl: './get-started.component.html',
  styleUrl: './get-started.component.css',
})
export class GetStartedComponent {}
