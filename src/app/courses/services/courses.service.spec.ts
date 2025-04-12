import { TestBed } from "@angular/core/testing";
import { CoursesService } from "./courses.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { COURSES, findLessonsForCourse } from "../../../../server/db-data";
import { Course } from "../model/course";
import { HttpErrorResponse } from "@angular/common/http";

describe("CoursesService", () => {
  let coursesService: CoursesService,
    httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService],
    });

    coursesService = TestBed.get(CoursesService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it("should retrieve all courses", () => {
    coursesService.findAllCourses().subscribe({
      next: (courses) => {
        expect(courses).toBeTruthy("No Courses Returned");
        expect(courses.length).toBe(12, "incorrect number of courses");

        const course = courses.find((course) => course.id == 12);

        expect(course.titles.description).toBe("Angular Testing Course");
      },
    });

    const req = httpTestingController.expectOne("/api/courses");
    expect(req.request.method).toEqual("GET");

    req.flush({ payload: Object.values(COURSES) });

    // httpTestingController.verify();
  });

  it("should return a sinlge course by id", () => {
    coursesService.findCourseById(12).subscribe({
      next: (course) => {
        expect(course).toBeTruthy("No Course Was Found");
        expect(course.id).toBe(12);
      },
    });

    const req = httpTestingController.expectOne("/api/courses/12");

    expect(req.request.method).toBe("GET");

    req.flush(COURSES[12]);

    // // Verifies that no unmatched or unexpected HTTP requests are outstanding
    // httpTestingController.verify();
  });

  it("should save the course data", () => {
    const changes: Partial<Course> = {
      titles: { description: "Testing Course" },
    };

    coursesService.saveCourse(12, changes).subscribe({
      next: (course) => {
        expect(course.id).toBe(12);
      },
    });

    const req = httpTestingController.expectOne("/api/courses/12");

    expect(req.request.method).toEqual("PUT");

    expect(req.request.body.titles.description).toEqual(
      changes.titles.description
    );

    req.flush({
      ...COURSES[12],
      ...changes,
    });
  });

  it("should give an error if save course fails", () => {
    const changes: Partial<Course> = {
      titles: { description: "Testing Course" },
    };
    coursesService.saveCourse(12, changes).subscribe({
      next: (course) => fail("the save course should have failed"),
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
      },
    });

    const req = httpTestingController.expectOne("/api/courses/12");
    expect(req.request.method).toEqual("PUT");

    req.flush("Save course failed", {
      status: 500,
      statusText: "Internal Server Error",
    });
  });

  it("should find a list of lessons", () => {
    coursesService.findLessons(12).subscribe({
      next: (lessons) => {
        expect(lessons).toBeTruthy();

        expect(lessons.length).toBe(3);
      },
    });

    const req = httpTestingController.expectOne(
      (req) => req.url === "/api/lessons"
    );

    expect(req.request.method).toEqual("GET");

    expect(req.request.params.get("courseId")).toEqual("12");

    expect(req.request.params.get("filter")).toEqual("");

    expect(req.request.params.get("sortOrder")).toEqual("asc");

    expect(req.request.params.get("pageNumber")).toEqual("0");

    expect(req.request.params.get("pageSize")).toEqual("3");

    req.flush({
      payload: findLessonsForCourse(12).slice(0, 3),
    });
  });

  afterEach(() => {
    // Verifies that no unmatched or unexpected HTTP requests are outstanding
    httpTestingController.verify();
  });
});
