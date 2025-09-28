import { NextRequest } from "next/server";

// GET    /canvases/:id    # get a single canvas
// PUT    /canvases/:id    # update a canvas
// DELETE /canvases/:id    # delete a canvas

const getResponse =
{
	"id": "def456",
	"name": "McDonald's Analysis",
	"createdAt": "2025-09-27T12:00:00Z",
	"updatedAt": "2025-09-27T13:20:00Z"
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;

	return new Response(
		JSON.stringify({ ...getResponse, id })
	);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	const body = await request.json();

	return new Response(
		JSON.stringify(body)
	);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;

	return new Response(
		JSON.stringify({ ...getResponse, id })
	);
}