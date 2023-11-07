import { getBlogPostsBySeriesId } from "../../contentful";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const seriesId = searchParams.get("seriesId");
  const response = await getBlogPostsBySeriesId(
    seriesId!,
    Number(limit),
    Number(page)
  );
  return Response.json(response);
}
