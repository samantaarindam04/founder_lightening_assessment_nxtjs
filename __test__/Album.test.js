import { render, screen, waitFor } from '@testing-library/react';
import { getAllAlbums } from '../src/actions/_actions';
import Album from '@/app/album/[id]/page';

jest.mock('../src/actions/_actions', () => ({
    getAllAlbums: jest.fn(),
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

describe('Album Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders loading indicator while fetching album', async () => {
        getAllAlbums.mockResolvedValueOnce([]);
        render(await Album({params: {id: 'testId' }, searchParams:{ userId: 'testUserId' }}));
        await waitFor(() => expect(screen.queryByTestId('loading-indicator')).toBeNull());
    });

    it('renders albumcard component with album data', async () => {
        const mockAlbums = [
            { id: 1, title: 'Album 1' },
            { id: 2, title: 'Album 2' },
        ];
        getAllAlbums.mockResolvedValueOnce(mockAlbums);
        render(await Album({params: {id: 'testId' }, searchParams:{ userId: 'testUserId' }}));

        await waitFor(() => expect(screen.getByTestId('albumcard')).toBeInTheDocument());
    });

    it('renders custom message when no album are returned', async () => {
        const customMessage = 'No data found';
        process.env.NO_DATA_FOUND = customMessage;
        getAllAlbums.mockResolvedValueOnce([]);
        render(await Album({params: {id: 'testId' }, searchParams:{ userId: 'testUserId' }}));
        await waitFor(() => expect(screen.getByText(customMessage)).toBeInTheDocument());
    });

    afterAll(() => {
        delete process.env.NO_DATA_FOUND;
    });
});

