import { Component, Input } from '@angular/core';
import { Progress } from '@classy/store/models';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent {

  faCheckCircle = faCheckCircle;

  @Input()
  progress: Progress;

  @Input()
  show: boolean;

  @Input()
  complete: boolean;

}
