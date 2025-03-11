import { Component } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  nestedMenuItems = [
    {
      label: 'Emails',
      icon: 'pi pi-fw pi-envelope',
      items: [
        {
          label: 'New',
          icon: 'pi pi-fw pi-pencil',
        }
      ]
    },
    {
      label: 'Calls',
      icon: 'pi pi-fw pi-phone',
      items: [
        {
          label: 'Log',
          icon: 'pi pi-fw pi-notes'
        }
      ]
    },
    {
      label: 'Appointment',
      icon: 'pi pi-fw pi-calendar'
    },
    {
      label: 'Tasks',
      icon: 'pi pi-fw pi-list',
      items: [
        {
          label: 'New',
          icon: 'pi pi-fw pi-check'
        }
      ]
    },
    {
      label: 'More',
      icon: 'pi pi-fw pi-ellipsis-v',
      items: [
        {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil'
        },
        {
          label: 'Archive',
          icon: 'pi pi-fw pi-trash'
        }
      ]
    }
  ];

  events = [
    { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
    { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
    { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
    { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
];
}
