import { getCreaditsBalance } from "@/lib/db/creadits";
import { auth } from "@clerk/nextjs/server";

export const GET = async () => {
  const { userId } = await auth();
  if (!userId) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Unauthorized",
      }),
      { status: 401 }
    );
  }
  const data = await getCreaditsBalance(userId);
  return new Response(
    JSON.stringify({
      success: true,
      data: {
        balance: data.balance,
        updated_at: data.updated_at,
      },
    }),
    { status: 200 }
  );
};
