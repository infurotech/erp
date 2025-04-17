import { Component } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {
  
  constructor() {
  }

  activities = [
    {
      type: 'Meeting',
      datetime: new Date('2024-03-10T14:30:00'),
      user: 'Elise Beck',
      details: 'Cupcake creator demo scheduled with the client.'
    },
    {
      type: 'Task',
      datetime: new Date('2024-03-09T10:15:00'),
      user: 'John Doe',
      details: 'Follow up with Brian regarding the contract.'
    },
    {
      type: 'Call',
      datetime: new Date('2024-03-08T16:00:00'),
      user: 'Jane Smith',
      details: 'Discussed the new product features with the client.'
    }
  ];

  getActivityIcon(type: string) {
    switch (type) {
      case 'Meeting': return 'pi pi-calendar';
      case 'Task': return 'pi pi-check-circle';
      case 'Call': return 'pi pi-phone';
      default: return 'pi pi-info-circle';
    }
  }
}
