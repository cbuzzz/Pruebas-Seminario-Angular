import { Component, OnInit } from '@angular/core';
import { ExperienceService } from '../services/experience.service';
import { Experience } from '../models/experience.model';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  experiences: Experience[] = [];

  constructor(private experienceService: ExperienceService) {}

  ngOnInit(): void {
    this.loadExperiences();
  }

  loadExperiences(): void {
    this.experienceService.getExperiences().subscribe((data) => {
      this.experiences = data;
    });
  }
}
