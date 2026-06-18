import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IotProject } from './iot-project';

describe('IotProject', () => {
  let component: IotProject;
  let fixture: ComponentFixture<IotProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IotProject],
    }).compileComponents();

    fixture = TestBed.createComponent(IotProject);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
