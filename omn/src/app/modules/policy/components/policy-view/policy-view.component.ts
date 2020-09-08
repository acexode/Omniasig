import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { subPageHeaderCustom } from './../../../../shared/data/sub-page-header-custom';
import { PolicyDataService } from './../../services/policy-data.service';
import { Calendar } from '@ionic-native/calendar/ngx';
import { CalendarOptions, CalendarEntry } from '../models/calendar-entry';
@Component( {
    selector: 'app-policy-view',
    templateUrl: './policy-view.component.html',
    styleUrls: [ './policy-view.component.scss' ],
} )
export class PolicyViewComponent implements OnInit {
    headerConfig = subPageHeaderCustom( 'Polița PAD', 'bg-state' );
    isAmplus = false;

    date = '2020.09.30';

    calanderEntryOptions: CalendarOptions = {
        firstReminderMinutes: 15,
        calendarName: 'policy',
        calendarId: 1,
        url: 'test.com',
    };

    calEntry: CalendarEntry = {
        title: 'policy Expiry Date',
        location: 'Romania',
        notes: 'Testing',
        startDate: this.getEightDayBeforeExpiryDate( this.date ),
        endDate: new Date( this.date ),
        options: this.calanderEntryOptions
    };


    constructor(
        private route: ActivatedRoute,
        private policyDataService: PolicyDataService,
        private navCtrl: NavController,
        private calendar: Calendar
    ) {
        this.route.params.subscribe( ( params: any ) => {
            this.getPolicyById( params.id );
        } );
    }

    ngOnInit(): void { }

    getPolicyById( id ) {
        this.policyDataService.getSinglePolicyById( id ).subscribe( ( policy ) => {
            if ( policy ) {
            } else {
                this.navCtrl.navigateBack( 'policy' );
            }
        } );
    }

    /* for Notification */
    getEightDayBeforeExpiryDate( date: string ) {
        const expiryDate = new Date( date );
        const eightDaysFromExpiryDate = new Date( expiryDate.getTime() - 8 * 24 * 60 * 60 * 1000 );
        return eightDaysFromExpiryDate;
    }

    addCalenderEntry() {
        this.calendar.createEventWithOptions(
            this.calEntry.title,
            this.calEntry.location,
            this.calEntry.notes,
            this.calEntry.startDate,
            this.calEntry.endDate,
            this.calanderEntryOptions
        ).then(
            ( msg ) => { },
            ( err ) => { }
        );
    }


}
