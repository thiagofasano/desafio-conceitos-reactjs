import React from "react";
import { render, fireEvent, act, waitForElement } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import api from "../services/api";

const apiMock = new MockAdapter(api);

import App from "../App";

describe("App component", () => {
  it("should be able to add new repository", async () => {
    const { getByText, getByTestId } = render(<App />);

    apiMock.onGet("/repositories").reply(200, [])
           .onPost("/repositories").reply(200, {})
           .onGet("/repositories").reply(200, [
            {
              id: "123",
              url: "https://github.com/josepholiveira",
              title: "Desafio ReactJS",
              techs: ["React", "Node.js"],
            },
          ]);

    fireEvent.click(getByText("Adicionar"));

    expect(getByTestId("repository-list")).toContainElement(
      await waitForElement(() => getByText("Desafio ReactJS"))
    );
  });

  it("should be able to remove repository", async () => {
    const { getByText, getByTestId } = render(<App />);

    apiMock.onGet("repositories").reply(200, [
      {
        id: "123",
        url: "https://github.com/josepholiveira",
        title: "Desafio ReactJS",
        techs: ["React", "Node.js"],
      },
    ]);

    apiMock.onDelete("repositories/123").reply(204);

    await waitForElement(() => fireEvent.click(getByText("Remover")));

    expect(getByTestId("repository-list")).toBeEmpty();
  });
});
