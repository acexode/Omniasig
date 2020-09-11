import { Component, OnInit, HostBinding, OnDestroy, Renderer2, ViewChildren, QueryList } from '@angular/core';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IonIcon } from '@ionic/angular';

@Component( {
    selector: 'app-sugestii',
    templateUrl: './sugestii.page.html',
    styleUrls: [ './sugestii.page.scss' ],
} )
export class SugestiiPage implements OnInit, OnDestroy {
    @HostBinding( 'class' ) color = 'ion-color-white-page';
    headerConfig = subPageHeaderDefault( 'Sugestii' );
    @ViewChildren( IonIcon ) rateIcons: QueryList<IonIcon>;
    rating: FormGroup;
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
        private renderer: Renderer2
    ) { }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.rating = this.formBuilder.group( {
            userComment: [ '', [ Validators.required ] ],
            userRating: [
                '',
            ],
        } );

        this.sub = this.rating.valueChanges.subscribe( ( value ) => {
            this.onChangeBtnStatus( value );
        } );
    }
    onChangeBtnStatus( value: { userComment: string, userRating: number; } ) {
        // this.disableBtn
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
        this.rating.patchValue( {
            userRating: getRate.rate,
        } );
        this.renderer.setAttribute( event.target, 'color', 'success' );

    }
    resetAllIconColor() {
        this.rateIcons.forEach( icon => icon.color = 'omn-medium' );
    }
    process() {
        // continue other processes
        // this.rating.controls.userComment.value
        // this.rating.controls.userRating.value
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
