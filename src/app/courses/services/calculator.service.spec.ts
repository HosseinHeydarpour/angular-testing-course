import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe("CalculatorService", () => {
  // SPECIFICATION
  it("should add two numbers", () => {
    // Test is not ready to get executed we use pending()
    // pending();

    // Prefered apporach for creating unit service
    // The only actual instance should be the unit it self
    // not other dependencies
    // const logger = new LoggerService();
    // This is a complete fake implementation of the logger service
    const logger = jasmine.createSpyObj("LoggerService", ["log"]);

    // we cannot pass an empty array like this
    // const logger = jasmine.createSpyObj("LoggerService", []);

    // Can comment this because it is alreeady being spied on by jasmine
    // spyOn(logger, "log");

    // logger.log.and.returnValue()

    const calculator = new CalculatorService(logger);

    const result = calculator.add(2, 2);

    expect(result).toBe(4);

    expect(logger.log).toHaveBeenCalledTimes(1);
  });

  // SPECIFICATION
  it("should subtract two numbers", () => {
    // Test is not ready to get executed we use pending()
    // pending();
    // To Simulate a failing text
    // fail();.

    const calculator = new CalculatorService(new LoggerService());

    const result = calculator.subtract(2, 2);

    expect(result).toBe(0, "unexpected subtarction result");
  });
});
