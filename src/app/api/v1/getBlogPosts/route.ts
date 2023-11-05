import { getBlogPosts } from "../../contentful";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const response = await getBlogPosts(Number(limit), Number(page));
  return Response.json(response);
}
