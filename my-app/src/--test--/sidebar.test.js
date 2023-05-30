import { screen} from "@testing-library/react"
import { renderWithProviders } from "./test-utils";
import Sidebar from "../app/components/sidebar/sidebar";



describe('sidebar', () => {
    it('should render sidebar', () => {
        
       renderWithProviders(<Sidebar />);
        expect(screen.getByText('mes tableaux')).toBeInTheDocument();
    });
}
);