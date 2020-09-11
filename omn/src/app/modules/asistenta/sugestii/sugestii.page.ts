import { Component, OnInit, HostBinding, OnDestroy, Renderer2, ViewChildren, ElementRef, AfterViewInit, QueryList } from '@angular/core';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IonIcon } from '@ionic/angular';

@Component( {
    selector: 'app-sugestii',
    templateUrl: './sugestii.page.html',
    styleUrls: [ './sugestii.page.scss' ],
} )
export class SugestiiPage implements OnInit, OnDestroy, AfterViewInit {
    @HostBinding( 'class' ) color = 'ion-color-white-page';
    headerConfig = subPageHeaderDefault( 'Sugestii' );
    @ViewChildren( IonIcon ) rateIcons: QueryList<IonIcon>;
    rating: FormGroup;
    sub: Subscription;
    ionIconRatingData = [
        {
            name: 'happy',
            rate: 5
        },
        {
            name: 'pleased',
            rate: 4
        },
        {
            name: 'indifferent',
            rate: 3
        },
        {
            name: 'disappointed',
            rate: 2
        },
        {
            name: 'angry',
            rate: 1
        }
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
            comment: [ '', [ Validators.required ] ],
            userRating: [
                '',
            ],
        } );

        this.sub = this.rating.valueChanges.subscribe( ( value ) => {
            console.log( value );
        } );
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
    ngAfterViewInit() {
        const f = this.rateIcons.toArray();
        console.log( f, f[ 0 ].color );
    }
    resetAllIconColor() {
        this.rateIcons.forEach( icon => icon.color = 'omn-medium' );
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
