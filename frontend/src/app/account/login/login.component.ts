import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../common/layout/service/app.layout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit {

    loginForm!: FormGroup;
    submitted = false;
    valCheck: string[] = ['remember'];

    constructor(
        public layoutService: LayoutService, 
        private loginService: LoginService,
        private router: Router,
        private fb: FormBuilder) { }

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // Convenience getter for form fields
    get f() {
        return this.loginForm.controls;
    }

    async onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }
        const response = await this.loginService.login(this.loginForm.value).toPromise();
        if(response) {  
            this.router.navigate(['/login']);
        }
    }
}
