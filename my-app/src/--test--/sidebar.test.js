import { screen } from "@testing-library/react";
import { renderWithProviders } from "./test-utils";
import Sidebar from "../app/components/sidebar/sidebar";

describe("sidebar", () => {
  let preloadedState;
  
  preloadedState = {
    user: {
      user: {
        id: "1",
        name: "Test User",
        table: [
          { id: "1", name: "Table 1", list: [] },
          { id: "2", name: "Table 2", list: [] },
          { id: "3", name: "Table 3", list: [] },
          { id: "4", name: "Table 4", list: [] },
        ],
      },
    },
    sidebar: {
      isOpen: true,
    },
  }; 
  it("should render sidebar", () => {
    renderWithProviders(<Sidebar />, { preloadedState });
    expect(screen.getByText("mes tableaux")).toBeInTheDocument();
  }); 
  // vérifie que les titres sont présents
  it("should render children", () => {
    renderWithProviders(<Sidebar />, { preloadedState });
    const titles = screen.getAllByText(/Table \d/);
   
    expect(titles).toHaveLength(preloadedState.user.user.table.length);
    // vérifie le contenu de chaque titre
    preloadedState.user.user.table.forEach((table, index) => {
      expect(titles[index]).toHaveTextContent(table.name);
    });
  });
});
