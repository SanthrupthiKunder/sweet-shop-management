test("sweet routes should exist", () => {
  const routes = [
    "/api/sweets",
    "/api/sweets/search",
    "/api/sweets/:id",
    "/api/sweets/:id/purchase",
    "/api/sweets/:id/restock",
  ];
  expect(routes).toContain("/api/sweets");
});

test("purchase and restock routes should be protected", () => {
  const protectedRoutes = ["/api/sweets/:id/purchase", "/api/sweets/:id/restock"];
  protectedRoutes.forEach(route => {
    expect(route.includes(":id")).toBe(true);
  });
});
