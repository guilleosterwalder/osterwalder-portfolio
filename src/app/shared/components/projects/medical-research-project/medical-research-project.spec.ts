import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalResearchProject } from './medical-research-project';

describe('MedicalResearchProject', () => {
  let component: MedicalResearchProject;
  let fixture: ComponentFixture<MedicalResearchProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalResearchProject],
    }).compileComponents();

    fixture = TestBed.createComponent(MedicalResearchProject);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
