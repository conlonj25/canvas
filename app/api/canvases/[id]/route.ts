import { Canvas, canvasesTable } from '@/db/schema';
import { NextRequest } from "next/server";
import { and, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/neon-http';
import { auth } from '@clerk/nextjs/server';

const db = drizzle(process.env.DATABASE_URL!, { schema: { canvasesTable } });
const JAMES_BOND_USER_ID = 'user_33Kj30Z0380VFRM8uFnAbs4gxRA';

const getCanvasById = async (canvasId: number): Promise<Canvas | undefined> => {
	return await db.query.canvasesTable.findFirst({ where: eq(canvasesTable.id, canvasId), });
};

const getCanvasByUserAndId = async (userId: string, canvasId: number) => {
	return await db.select().from(canvasesTable).where(and(eq(canvasesTable.user_id, userId), eq(canvasesTable.id, canvasId)));
};

const putCanvasByUserAndId = async (
	userId: string,
	canvasId: number,
	data: Pick<typeof canvasesTable.$inferInsert, 'name' | 'data'>
) => {
	const result = await db
		.update(canvasesTable)
		.set({
			...data,
			updated_at: new Date(),
		})
		.where(and(
			eq(canvasesTable.id, canvasId),
			eq(canvasesTable.user_id, userId),
		))
		.returning();

	return result[0] ?? null;
};

const deleteCanvasByUserAndId = async (userId: string, canvasId: number): Promise<Canvas[]> => {
	return await db
		.delete(canvasesTable)
		.where(
			and(
				eq(canvasesTable.id, canvasId),
				eq(canvasesTable.user_id, userId)
			)
		)
		.returning();
};

// GET    /canvases/:id
// get a single canvas with id 123
// if id isn't a valid number return a 400
// attempt db select
// if not authorized return a 403
// if no canvas found return a 404
// else return the canvas
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const canvasIdString = (await params).id;
	const canvasId = Number.parseInt(canvasIdString);

	if (Number.isNaN(canvasId)) {
		return new Response(
			JSON.stringify({ error: 'Invalid canvas ID' }), { status: 400 }
		);
	}

	const canvas = await getCanvasByUserAndId(JAMES_BOND_USER_ID, canvasId);

	return new Response(
		JSON.stringify(canvas)
	);
}

// PUT    /canvases/:id
// update a single canvas with id 123
// if id isn't a valid number return a 400
// attempt db update
// if not authorized return a 403
// if no canvas found return a 404
// else return the canvas
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	const body = await request.json();

	const canvasIdString = (await params).id;
	const canvasId = Number.parseInt(canvasIdString);

	if (Number.isNaN(canvasId)) {
		return new Response(
			JSON.stringify({ error: 'Invalid canvas ID' }), { status: 400 }
		);
	}

	const result = await putCanvasByUserAndId(JAMES_BOND_USER_ID, canvasId, body);

	if (result === null) {
		return new Response(
			JSON.stringify({ error: 'Canvas not found' }), { status: 404 }
		);
	}

	return new Response(
		JSON.stringify(result)
	);
}

// DELETE /canvases/:id
// delete a canvas with id 123
// if id isn't a valid number return a 400
// attempt db delete
// if not authorized return a 403
// if no canvas found return a 404
// else return the canvas
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const { userId } = await auth();

	if (!userId) {
		return new Response("Unauthorized", { status: 401 });
	}

	const canvasIdString = (await params).id;
	const canvasId = Number.parseInt(canvasIdString);

	if (Number.isNaN(canvasId)) {
		return new Response(
			JSON.stringify({ error: 'Invalid canvas ID' }), { status: 400 }
		);
	};

	const existing = await getCanvasById(canvasId);

	if (!existing) {
		return new Response("Not Found", { status: 404 });
	};

	if (existing.user_id !== userId) {
		return new Response("Forbidden", { status: 403 });
	}

	const result = await deleteCanvasByUserAndId(userId, canvasId);

	return new Response(
		JSON.stringify(result)
	);

};
