import { Canvas, canvasesTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/neon-http';
import { auth } from '@clerk/nextjs/server';
import { canvasNameInitialValue, canvasDataInitialValue } from '@/app/values';

const db = drizzle(process.env.DATABASE_URL!, { schema: { canvasesTable } });

const selectCanvasesByUser = async (userId: string): Promise<Canvas[]> => {
	return await db
		.select()
		.from(canvasesTable)
		.where(eq(canvasesTable.user_id, userId))
		.orderBy(canvasesTable.created_at);
};

const insertCanvasByUser = async (userId: string): Promise<Canvas> => {
	return (await db
		.insert(canvasesTable)
		.values({ user_id: userId, name: canvasNameInitialValue, data: canvasDataInitialValue })
		.returning())[0];
};

// GET -> /canvases
export async function GET() {
	const { userId } = await auth();

	if (!userId) {
		return new Response("Unauthorized", { status: 401 });
	}

	const result = await selectCanvasesByUser(userId);

	return new Response(JSON.stringify(result));
}

// POST -> /canvases
export async function POST() {
	const { userId } = await auth();

	if (!userId) {
		return new Response("Unauthorized", { status: 401 });
	}

	const result = await insertCanvasByUser(userId);

	return new Response(JSON.stringify(result));
}