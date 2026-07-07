export default {
  async fetch(request) {
    const url = new URL(request.url);
    const brandedHost = url.hostname;            // university.madscientists.io
    url.hostname = "mad.trendytech.dev";         // the real origin (self-hosted dashboard)

    // Forward the request unchanged except the target host, and tell the
    // origin which branded host the user is actually on — the dashboard uses
    // this to build its login (OAuth) callback on the branded domain so users
    // never get bounced off it.
    const req = new Request(url, request);
    req.headers.set("X-Forwarded-Host", brandedHost);

    const response = await fetch(req, { redirect: "manual" });

    // Keep users on the branded domain: rewrite any redirect target.
    const headers = new Headers(response.headers);
    const location = headers.get("Location");
    if (location) {
      headers.set("Location", location.replaceAll("mad.trendytech.dev", brandedHost));
    }
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
