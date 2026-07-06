export default {
  async fetch(request) {
    const url = new URL(request.url);
    url.hostname = "gacha.trendytech.dev"; // the real origin (self-hosted game)

    // Forward the request unchanged except for the target host.
    const response = await fetch(new Request(url, request), { redirect: "manual" });

    // Keep users on the branded domain: rewrite any redirect target.
    const headers = new Headers(response.headers);
    const location = headers.get("Location");
    if (location) {
      headers.set("Location", location.replaceAll("gacha.trendytech.dev", "gacha.madscientists.io"));
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
