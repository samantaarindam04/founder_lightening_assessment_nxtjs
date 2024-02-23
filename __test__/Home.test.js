import { render, screen, waitFor } from '@testing-library/react';
import { getAllUsers } from '../src/actions/_actions';
import Home from '@/app/page';

jest.mock('../src/actions/_actions', () => ({
    getAllUsers: jest.fn(),
}));

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    Suspense: ({ children }) => children,
}));

jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    }
}));

describe('Home Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders loading indicator while fetching users', async () => {
        getAllUsers.mockResolvedValueOnce([]);
        render(await Home());
        await waitFor(() => expect(screen.queryByTestId('loading-indicator')).toBeNull());
    });

    it('renders Usercard component with users data', async () => {
        const mockUsers = [
          { id: 1, name: 'User 1' },
          { id: 2, name: 'User 2' },
        ];
        getAllUsers.mockResolvedValueOnce(mockUsers);
        render(await Home());
    
        await waitFor(() => expect(screen.getByTestId('usercard')).toBeInTheDocument());
      });

    it('renders custom message when no users are returned', async () => {
        const customMessage = 'No users found';
        process.env.NO_DATA_FOUND = customMessage;
        getAllUsers.mockResolvedValueOnce([]);
        render(await Home());
        await waitFor(() => expect(screen.getByText(customMessage)).toBeInTheDocument());
    });

    afterAll(() => {
        delete process.env.NO_DATA_FOUND;
    });
});

