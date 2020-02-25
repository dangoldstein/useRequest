import React from "react";
import useRequest from "./useRequest";

import axios from "axios";
import { renderHook } from "@testing-library/react-hooks";

jest.mock("axios");
const unresolvingPromise = new Promise((resolve, reject) => {
  // do nothing
});

describe("useRequest", () => {
  it("has initial state of loading", async () => {
    axios.get.mockImplementationOnce(() => unresolvingPromise);

    const { result } = renderHook(() => useRequest("/some/resource"));

    expect(result.current).toEqual([null, null, true]);
  });

  it("returns data once it arrives", async () => {
    const fakeData = { username: "abaGanuv", password: "stolen" };
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: fakeData }));

    const { result, waitForNextUpdate } = renderHook(() =>
      useRequest("/some/resource")
    );

    await waitForNextUpdate();
    expect(result.current).toEqual([fakeData, null, false]);
  });

  it("returns error when request fails", async () => {
    const error = { status: 200, message: "handsom father" };
    axios.get.mockImplementationOnce(() => Promise.reject(error));

    const { result, waitForNextUpdate } = renderHook(() =>
      useRequest("/some/resource")
    );

    await waitForNextUpdate();
    expect(result.current).toEqual([null, error, false]);
  });

  it("can have a default value", async () => {
    const defaultValue = [];
    axios.get.mockImplementationOnce(() => unresolvingPromise);
    const { result } = renderHook(() =>
      useRequest("/some/resource", defaultValue)
    );

    expect(result.current).toEqual([defaultValue, null, true]);
  });

  it("can prepare the data before rerendering", async () => {
    const fakeData = { firstName: "stolen", lastName: "father" };
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: fakeData }));

    const { result, waitForNextUpdate } = renderHook(() =>
      useRequest(
        "/some/resource",
        null,
        ({ firstName, lastName }) => `${firstName} ${lastName}`
      )
    );

    await waitForNextUpdate();
    expect(result.current).toEqual(["stolen father", null, false]);
  });

  it("is loading when url changes", async () => {
    const fakeData = { username: "abaGanuv", password: "stolen" };
    axios.get.mockImplementation(() => Promise.resolve({ data: fakeData }));

    const { result, waitForNextUpdate, rerender } = renderHook(
      url => useRequest(url),
      { initialProps: "/some/resource" }
    );

    axios.get.mockImplementation(() => unresolvingPromise);

    await waitForNextUpdate();
    rerender("/some/other/resource");

    expect(result.current).toEqual([null, null, true]);
  });

  it("loads new data when url changes", async () => {
    const fakeData = { username: "abaGanuv", password: "stolen" };
    axios.get.mockImplementation(() => Promise.resolve({ data: fakeData }));

    const { result, waitForNextUpdate, rerender } = renderHook(
      url => useRequest(url),
      { initialProps: "/some/resource" }
    );

    const fakeData2 = { username: "dangoldstein", password: "123456" };
    axios.get.mockImplementation(() => Promise.resolve({ data: fakeData2 }));

    await waitForNextUpdate();
    rerender("/some/other/resource");

    await waitForNextUpdate();
    expect(result.current).toEqual([fakeData2, null, false]);
  });
});
