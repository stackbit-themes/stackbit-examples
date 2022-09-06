import { urlToContent } from "~/utils/content";

export default defineEventHandler(async (event) => {
  const body = await useBody<string>(event);
  const page: any = await urlToContent(body);
  console.log("Returning page data from server:", page);
  return page;
});
