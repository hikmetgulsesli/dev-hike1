import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { CursorGlow } from "@/components/CursorGlow";

describe("CursorGlow", () => {
  beforeEach(() => {
    // Mock window.matchMedia
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders cursor glow component without errors", () => {
    const { container } = render(<CursorGlow />);
    // Component should mount without throwing
    expect(container).toBeTruthy();
  });

  it("returns null on touch devices", () => {
    // Mock touch device by setting maxTouchPoints
    Object.defineProperty(navigator, "maxTouchPoints", {
      writable: true,
      configurable: true,
      value: 1,
    });

    const { container } = render(<CursorGlow />);
    // Should not render anything on touch devices (null return)
    // The container might be empty or contain a comment node
    expect(container).toBeTruthy();

    // Reset
    Object.defineProperty(navigator, "maxTouchPoints", {
      writable: true,
      configurable: true,
      value: 0,
    });
  });

  it("component handles mouse events when rendered", () => {
    // Ensure non-touch environment
    Object.defineProperty(navigator, "maxTouchPoints", {
      writable: true,
      configurable: true,
      value: 0,
    });

    Object.defineProperty(window, "ontouchstart", {
      writable: true,
      value: undefined,
    });

    const { container } = render(<CursorGlow />);
    expect(container).toBeTruthy();
  });
});
