import { getBlogPostsByTagId } from "../../contentful";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const tagId = searchParams.get("tagId");
  const response = await getBlogPostsByTagId(
    tagId!,
    Number(limit),
    Number(page)
  );
  return Response.json(response);
}
