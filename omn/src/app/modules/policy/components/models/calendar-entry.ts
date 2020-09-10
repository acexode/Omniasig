
export interface CalendarOptions {
    id?: string;
    firstReminderMinutes?: number;
    secondReminderMinutes?: number;
    recurrence?: string;
    recurrenceInterval?: number;
    recurrenceEndDate?: Date;
    calendarName?: string;
    calendarId?: number;
    url?: string;
}

export interface CalendarEntry {
    title?: string;
    location?: string;
    notes?: string;
    startDate?: Date;
    endDate?: Date;
    options?: CalendarOptions;
}
