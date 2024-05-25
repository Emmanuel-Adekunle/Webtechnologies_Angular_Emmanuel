import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HomeComponent]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle answer visibility when showAnswer is called', () => {
    const firstQuestion = component.DIYQuestions[0];
    expect(firstQuestion.answerHidden).toBe(true);

    component.showAnswer(0);
    expect(firstQuestion.answerHidden).toBe(false);

    component.showAnswer(0);
    expect(firstQuestion.answerHidden).toBe(true);
  });
});
