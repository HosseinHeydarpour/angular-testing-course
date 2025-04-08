import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe("CalculatorService", () => {
  // SPECIFICATION
  it("should add two numbers", () => {
    // Test is not ready to get executed we use pending()
    // pending();

    const calculator = new CalculatorService(new LoggerService());

    const result = calculator.add(2, 2);

    expect(result).toBe(4);
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
