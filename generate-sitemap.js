const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");
const { resolve } = require("path");

(async () => {
  const hostname = "https://Sleepyyy.shop";

  // Create sitemap stream and write routes
  const sitemapStream = new SitemapStream({ hostname });

  // Write your URLs here
  sitemapStream.write({ url: "/", changefreq: "daily", priority: 1.0 });
  sitemapStream.write({ url: "/about", changefreq: "monthly", priority: 0.8 });
  sitemapStream.write({
    url: "/contact",
    changefreq: "monthly",
    priority: 0.8,
  });
  sitemapStream.write({ url: "/login", changefreq: "weekly", priority: 0.6 });
  sitemapStream.write({
    url: "/register",
    changefreq: "weekly",
    priority: 0.6,
  });

  sitemapStream.end();

  // Resolve correct output path
  const writeStream = createWriteStream(resolve("./public/sitemap.xml"));

  try {
    const data = await streamToPromise(sitemapStream);
    writeStream.write(data.toString());
    writeStream.end();
    console.log("✅ Sitemap created successfully!");
  } catch (err) {
    console.error("❌ Error creating sitemap:", err);
  }
})();
