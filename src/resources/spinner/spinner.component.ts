import { Component} from '@angular/core';

@Component({
    selector: 'app-loading-spinner',
    template: '<div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>',
    styleUrls: ['../spinner/spinner.component.scss']
})
export class SpinnerComponent {}
