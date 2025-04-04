import { Component, ElementRef, ViewChild } from '@angular/core';
interface Task {
  title: string;
  assignedTo: string;
  dueDate: Date;
  status: string;
  details?: string;
  user: string;
  isExpanded?: boolean;
  isEditing?: boolean;
}
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  // tasks: Task[] = [
  //   { 
  //     title: 'Follow up with client', assignedTo: 'John Doe', dueDate: new Date(), 
  //     status: 'Pending', user: 'JD', details: 'Check on contract progress', isExpanded: false
  //   },
  //   { 
  //     title: 'Prepare contract', assignedTo: 'Jane Smith', dueDate: new Date(), 
  //     status: 'In Progress', user: 'JS', details: 'Draft the agreement', isExpanded: false
  //   }
  // ];
  @ViewChild('fileUploadInput', { static: false }) fileUploadInput!: ElementRef<HTMLInputElement>;

  isDragging = false;

  newTask: Task = {
    title: '',
    assignedTo: '',
    dueDate: new Date(),
    status: 'Pending',
    details: '',
    user: '',
    isExpanded: true
  };

  statuses = ['Pending', 'In Progress', 'Completed'];
  showTaskForm = false;

  getTaskIcon(status: string): string {
    switch (status) {
      case 'Pending': return 'pi pi-clock';
      case 'In Progress': return 'pi pi-spinner';
      case 'Completed': return 'pi pi-check-circle';
      default: return 'pi pi-file';
    }
  }

  toggleTaskEditing(task: Task) {
    task.isEditing = !task.isEditing;
  }

  saveTask(task: Task) {
    task.isEditing = false;
  }

  toggleTaskForm() {
    this.showTaskForm = !this.showTaskForm;
  }

  toggleTaskExpand(task: Task) {
    task.isExpanded = !task.isExpanded;
  }

  // createTask() {
  //   if (this.newTask.title && this.newTask.assignedTo) {
  //     this.tasks.unshift({ 
  //       ...this.newTask, 
  //       user: this.newTask.assignedTo.charAt(0), 
  //       isExpanded: false 
  //     });
  //     this.newTask = { title: '', assignedTo: '', dueDate: new Date(), status: 'Pending', details: '', user: '', isExpanded: true };
  //     this.showTaskForm = false;
  //   }
  // }

  selectedUser: any = { name: 'John Doe', avatar: 'https://i.pravatar.cc/40' };
  users = [
    { name: 'John Doe', avatar: 'https://i.pravatar.cc/40' },
    { name: 'Jane Smith', avatar: 'https://i.pravatar.cc/41' },
    { name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/42' }
  ];
  filteredUsers: any[] = [];
  showAssigneeDropdown: boolean = false;

  filterUsers(event: any) {
    const query = event.query.toLowerCase();
    this.filteredUsers = this.users.filter(user => user.name.toLowerCase().includes(query));
  }

  tasks = [
    {
      title: "Follow-up Email",
      timestamp: "2 hours ago",
      description: "Please find the attached contract for review. Let me know if any changes are required.",
      attachments: [{ name: "contract.pdf" }, { name: "invoice.jpg" }],
      user: "John Doe",
      isExpanded: false,
      comments: [
        { user: "Jane Smith", text: "Got it! Will check and revert.", time: "1 hour ago", avatar: "https://i.pravatar.cc/40" },
        { user: "Mike Johnson", text: "Reviewed the contract. Looks good!", time: "30 mins ago", avatar: "https://i.pravatar.cc/41" }
      ],
      showComments: false,
      newComment: ""
    },{
      title: "Follow-up Email",
      timestamp: "2 hours ago",
      description: "Please find the attached contract for review. Let me know if any changes are required.",
      attachments: [{ name: "contract.pdf" }, { name: "invoice.jpg" }],
      user: "John Doe",
      isExpanded: false,
      comments: [
        { user: "Jane Smith", text: "Got it! Will check and revert.", time: "1 hour ago", avatar: "https://i.pravatar.cc/40" },
        { user: "Mike Johnson", text: "Reviewed the contract. Looks good!", time: "30 mins ago", avatar: "https://i.pravatar.cc/41" }
      ],
      showComments: false,
      newComment: ""
    },{
      title: "Follow-up Email",
      timestamp: "2 hours ago",
      description: "Please find the attached contract for review. Let me know if any changes are required.",
      attachments: [{ name: "contract.pdf" }, { name: "invoice.jpg" }],
      user: "John Doe",
      isExpanded: false,
      comments: [
        { user: "Jane Smith", text: "Got it! Will check and revert.", time: "1 hour ago", avatar: "https://i.pravatar.cc/40" },
        { user: "Mike Johnson", text: "Reviewed the contract. Looks good!", time: "30 mins ago", avatar: "https://i.pravatar.cc/41" }
      ],
      showComments: false,
      newComment: ""
    }
  ];

  toggleComments(task: any) {
    task.showComments = !task.showComments;
  }

  addComment(task: any) {
    if (task.newComment.trim() !== "") {
      task.comments.push({
        user: "John Doe",
        text: task.newComment,
        time: "Just now",
        avatar: "https://i.pravatar.cc/42"
      });
      task.newComment = "";
    }
  }
  

  triggerFileUpload() {
    this.fileUploadInput?.nativeElement.click();
  }

  attachFile(event: any) {
    const files = event?.target?.files || event?.dataTransfer?.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        console.log("File dropped or selected:", files[i]);
      }
    }
    if (event.target) {
      event.target.value = '';
    }
    this.isDragging = false;
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    this.attachFile(event);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    this.isDragging = false;
  }
}
