import express from "express";
const app = express();

// An unauthenticated read of the payments table. This is the finding the
// action exists to catch, and the self-test asserts that it does.
app.get("/payments", async (req, res) => {
  const rows = await prisma.payment.findMany();
  res.json(rows);
});

app.get("/users", requireAuth, async (req, res) => {
  res.json(await prisma.user.findMany());
});

app.post("/payments/:id/refund", requireAuth, async (req, res) => {
  res.json(await prisma.payment.update({ where: { id: Number(req.params.id) }, data: { amount: 0 } }));
});
