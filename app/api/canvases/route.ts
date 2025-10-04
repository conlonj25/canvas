import { canvasesTable } from '@/db/schema';
import { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import { Canvas, CanvasSchema } from '@/app/types';
import { drizzle } from 'drizzle-orm/neon-http';

const db = drizzle(process.env.DATABASE_URL!, { schema: { canvasesTable } });
const JAMES_BOND_USER_ID = 'user_33Kj30Z0380VFRM8uFnAbs4gxRA';

const getCanvasesByUser = async (userId: string) => {
	const canvases = await db.select().from(canvasesTable).where(eq(canvasesTable.user_id, userId));
	return canvases;
};

export const postCanvasByUser = async (userId: string, data: Canvas, name: string) => {
	const [newCanvas] = await db
		.insert(canvasesTable)
		.values({ user_id: userId, name, data })
		.returning();

	return newCanvas;
};

// GET    /canvases        # list canvases for the current user
export async function GET(request: NextRequest) {
	const userCanvases = await getCanvasesByUser(JAMES_BOND_USER_ID);

	return new Response(
		JSON.stringify(userCanvases)
	);
}

// POST   /canvases        # create a new canvas for the current user
export async function POST(request: NextRequest) {
	const body = await request.json();
	const { data, success } = CanvasSchema.safeParse(body.data);
	console.log({ data, success })

	if (success) {
		const result = await postCanvasByUser(JAMES_BOND_USER_ID, data, 'new name');
		return new Response(JSON.stringify(result));
	} else {
		return new Response(JSON.stringify({ error: "The data passed is invalid as a canvas" }), { status: 500 });
	}
}