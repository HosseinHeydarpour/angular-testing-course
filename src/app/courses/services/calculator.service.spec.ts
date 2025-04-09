import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe("CalculatorService", () => {
  let calculator: CalculatorService, loggerSpy: any;

  // It will run before each spec we have to it and it will run twice
  beforeEach(() => {
    console.log("Calling Before Each");

    loggerSpy = jasmine.createSpyObj("LoggerService", ["log"]);
    calculator = new CalculatorService(loggerSpy);
  });

  // SPECIFICATION
  it("should add two numbers", () => {
    // Test is not ready to get executed we use pending()
    // pending();

    // Prefered apporach for creating unit service
    // The only actual instance should be the unit it self
    // not other dependencies
    // const logger = new LoggerService();
    // This is a complete fake implementation of the logger service

    // we cannot pass an empty array like this
    // const logger = jasmine.createSpyObj("LoggerService", []);

    // Can comment this because it is alreeady being spied on by jasmine
    // spyOn(logger, "log");

    // logger.log.and.returnValue()

    console.log("Add test");

    const result = calculator.add(2, 2);

    expect(result).toBe(4);

    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  // SPECIFICATION
  it("should subtract two numbers", () => {
    // Test is not ready to get executed we use pending()
    // pending();
    // To Simulate a failing text
    // fail();.

    console.log("Subtract test");
    const result = calculator.subtract(2, 2);

    expect(result).toBe(0, "unexpected subtarction result");

    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
});
