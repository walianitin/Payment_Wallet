import express, { Request, Response } from "express";
import db from "@repo/db/client";
import { z } from "zod";

const app = express();
app.use(express.json());

// Zod schema for input validation
const inputSchema = z.object({
    token: z.string(),
    userId: z.string(),   // assuming `userId` comes as a string (e.g., from frontend)
    amount: z.number()
});

app.post("/hdfcWebhook", async (req: Request, res: Response): Promise<void> => {

    const parsed = inputSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({
            error: "Invalid input",
            details: parsed.error.errors
        });
        return;
    }

    const { token, userId, amount } = parsed.data;

    try {
      
        await db.$transaction([
            db.balance.updateMany({
                where: { userId: Number(userId) },
                data: {
                    amount: { increment: amount }
                }
            }),
          db.OnRampTransaction.updateMany({
                where: { token },
                data: { status: "Success" }
            })
        ]);

        res.status(200).json({
            message: "Payment processed successfully",
            data: parsed.data
        });

    } catch (error) {
        console.error("DB transaction failed:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
