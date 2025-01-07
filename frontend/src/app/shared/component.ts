import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({providedIn:'root'})
export class ComponentsProvider {
    constructor( private messageService: MessageService) {
    }

    showToast(text: any, type: 'success' | 'warn' | 'error' | 'info' = 'info') {
        this.messageService.add({ severity:type, summary: type?.toUpperCase(), detail: text });
    }
}