// components/event-management/event-management.component.ts

import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event.model';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.css'],
})
export class EventManagementComponent implements OnInit {
  events: Event[] = [];
  eventForm: FormGroup;

  constructor(private eventService: EventService, private formBuilder: FormBuilder) {
    this.eventForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      // Add other form fields as needed for the Event entity
    });
  }

  ngOnInit(): void {
    this.getAllEvents();
  }

  getAllEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (events) => {
        this.events = events;
      },
      (error) => {
        console.error('Error while fetching events:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.eventForm.invalid) {
      return;
    }

    const eventData: Event = this.eventForm.value;
    this.eventService.createEvent(eventData).subscribe(
      (createdEvent) => {
        this.events.push(createdEvent);
        this.eventForm.reset();
      },
      (error) => {
        console.error('Error while creating event:', error);
      }
    );
  }

  deleteEvent(eventId: string): void {
    this.eventService.deleteEvent(eventId).subscribe(
      () => {
        this.events = this.events.filter((event) => event._id !== eventId);
      },
      (error) => {
        console.error('Error while deleting event:', error);
      }
    );
  }
}
