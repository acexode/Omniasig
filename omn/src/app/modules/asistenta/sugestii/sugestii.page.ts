import { Component, OnInit, HostBinding, OnDestroy, Renderer2, ViewChildren, QueryList } from '@angular/core';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IonIcon } from '@ionic/angular';
import { SugestiiService } from '../services/sugestii.service';

@Component( {
    selector: 'app-sugestii',
    templateUrl: './sugestii.page.html',
    styleUrls: [ './sugestii.page.scss' ],
} )
export class SugestiiPage implements OnInit, OnDestroy {
    @HostBinding( 'class' ) color = 'ion-color-white-page';
    headerConfig = subPageHeaderDefault( 'Sugestii' );
    @ViewChildren( IonIcon ) rateIcons: QueryList<IonIcon>;
    suggestion: FormGroup;
    sub: Subscription;
    disableBtn = true;
    ionIconRatingData = [
        {
            name: 'md-angry',
            rate: 1
        },
        {
            name: 'md-disappointed',
            rate: 2
        },
        {
            name: 'md-indifferent',
            rate: 3
        },
        {
            name: 'md-pleased',
            rate: 4
        },
        {
            name: 'md-happy',
            rate: 5
        },
    ];
    constructor(
        private formBuilder: FormBuilder,
        private renderer: Renderer2,
        private sugestiiS: SugestiiService
    ) { }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.suggestion = this.formBuilder.group( {
            userComment: [ '', [ Validators.required ] ],
            userRating: [
                '',
            ],
        } );

        this.sub = this.suggestion.valueChanges.subscribe( ( value ) => {
            this.onChangeBtnStatus( value );
        } );
    }
    onChangeBtnStatus( value: { userComment: string, userRating: number; } ) {
        // disable Button
        if ( value.userComment.length > 50 ) {
            this.disableBtn = false;
        } else {
            this.disableBtn = true;
        }
    }
    setIconRatingValue( event: any ) {
        this.resetAllIconColor();
        const getRate = this.ionIconRatingData.find( ( data ) => data.name.toLowerCase() === event.target.name.toLowerCase() );
        // patchValue or setValue
        this.suggestion.patchValue( {
            userRating: getRate.rate,
        } );
        this.renderer.setAttribute( event.target, 'color', 'success' );

    }
    resetAllIconColor() {
        this.rateIcons.forEach( icon => icon.color = 'omn-medium' );
    }
    process() {
        // continue other processes
        // this.suggestion.controls.userComment.value
        // this.suggestion.controls.userRating.value
        const sugestiiData = {
            message: this.suggestion.controls.userComment.value,
            rating: this.suggestion.controls.userRating.value
        };
        this.sugestiiS.postSugestii( sugestiiData ).subscribe(
            response => { },
            error => { }
        );
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
