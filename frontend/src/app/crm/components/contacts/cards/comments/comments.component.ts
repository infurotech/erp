import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent {
  @ViewChild('fileUploadInput') fileUploadInput!: ElementRef<HTMLInputElement>;
  newComment: string = "";
  isDragging = false;

  @Input() comments: any[] = [
    { user: "Jane Smith", text: "Got it! Will check and revert.", time: "1 hour ago", avatar: "https://i.pravatar.cc/40",
      attachments: [{ name: "contract.pdf" }, { name: "invoice.jpg" }], },
    { user: "Mike Johnson", text: "Reviewed the contract. Looks good!", time: "30 mins ago", avatar: "https://i.pravatar.cc/41",
      attachments: [{ name: "contract.pdf" }, { name: "invoice.jpg" }], }
  ];

  sendComment(event: Event) {
    event.preventDefault();
    if (this.newComment.trim()) {
      console.log('Comment sent:', this.newComment);
      this.newComment = '';
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
