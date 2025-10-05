import { canvasesTable } from '@/db/schema';
import { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import { Canvas, CanvasSchema } from '@/app/types';
import { drizzle } from 'drizzle-orm/neon-http';
import { auth } from '@clerk/nextjs/server';
import { emptyInitialCanvas, newCanvasInitialName } from '@/app/values';

const db = drizzle(process.env.DATABASE_URL!, { schema: { canvasesTable } });
const JAMES_BOND_USER_ID = 'user_33Kj30Z0380VFRM8uFnAbs4gxRA';

const getCanvasesByUser = async (userId: string) => {
	const canvases = await db.select().from(canvasesTable).where(eq(canvasesTable.user_id, userId));
	return canvases;
};

const postCanvasByUser = async (userId: string, data: Canvas, name: string) => {
	const [newCanvas] = await db
		.insert(canvasesTable)
		.values({ user_id: userId, name, data })
		.returning();

	return newCanvas;
};

// GET    /canvases        # list canvases for the current user
export async function GET(request: NextRequest) {
	const { userId } = await auth();

	if (!userId) {
		return new Response("Unauthorized", { status: 401 });
	}

	const userCanvases = await getCanvasesByUser(userId);

	return new Response(
		JSON.stringify(userCanvases)
	);
}

// POST   /canvases        # create a new canvas for the current user
export async function POST(request: NextRequest) {
	const { userId } = await auth();

	if (!userId) {
		return new Response("Unauthorized", { status: 401 });
	}

	const result = await postCanvasByUser(userId, emptyInitialCanvas, newCanvasInitialName);
	return new Response(JSON.stringify(result));
}