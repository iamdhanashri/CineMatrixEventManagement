// components/participant-management/participant-management.component.ts

import { Component, OnInit } from '@angular/core';
import { Participant } from '../../models/participant.model';
import { ParticipantService } from '../../services/participant.service';

@Component({
  selector: 'app-participant-management',
  templateUrl: './participant-management.component.html',
  styleUrls: ['./participant-management.component.css'],
})
export class ParticipantManagementComponent implements OnInit {
  participants: Participant[] = [];
  participantForm: FormGroup;

  constructor(private participantService: ParticipantService, private formBuilder: FormBuilder) {
    this.participantForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // Add other form fields as needed for the Participant entity
    });
  }

  ngOnInit(): void {
    this.getAllParticipants();
  }

  getAllParticipants(): void {
    this.participantService.getAllParticipants().subscribe(
      (participants) => {
        this.participants = participants;
      },
      (error) => {
        console.error('Error while fetching participants:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.participantForm.invalid) {
      return;
    }

    const participantData: Participant = this.participantForm.value;
    this.participantService.createParticipant(participantData).subscribe(
      (createdParticipant) => {
        this.participants.push(createdParticipant);
        this.participantForm.reset();
      },
      (error) => {
        console.error('Error while creating participant:', error);
      }
    );
  }

  deleteParticipant(participantId: string): void {
    this.participantService.deleteParticipant(participantId).subscribe(
      () => {
        this.participants = this.participants.filter((participant) => participant._id !== participantId);
      },
      (error) => {
        console.error('Error while deleting participant:', error);
      }
    );
  }
}
