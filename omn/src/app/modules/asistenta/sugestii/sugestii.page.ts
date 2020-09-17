import { Component, OnInit, HostBinding } from '@angular/core';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SugestiiService } from '../services/sugestii.service';

@Component( {
    selector: 'app-sugestii',
    templateUrl: './sugestii.page.html',
    styleUrls: [ './sugestii.page.scss' ],
} )
export class SugestiiPage implements OnInit {
    @HostBinding( 'class' ) color = 'ion-color-white-page';
    headerConfig = subPageHeaderDefault( 'Sugestii' );
    suggestion: FormGroup;
    disableBtn = true;
    ionIconRatingData = [
        {
            name: 'md-angry',
            rate: 1,
            color: 'omn-medium',
        },
        {
            name: 'md-disappointed',
            rate: 2,
            color: 'omn-medium',
        },
        {
            name: 'md-indifferent',
            rate: 3,
            color: 'omn-medium',
        },
        {
            name: 'md-pleased',
            rate: 4,
            color: 'omn-medium',
        },
        {
            name: 'md-happy',
            rate: 5,
            color: 'omn-medium',
        },
    ];
    constructor(
        private formBuilder: FormBuilder,
        private sugestiiS: SugestiiService
    ) { }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.suggestion = this.formBuilder.group( {
            userMessage: [ '', [ Validators.required, Validators.minLength( 50 ) ] ],
            userSuggestionRating: [ '', [ Validators.required ] ],
        } );

    }
    setIconRatingValue( event: any ) {
        // reset icon class (if already set before)
        this.resetAllIconColorState();
        // get selected icon
        const getIcon = this.ionIconRatingData.find( ( data ) => data.name.toLowerCase() === event.target.name.toLowerCase() );
        // patchValue or setValue can be used to update Reactiveform
        this.suggestion.patchValue( {
            userSuggestionRating: getIcon.rate,
        } );
        // update color of icon
        getIcon.color = 'success';

    }
    resetAllIconColorState() {
        // omn-medium
        this.ionIconRatingData.forEach( icon => icon.color = 'omn-medium' );
    }
    process() {
        // continue other processes
        // check if form is valid
        if ( this.suggestion.valid ) {
            const sugestiiData = {
                message: this.suggestion.controls.userMessage.value,
                suggestion: this.suggestion.controls.userSuggestionRating.value
            };
            this.sugestiiS.postSugestii( sugestiiData ).subscribe(
                response => { },
                error => { }
            );
        }

    }
}
