import { NextRequest } from 'next/server';

// GET    /canvases        # list canvases for the current user
// POST   /canvases        # create a new canvas for the current user

const getResponse = [
	{
		"id": "def456",
		"name": "McDonald's Analysis",
		"createdAt": "2025-09-27T12:00:00Z",
		"updatedAt": "2025-09-27T13:20:00Z"
	},
	{
		"id": "def456",
		"name": "McDonald's Analysis",
		"createdAt": "2025-09-27T12:00:00Z",
		"updatedAt": "2025-09-27T13:20:00Z"
	}
]

const postReponse = {
	"id": "def456",
	"name": "McDonald's Analysis",
	"createdAt": "2025-09-27T12:00:00Z",
	"updatedAt": "2025-09-27T13:20:00Z"
};

export function GET(request: NextRequest) {
	return new Response(
		JSON.stringify(getResponse)
	);
}

export function POST(request: NextRequest) {
	return new Response(
		JSON.stringify(postReponse)
	);
}