import axios from "axios";
import { fetch } from "./fetch";
import { act } from "react-dom/test-utils";

jest.mock("axios");
jest.useFakeTimers();

describe("fetch", () => {
  it("fetches successfully data from an API", async () => {
    const data = {
      data: {
        hits: [
          {
            objectID: "1",
            title: "a"
          },
          {
            objectID: "2",
            title: "b"
          }
        ]
      }
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    expect(fetch("react")).resolves.toEqual(data);
  });

  it("returns message after timeout", async () => {
    const TIMEOUT = 5000;
    const data = {
      data: {
        hits: [
          {
            objectID: "1",
            title: "a"
          },
          {
            objectID: "2",
            title: "b"
          }
        ]
      }
    };
    const timeoutMessage = { success: false, timeout: true };

    axios.get.mockImplementationOnce(url => {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(data), TIMEOUT * 2);
      });
    });

    const request = fetch("react", TIMEOUT);

    jest.advanceTimersByTime(TIMEOUT);

    expect(request).resolves.toEqual(timeoutMessage);
  });
});
