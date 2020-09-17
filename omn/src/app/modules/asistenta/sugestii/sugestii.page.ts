import {
    Component,
    HostBinding,
    OnInit,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonIcon } from '@ionic/angular';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { SugestiiService } from '../services/sugestii.service';

@Component( {
    selector: 'app-sugestii',
    templateUrl: './sugestii.page.html',
    styleUrls: [ './sugestii.page.scss' ],
} )
export class SugestiiPage implements OnInit {
    @HostBinding( 'class' ) color = 'ion-color-white-page';
    headerConfig = subPageHeaderDefault( 'Sugestii' );
    @ViewChildren( IonIcon ) rateIcons: QueryList<IonIcon>;
    suggestion: FormGroup;
    disableBtn = true;
    ionIconRatingData = [
        {
            name: 'md-happy',
            rate: 5,
        },
        {
            name: 'md-pleased',
            rate: 4,
        },
        {
            name: 'md-indifferent',
            rate: 3,
        },
        {
            name: 'md-disappointed',
            rate: 2,
        },
        {
            name: 'md-angry',
            rate: 1,
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
            userComment: [ '', [ Validators.required ] ],
            userRating: [ '', [ Validators.required ] ],
        } );
    }

    setIconRatingValue( event: any ) {
        // patchValue or setValue can be used to update Reactiveform
        if ( this.userRating ) {
            this.userRating.patchValue( event );
        }
    }

    process() {
        // continue other processes
        // check if form is valid
        if ( this.suggestion.valid ) {
            const sugestiiData = {
                message: this.suggestion.get( 'userComment' ).value,
                suggestion: this.suggestion.get( 'userRating' ).value,
            };
            this.disableBtn = true;
            this.sugestiiS.postSugestii( sugestiiData ).subscribe(
                ( response ) => {
                    // We don't want to submit the same data all over again.
                    this.suggestion.reset();
                },
                ( error ) => { },
                () => {
                    this.disableBtn = false;
                }
            );
        } else {
            this.suggestion.updateValueAndValidity();
        }
    }

    get userRating() {
        return this.suggestion.get( 'userRating' );
    }
}
