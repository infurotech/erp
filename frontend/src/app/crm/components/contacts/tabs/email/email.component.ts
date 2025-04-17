import { Component } from '@angular/core';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrl: './email.component.scss'
})
export class EmailComponent {
  emails = [
    {
      id: 1,
      sender: 'Jane Doe',
      senderEmail: 'jane@example.com',
      avatar: 'https://i.pravatar.cc/40?u=jane',
      subject: 'Project Update',
      datetime: new Date('2024-03-10T14:30:00'),
      body: 'Hey, can you review the latest document?',
      replies: [
        { sender: 'You', avatar: 'https://i.pravatar.cc/40?u=me', body: 'Sure, I will check it now.', datetime: new Date('2024-03-10T14:30:00') },
        { sender: 'You', avatar: 'https://i.pravatar.cc/40?u=me', body: 'Sure, I will check it now.', datetime: new Date('2024-03-10T14:30:00') },
        { sender: 'You', avatar: 'https://i.pravatar.cc/40?u=me', body: 'Sure, I will check it now.', datetime: new Date('2024-03-10T14:30:00') },
        { sender: 'You', avatar: 'https://i.pravatar.cc/40?u=me', body: 'Sure, I will check it now.', datetime: new Date('2024-03-10T14:30:00') }

      ],
      showReplyBox: false,
      newReply: ''
    },
    {
      id: 2,
      sender: 'Project Team',
      senderEmail: 'team@example.com',
      avatar: 'https://i.pravatar.cc/40?u=team',
      subject: 'Meeting Reminder',
      datetime: new Date('2024-03-10T14:30:00'),
      body: 'Reminder: Meeting at 3 PM.',
      replies: [],
      showReplyBox: false,
      newReply: ''
    }
  ];

  toggleReplyBox(email: any) {
    email.showReplyBox = !email.showReplyBox;
  }

  sendReply(email: any) {
    if (email.newReply.trim()) {
      email.replies.push({
        sender: 'You',
        avatar: 'https://i.pravatar.cc/40?u=me',
        body: email.newReply,
        time: new Date().toLocaleTimeString()
      });
      email.newReply = '';
      email.showReplyBox = false;
    }
  }
}
