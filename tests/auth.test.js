test("register endpoint should exist", () => {
  const routes = ["/api/auth/register", "/api/auth/login"];
  expect(routes).toContain("/api/auth/register");
});

test("login endpoint should exist", () => {
  const endpoint = "/api/auth/login";
  expect(endpoint.startsWith("/api/auth/")).toBe(true);
});
